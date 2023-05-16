<template>
    <el-card>
        <div class="invoice-container flex flex-col md:flex-row">
            <el-form-item class="invoice-start flex flex-col md:flex-row" label="日期時間：" label-width="100px">
                <el-date-picker class="invoice-timepicker-start" v-model="" type="date"
                                format="YYYY-MM-DD" value-format="YYYY-MM-DD" @change=""
                                @panel-change=""
                                prefix-icon="Calendar" :disabled-date="" :editable="false"
                                :picker-options="" />
            </el-form-item>
            <div>
                <span class="to px-5">至</span>
            </div>
            <el-form-item class="invoice-end flex flex-col md:flex-row" label-width="100px">
                <el-date-picker class="invoice-timepicker-end" v-model="" type="date"
                                format="YYYY-MM-DD" value-format="YYYY-MM-DD" @change=""
                                @panel-change=""
                                prefix-icon="Calendar" :disabled-date="" :editable="false"
                                :picker-options="" />
            </el-form-item>
        </div>
        <el-form :data="" class="invoice-details flex flex-col md:flex-row">
            <!-- <template v-if="userStore.crossView"> -->
            <template>
                <el-form-item label="申請部門：" label-width="80px">
                    <el-select label="申請部門：" placeholder="請選擇部門" v-model="null" class="mr-2">
                        <el-option :value="null" label="預設部門"></el-option>
                        <el-option :value="1" label="總務"></el-option>
                        <el-option :value="2" label="RD Team"></el-option>
                        <el-option :value="0" label="boss"></el-option>
                        <el-option :value="0" label="MIS Team"></el-option>

                        <!-- <el-option :label="department.name" :value="department.id"
                                   v-for="department in selectData.departments"
                                   :key="department.id"></el-option> -->
                    </el-select>
                </el-form-item>
            </template>
            <!-- <template v-if="userStore.crossView || userStore.department.user_id == userStore.id"> -->
            <template>
                <el-form-item label="申請人：" label-width="80px">
                    <el-select label="申請人：" v-model="null" placeholder="選擇申請人">
                        <el-option :value="null" label="全部" :key="null" />
                        <el-option :value="null" label="A User" :key="null" />
                        <el-option :value="null" label="B User" :key="null" />
                        <!-- <el-option :value="user.id" :label="user.name" :key="user.id" v-for="user in selectData.users" /> -->
                    </el-select>
                </el-form-item>
            </template>

            <el-form-item label="進度：" label-width="80px">
                <el-select label="進度：" :default-first-option="true" v-model="null" placeholder="全部">
                    <el-option :value="null" label="全部"></el-option>
                    <el-option :value="1" label="完成"></el-option>
                    <el-option :value="2" label="駁回"></el-option>
                    <el-option :value="0" label="審核中"></el-option>
                    <el-option :value="0" label="付款中"></el-option>
                    <el-option :value="0" label="簽收中"></el-option>
                    <el-option :value="0" label="撤回"></el-option>
                    <el-option :value="0" label="未申請"></el-option>
                    <!-- <el-option v-for="ltype in leaveTypeOptionss" :value="ltype.id"
                               :label="ltype.name + `(${ltype.minimum})`" /> -->
                </el-select>
            </el-form-item>

            <el-form-item label="請款：" label-width="80px">
                <el-select :default-first-option="true" v-model="null">
                    <el-option :value="null" label="全部"></el-option>
                    <el-option :value="1" label="完成"></el-option>
                    <el-option :value="2" label="待簽收"></el-option>
                    <el-option :value="0" label="未核准"></el-option>
                </el-select>
            </el-form-item>
        </el-form>
        <el-form-item class="add-invoice-form">
            <!-- <AddLeaveForm v-model="showNewLeaveForm" /> -->
        </el-form-item>
        <!-- <InvoiceTable :selected-date="selectedDate" :selected-date-range="selectedDateRange" :select-data="selectData"
                        :selected-department="selectedDepartment" :selected-user="selectedUser"
                        :selected-form-type="selectedFormType" :state-value="stateValue" /> -->
    </el-card>
</template>

<script lang="ts" setup>
import { provide, ref, reactive, nextTick, onMounted, computed, watch, onBeforeMount } from 'vue';
import moment from 'moment';
// import { punchs, punch, departments, leaveTypes, users, addLeaveApplication, exportDepartmentPunchs, signs, newSign, newLeaveApplications } from '@/api';
// import type { Department, Punch, User, SignState, NewLeaveApplication } from "@/types";
// import { useUserStore } from '@/store';
// import { httpCode } from '@/client';
// import { minuteToHumanTime, signType, newSignStateText } from '@/config';
import { Calendar, Plus } from "@element-plus/icons-vue";
import { ElMessage } from "element-plus";
import InvoiceTable from 'src/components/InvoiceTable/index.vue';
import AddInvoice from '@/components/AddPaymentRequestForm.vue.js';


// 部門列表
const departmentList = ref([]);

const userStore = useUserStore();

// 查詢公出單表單
const form = reactive({
    start: moment(new Date).format('YYYY-MM-DD'),
    end: moment(new Date).format('YYYY-MM-DD'),
    department_id: null,
    user_id: null,
    state: null,
    page: 1,
    last_page: 1,
    data: [],
    leaveRange: [],
    rangeChange: () => {
        form.search();
    },
    // search: () => {
    //     businessTrips(form.start, form.end, form.page, form.department_id, form.user_id, form.state).then(res => {
    //         form.data = res.data.data;
    //     });
    // },
    // update: (id) => {
    //     updateBusinessTrip(id).then(res => {
    //         console.log(res.data);
    //         form.search();
    //     });
    // }
});

// 新增彈窗顯示
const addBusinessTripForm = ref(false);

const createBusinessTripFormBtn = () => {
    addBusinessTripForm.value = true;
};

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