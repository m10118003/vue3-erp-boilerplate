<template>
    <div class="leaveFormTable-container">
        <el-table
                  :data="filteredLeaveApplications"
                  style="width: 100%; margin-bottom: 20px;"
                  row-key="id"
                  border
                  fit
                  highlight-current-row
                  :expand-row-keys="expandedRowKeys"
                  @row-click="handleRowClick"
                  :tree-props="{ children: 'children', hasChildren: 'hasChildren' }">
            <el-table-column class="leaveForm-expand" type="expand" width="0" algin="center">
                <template #default="{ row }">
                    <el-steps class="show-expand p-4" :active="getActiveStep(row)"
                              align-center :process-status="newSignStateType(row.sign_state.state)" finish-status="success"
                              space="250px">
                        <div class="sign-process-text">簽核進度</div>
                        <el-step title="1.送出申請" :description="row.created_at" />
                        <!-- <el-step title="2.總經理" description="2023-02-24 09:30" />
                        <el-step title="3.部門主管" description="審核中" />
                        <el-step title="4.總經理" description="" /> -->
                        <el-step v-for="(step, index) in row.sign_state.sequence" :key="step.id"
                                 :title="letTitleAdd(row, index, step)"
                                 :description="step.time">
                        </el-step>
                    </el-steps>
                </template>
            </el-table-column>
            <!-- <el-table-column prop="id" label="id" sortable width="180"></el-table-column> -->
            <el-table-column prop="created_at" :formatter="getApplyTime" label="申請日期" sortable width="120">
            </el-table-column>
            <el-table-column prop="user.name" label="申請人" sortable width="120">
            </el-table-column>
            <el-table-column prop="start" sortable label="請假時間(起)">
                <template #default="{ row }">
                    <div>{{ moment(row.start).format('YYYY-MM-DD hh:mm') }}</div>
                </template>
            </el-table-column>
            <el-table-column prop="end" sortable label="請假時間(迄)">
                <template #default="{ row }">
                    <div>{{ moment(row.end).format('YYYY-MM-DD HH:mm') }}</div>
                </template>
            </el-table-column>
            <el-table-column prop="total" sortable label="時數" width="120">
                <template #default="{ row }">
                    <div>
                        {{ minuteToHumanTime(row.total) }}
                    </div>
                </template>
            </el-table-column>
            <el-table-column prop="leave_type.name" sortable label="假別" width="120"> </el-table-column>
            <el-table-column prop="reason" label="事由"> </el-table-column>
            <el-table-column class="files" prop="files" label="憑證">
                <template #default="{ row }">
                    <div class="file-name" v-for="(file, index) in row.files" :key="index">
                        <!-- @click="showImage(file.path) -->
                        <!-- <el-button v-if="file.name === file.type" :src="file.path" alt="file.name"> -->
                        <a :href="file.path" target="_blank" @click.stop>{{ file.name }}</a>
                        <!-- </el-button> -->
                        <!-- <span v-else>{{ file.name }}</span> -->
                    </div>
                </template>
            </el-table-column>
            <el-table-column prop="agent.name" sortable label="職務代理人" width="120"> </el-table-column>
            <el-table-column prop="sign_state" sortable label="狀態" width="120">
                <template #default="{ row }">
                    <div :style="{ color: getStatusColor(row.sign_state.state) }">
                        {{ newSignStateText(row.sign_state.state) }}
                    </div>
                </template>
            </el-table-column>
        </el-table>
    </div>

    <el-row class="justify-center mt-1">
        <el-pagination background layout="prev, pager, next" :current-page="page.currentPage" :page-count="page.lastPage" />
        <!-- <el-pagination background layout="prev, pager, next" @current-change="pageChange" :current-page="page.currentPage" :page-count="page.lastPage" /> -->
    </el-row>


    <!-- selectData, 
    <br>
    {{selectData}}
    <br>
    form
    <br>
     {{ form  }}
     <br> -->
    <!-- selectedDepartment: {{ props.selectedDepartment }}
    <br>
    selectedUser: {{ props.selectedUser }}
    <br>
    form.type: {{ props.form?.type }}
    <br>
    stateValue: {{ props.stateValue }} -->
