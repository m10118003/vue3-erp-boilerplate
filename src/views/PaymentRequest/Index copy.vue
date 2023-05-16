<template>
    <el-card>
        <div class="invoice-container flex flex-col md:flex-row">
            <el-form-item class="invoice-start flex flex-col md:flex-row" label="公出日期：" label-width="100px">
                <el-date-picker class="invoice-timepicker-start" v-model="form.start" type="date"
                                format="YYYY-MM-DD" value-format="YYYY-MM-DD" @change="form.rangeChange"
                                @panel-change="form.rangeChange"
                                prefix-icon="Calendar" :disabled-date="form.disabledDate" :editable="false"
                                :picker-options="form.start" />
            </el-form-item>
            <div>
                <span class="to px-5">至</span>
            </div>
            <el-form-item class="invoice-end flex flex-col md:flex-row" label-width="100px">
                <el-date-picker class="invoice-timepicker-end" v-model="form.end" type="date"
                                format="YYYY-MM-DD" value-format="YYYY-MM-DD" @change="form.rangeChange"
                                @panel-change="form.rangeChange"
                                prefix-icon="Calendar" :disabled-date="form.disabledDate" :editable="false"
                                :picker-options="form.end" />
            </el-form-item>
        </div>
        <el-form :data="leaveRecord" class="invoice-details flex flex-col md:flex-row">
            <template v-if="userStore.crossView">
                <el-form-item label="部門：" label-width="80px">
                    <el-select label="部門：" placeholder="請選擇部門" v-model="selectedDepartment" class="mr-2">
                        <el-option :label="department.name" :value="department.id"
                                   v-for="department in selectData.departments"
                                   :key="department.id"></el-option>
                    </el-select>
                </el-form-item>
            </template>
            <template v-if="userStore.crossView || userStore.department.user_id == userStore.id">
                <el-form-item label="申請人：" label-width="80px">
                    <el-select label="申請人：" v-model="selectedUser" placeholder="選擇申請人">
                        <el-option :value="null" label="全部" :key="null" />
                        <el-option :value="user.id" :label="user.name" :key="user.id" v-for="user in selectData.users" />
                    </el-select>
                </el-form-item>
            </template>

            <el-form-item label="假別：" label-width="80px">
                <el-select :default-first-option="true" v-model="selectedFormType" placeholder="全部">
                    <el-option :value="null" label="全部"></el-option>
                    <el-option v-for="ltype in leaveTypeOptionss" :value="ltype.id"
                               :label="ltype.name + `(${ltype.minimum})`" />
                </el-select>
            </el-form-item>

            <el-form-item label="狀態：" label-width="80px">
                <el-select :default-first-option="true" v-model="stateValue">
                    <el-option :value="null" label="全部"></el-option>
                    <el-option :value="1" label="核准"></el-option>
                    <el-option :value="2" label="駁回"></el-option>
                    <el-option :value="0" label="審核中"></el-option>
                </el-select>
            </el-form-item>
        </el-form>
        <el-form-item class="add-invoice-form">
            <AddLeaveForm v-model="showNewLeaveForm" />
        </el-form-item>
        <InvoiceTable :selected-date="selectedDate" :selected-date-range="selectedDateRange" :select-data="selectData"
                        :selected-department="selectedDepartment" :selected-user="selectedUser"
                        :selected-form-type="selectedFormType" :state-value="stateValue" />
    </el-card>
</template>

<script lang='ts' setup>
import { provide, ref, reactive, nextTick, onMounted, computed, watch, onBeforeMount } from 'vue';
import moment from 'moment';
import { punchs, punch, departments, leaveTypes, users, addLeaveApplication, exportDepartmentPunchs, signs, newSign, newLeaveApplications } from '@/api';
import type { Department, Punch, User, SignState, NewLeaveApplication } from "@/types";
import { useUserStore } from '@/store';
import { httpCode } from '@/client';
import { minuteToHumanTime, signType, newSignStateText } from '@/config';
import { Calendar, Plus } from "@element-plus/icons-vue";
import { ElMessage } from "element-plus";
import PaymentRequestTable from '@/components/PaymentRequestTable/index.vue';
import AddInvoice from '@/components/paymentApply/components/AddInvoice.vue';

const userStore = useUserStore();
const userOptions = ref();
const leaveTypeOptions = ref<{ id: number, name: string, minimum: number, remark: string; }[]>([]); // 假別
const paidVacation = ref(0); // 特休時間(分)