</template>

<script lang="ts" setup>
import { provide, ref, reactive, nextTick, onMounted, computed, watch } from 'vue';
import type { PropType } from 'vue';
// import { punchs, punch, departments, leaveTypes, users, addLeaveApplication, exportDepartmentPunchs, signs, updateSign, newSign, newLeaveApplications } from '@/api';
// import type { Department, Punch, User, SignState, NewLeaveAppTextColor, NewLeaveApplication } from "@/types";
// import { useUserStore } from '@/store';
import { minuteToHumanTime, signStateText, newSignStateType, newSignStateText, getStatusColor } from '@/config';
import { SuccessFilled } from "@element-plus/icons-vue";
import moment from 'moment';
import type { Color } from 'csstype';

// onMounted(() => {
//     users(userStore.department.id).then(res => {
//         userOptions.value = res.data.data;
//     });
//     leaveTypes().then(res => {
//         leaveTypeOptions.value = res.data.data;
//         paidVacation.value = res.data.paid_vacation;
//     });
//     // newLeaveApplications(null, null, null, null, null, null, null).then(res => {
//     //     newLeaveApp.value = res.data.data;
//     // });

//     refresh()
// });

const props = defineProps({
    selectData: {
        type: Object,
    },
    selectedDate: {
        type: String,
    },
    selectedDateRange: {
        type: Array as PropType<String[]|undefined[]|null[]>,
        default: [null, null]
    },
    // leave_records: {
    //     type: Array,
    // },
    selectedDepartment: {
        type: Number as PropType<number|undefined|null>,
        default: null
    },
    selectedUser: {
        type: Number as PropType<number | null | undefined>,
        default: null
    },
    // form: {
    //     type: Object,
    // },
    selectedFormType: {
        type: Number as PropType<number | null | undefined>,
        default: null
    },
    stateValue: {
        type: Number as PropType<number | null | undefined>,
        default: null,
    },
    // start: String,
    // end: String
});

const userStore = useUserStore();
const userOptions = ref();
// 假別
const leaveTypeOptions = ref<{ id: number, name: string, minimum: number, remark: string; }[]>([]);
// 特休時間(分)
const paidVacation = ref(0);
// 接收後端資料
// const newLeaveApp = ref<{ id: number, user: User, agent: null, sign_state: any; }[]>([]);

// const user = useUserStore();

// 簽核表接收資料
const newLeaveApp = ref<NewLeaveApplication[]>([]);

// 展開簽核進度
const expandedRowKeys = ref([]);

const handleRowClick = ((row: { id: never; }) => {
    // console.log(row)
    if (expandedRowKeys.value.includes(row.id)) {
        // 如果該進度行已經被展開, 則收起來
        expandedRowKeys.value = expandedRowKeys.value.filter((id) => id !== row.id);
    } else {
        // 如果沒被展開, 就打開它
        expandedRowKeys.value.push(row.id);
    }
});

// 動態填入簽核進度時間
const getActiveStep = (row: any) => {
    const { index } = row.sign_state;
    return index !== null ? index + 1 : 1;
};

// 簽核進度條, 節點標題從1.送出申請之後+2
const letTitleAdd = (row: any, index: any, step: any) => {
    return index >= 0 ? `${index + 2}.${step.name}` : step.name;
};

// 除了申請時間之外, 動態加上簽核進度時間
const getDescription = (row: any, index: any) => {
    const { sequence } = row.sign_state;
    if (index > sequence.length - 1) {
        return '';
    }
    if (index === sequence.length - 1) {
        return sequence[index].time;
    }
    return sequence[index + 1].time;
};

// 動態填入送出申請時間
const getApplyTime = (data: any) => {
    const applyTime = data.created_at.split(' ')[0];
    return applyTime;
};

// 基於 selectedDate 篩選 getNewLeaveApplications 的 data
const filteredLeaveApplications = computed(() => {
    let filteredData = newLeaveApp.value;

    return filteredData.map((item) => {
        return {
            ...item,
            ...{
                user: item.user,
                files: item.files,
                leave_records: item.leave_records,
                total: item.total,
                leave_type: item.leave_type,
                created_at: item.created_at,
            }
        };
    });
});

// 頁數取得資料
const page = reactive({
    currentPage: 1,
    lastPage: 1
});

// 看住父層傳來的值, 更新申請日期, 請假時間, 部門, 申請人, 假別, 狀態
watch(() => props.selectedDate, () => { refresh(); });
watch(() => props.selectedDateRange, () => { refresh(); });
watch(() => props.selectedDepartment, () => { refresh(); });
watch(() => props.selectedUser, () => { refresh(); });
watch(() => props.selectedFormType, () => { refresh(); });
watch(() => props.stateValue, () => { refresh(); });

const refresh = () => {

    // let dateRange:string|null[] = [null,null]
    let dateStart: string | null = null;
    let dateEnd: string | null = null;

    // if(props.selectedDateRange[0]) dateRange[0] = props.selectedDateRange[0] as string
    // if(props.selectedDateRange[1]) dateRange[1] = props.selectedDateRange[1] as string

    if (props.selectedDateRange[0]) dateStart = moment('' + props.selectedDateRange[0]).format('YYYY-MM-DD');
    if (props.selectedDateRange[1]) dateEnd = moment('' + props.selectedDateRange[1]).format('YYYY-MM-DD');

    newLeaveApplications(
        props.selectedDate,
        dateStart,
        dateEnd,
        props.selectedUser,
        props.selectedDepartment,
        props.selectedFormType, props.stateValue)
        .then(res => {
            newLeaveApp.value = res.data.data;
        });
};

// const pageChange = (p: number) => {
//     page.currentPage = p;
//     getSignData();
// };
// const getSignData = () => {
//     signs({ type: undefined, user_id: user.id, page: page.currentPage, includeSequence: true }).then(res => {
//         data.value = res.data.data;
//         page.lastPage = res.data.meta.last_page;
//     });
// };
// getSignData();

</script>

<style lang="scss" scope>
@import '@/scss/variable.scss';

// 表格 title 顏色、
.leaveFormTable-container {
    .el-table__row {
        cursor: pointer;
    }

    // 標題顏色
    .el-table th.el-table__cell {
        background-color: black;
        color: white;
    }

    // 表格文字垂直置中
    .el-table__cell {
        text-align: center;
    }

    // .el-table__expand-icon{
    //     visibility: hidden;
    // }

    // 憑證文字顏色
    .file-name>a {
        color: #027DB4;
        text-decoration: none;
    }

    // 簽核進度背景
    .el-table__expanded-cell {
        background-color: rgba(242, 242, 242, 0.6);

        &.el-steps--horizontal {
            background-color: inherit;
        }
    }

    // 簽核進度
    .show-expand {
        // width: 80%;

        .sign-process-text {
            padding: 2%;
        }

        .el-steps {
            top: 0;
            left: 0%;
        }

        .el-step__icon.is-text {
            width: 28px;
            height: 28px;
            border: 15px solid;

            .el-step__icon-inner {
                color: white;
            }
        }

        .el-step__title {
            color: unset;
            font-size: 1em;
            // padding-left: 2.2em;
        }

        .el-step__description.is-success {
            color: unset;
            font-size: 1em;
            // padding-left: 20px;
            // padding-right: 0;
        }

        .el-step__description.is-process {
            color: unset;
            font-size: 1em;
            // padding-left: 82px;
            // padding-right: 0;
        }

        .el-step__description.is-wait {
            color: #7F7F7F;
            font-size: 1em;
            // padding-left: auto;
            // padding-right: auto;
        }

        .el-step__description.is-error {
            color: unset;
            font-size: 1em;
            // padding-left: auto;
            // padding-right: auto;
        }

        .el-step__description {
            // text-align:center;
            width: 100%;
            margin-left: 40px;
            margin-right: 0px;
            // padding-right: 0px;
        }

    }

}
</style>