const selectData = reactive<{ departments: Department[]; users: User[]; }>({
    departments: [],
    users: [],
});

const showNewLeaveForm = ref(Boolean); // 新增請假單

const selectedDate = ref(moment().format("YYYY-MM-DD")); // ref 設為今天申請日期
// const selectedDate = ref(null);
const selectedDateRange = ref<[] | undefined>(); // ref 請假時間
const selectedDepartment = ref<number | null | undefined>(); // select 綁定 部門id 資料
const selectedUser = ref<number | undefined | null>(1); // select 綁定 使用者id 資料
const selectedFormType = ref<number | undefined | null>(null); // select 綁定 假別資料
const stateValue = ref(null); // ref 假別狀態
const punchData = ref([] as Punch[]); // 打卡資料

// 如果請假時間範圍有傳給父層資料可以用:
// const onDateRangeChange = () => {
// emit('date-range-change', selectedDateRange.value);
// };

// 接收後端資料
// const newLeaveApp = ref<{ id: number, user: User, agent: null, sign_state: any; }[]>([]);

onMounted(() => {

    // newLeaveApplications(null, null, null, null, null, null, null).then(res => {
    //     newLeaveApp.value = res.data.data;
    // });
});

// 申請日期之日期選擇禁止
// const disabledDate = (time: Date) => {
//     return time.getTime() > new Date().getTime();
// };

const leaveTypeOptionss = computed(() => {
    return leaveTypeOptions.value.map((item: { id: number, name: string, minimum: number, remark: string; }) => {
        return {
            ...item,
            ...{
                minimum: minuteToHumanTime(item.minimum)
            }
        };
    });
});

const paidVacationStr = computed(() => {
    return minuteToHumanTime(paidVacation.value);
});

const files = ref<HTMLInputElement>();

// 假卡表單
const form = reactive<{
    type: number,
    reason: string,
    agent: number | boolean,
    leaveRange: Date[],
    disabledDate: Function,
    rangeChange: Function,
    send: Function,
    created_at: Date[], // 申請日期
}>({
    type: 0,             // 請假類別
    reason: '',          // 原因
    agent: false,         // 代理人
    leaveRange: [moment().hour(9).minute(0).second(0).toDate(), moment().hour(18).minute(0).toDate()],      // 時間區段
    created_at: [], // 申請日期


    disabledDate: (date: Date) => moment().isAfter(moment(date).add(2, 'years')),                                       // 禁用時間
    // 申請日期欄位, 當使用者選擇日期時，將其存入 reactive 物件中
    rangeChange: () => {                                                                                               // 時間檢查
        if (moment(form.leaveRange[0]).hour() < 9 || moment(form.leaveRange[0]).hour() > 18)
            form.leaveRange[0] = moment(form.leaveRange[0]).hour(9).toDate();
        if (moment(form.leaveRange[1]).hour() < 9 || moment(form.leaveRange[1]).hour() > 18)
            form.leaveRange[1] = moment(form.leaveRange[1]).hour(18).toDate();
    },
    send: () => {                                                                                                      // 送出假單
        let start = moment(form.leaveRange[0]).format('YYYY-MM-DD');
        let end = moment(form.leaveRange[1]).format('YYYY-MM-DD');

        // 格式化 start 和 end

        // 將 datetimeString 傳遞給後端
        // const formattedApplyDate = `${selectedDate.value.getFullYear()}-${selectedDate.value.getMonth() + 1}-${selectedDate.value.getDate()}`; // 送出申請日期到後端

        addLeaveApplication(form.type, form.reason, form.agent, start, end, files.value?.files).then(res => {
            if (res.status == httpCode.OK) {
                form.reason = '';
                form.agent = false;

                if (files.value && files.value.value)
                    files.value.value = '';

                form.leaveRange = [
                    moment().hour(9).minute(0).second(0).toDate(),
                    moment().hour(18).minute(0).second(0).toDate()
                ];
            }

        });
    }
});

// 取得部門列表
const getDepartmentsData = () => {
    departments().then((res) => {
        selectData.departments = res.data.data;
        if (res.data.data.length) {
            selectedDepartment.value = res.data.data[0].id;
            selectedDepartment.value = userStore.department.id;
        }
        else selectedDepartment.value = undefined;
    });
};

// 最高主管權限, 開給 boss 和人資
if (userStore.crossView) {
    selectedDepartment.value = null;
    selectedUser.value = null;
    getDepartmentsData();
    users(userStore.department.id).then(res => {
        userOptions.value = res.data.data;
        selectData.users = res.data.data;
    });
}
// 僅次最高主管的權限, 例如部門主管
else if (userStore.department.user_id == userStore.id) {
    selectedDepartment.value = userStore.department.id;
    selectedUser.value = null;
    users(userStore.department.id).then(res => {
        userOptions.value = res.data.data;
        selectData.users = res.data.data;
    });
}
// 一般使用者, 例如員工
else {
    selectedDepartment.value = userStore.department.id;
    selectedUser.value = userStore.id;
    // console.log('asdasdsad')
}


leaveTypes().then(res => {
    leaveTypeOptions.value = res.data.data;
    paidVacation.value = res.data.paid_vacation;
});



// 取得使用者列表
const getUsersData = () => {
    users(Number(selectedDepartment.value)).then((res) => {
        selectData.users = res.data.data;
        if (res.data.data.length) {
            // if (selectedDepartment.value == userStore.department.id && userStore.director) {
            //     selectedUser.value = userStore.department.user_id;
            // }
            // else {
            //     selectedUser.value = res.data.data[0].id;
            // }
            selectedUser.value = null;
        }
        else {
            selectedUser.value = undefined;
            ElMessage.warning('該部門尚無員工');
            punchData.value = [];
        }
    });
};

// 取得 test2 簽核
const leaveRecord = ref<SignState[]>([]);
const currentPage = ref(1);
const lastPage = ref(1);

// 簽核單詳細
const info = reactive<{
    show: Boolean,
    data: any,
    title: string;
}>({
    show: false,
    data: {},
    title: ''
});
const showData = (data: any) => {
    info.show = true,
        info.data = data;
};

// 請假時間監聽
// watch(selectedDate, () => {
//     if (user_id.value != undefined)
//         getUsersData();
// });

// 部門選擇監聽
watch(selectedDepartment, () => {
    getUsersData();
});

// 申請人選擇監聽

// watch(user_id, () => {
//   if (user_id.value != undefined) {
//     getPunchData();
//   }

// });

// 假別選擇監聽

// 狀態選擇監聽

</script>

<style lang="scss" scope>
@import '@/scss/variable.scss';

.el-card {
    .apply-date-container {
        // width: calc(80vw - 100px);
        font-size: 1rem;

        // 調整 date picker 沒法置入 element-plus, suffix icon api 的問題
        .apply-date {
            text-align: center;

            .apply-datepicker {
                .el-input__prefix {
                    @include min-dev($mobile_m) {
                        position: absolute;
                        left: 200px;
                        top: 0;
                    }
                }

                input {
                    padding-left: 15px;
                }

                .el-input__suffix {
                    display: none;
                }
            }
        }

        @media screen and (min-width:375px) and (max-width: 480px) {
            .apply-date {
                width: 310px !important;
            }
        }

        // 調整 date picker 沒法置入 element-plus, 日曆以及結尾關閉圖標的 api 的問題
        .apply-timepicker {
            max-width: 60%;

            @include min-dev($mobile_m) {
                max-width: 85%;

            }

            .el-range__icon {
                position: absolute;
                left: 280px;
                top: 0;
            }

            input {
                padding-left: 0px;
            }

            .el-range__close-icon {
                visibility: hidden;
            }

            // div {
            //     .to {
            //         display: block;
            //         width: 50px;
            //         margin-left: 10.5vw;
            //         padding-top: 0px;
            //         padding-bottom: 15px;

            //         @include min-dev($pad) {
            //             margin: 0;
            //             padding-top: 5px;
            //         }
            //     }
            // }

            // .apply-time-end {

            //     @include min-dev($pad) {
            //         margin-left: -90px;

            //     }
            // }
        }

    }
}

// 調整假單 icon
// .add-leave-form {
//     >.el-button {
//         background-color: rgba(1, 84, 120, 1);
//     }
// }

// 申請日期、請假時間下拉選單日曆調整
.el-picker-panel {
    // width: 100%;

    .el-date-picker__time-header {
        display: none;
    }

    .el-date-range-picker__time-header {
        display: none;
    }

    // .el-picker-panel__footer {
    //     display: none;
    // }
}

.card-title {
    font-size: large;
    font-weight: bolder;
}

.el-pagination {
    text-align: center;
}
</style>