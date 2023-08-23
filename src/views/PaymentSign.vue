<template>
    <div class="payment-request-date-container">
        <div class="el-card-container">
            <el-card>
                <div class="payment-request-date-container flex flex-col md:flex-row">
                    <el-form-item class="payment-request-start flex flex-col md:flex-row" label="日期時間：" label-width="100px">
                        <el-date-picker class="payment-request-timepicker-start" v-model="paymentSignForm.start" type="date"
                                        format="YYYY-MM-DD" value-format="YYYY-MM-DD" @change="paymentSignForm.rangeChange"
                                        @panel-change="paymentSignForm.rangeChange"
                                        prefix-icon="Calendar" :disabled-date="paymentSignForm.disabledDate"
                                        :editable="false"
                                        :picker-options="paymentSignForm.start" />
                    </el-form-item>
                    <div>
                        <span class="to px-5">至</span>
                    </div>
                    <el-form-item class="payment-request-end flex flex-col md:flex-row" label-width="5px">
                        <el-date-picker class="payment-request-timepicker-end" v-model="paymentSignForm.end" type="date"
                                        format="YYYY-MM-DD" value-format="YYYY-MM-DD" @change="paymentSignForm.rangeChange"
                                        @panel-change="paymentSignForm.rangeChange"
                                        prefix-icon="Calendar" :disabled-date="paymentSignForm.disabledDate"
                                        :editable="false"
                                        :picker-options="paymentSignForm.end" />
                    </el-form-item>
                </div>
                <!-- <el-form :data="" class="payment-request-details flex flex-col md:flex-row"> -->
                <el-form class="payment-request-details flex flex-col md:flex-row">
                    <!-- <template v-if="userStore.crossView"> -->

                    <el-form-item label="申請部門：" label-width="82px" class="ml-2">
                        <el-select class="payment-request-select-width mr-14" v-model="paymentSignForm.selectedDepartment"
                                   label="申請部門："
                                   placeholder="請選擇部門">
                            <el-option value="" label="預設部門"></el-option>
                            <el-option value="1" label="總務"></el-option>
                            <el-option value="2" label="RD Team"></el-option>
                            <el-option value="3" label="boss"></el-option>
                            <el-option value="4" label="MIS Team"></el-option>

                            <!-- <el-option :label="department.name" :value="department.id"
                                   v-for="department in selectData.departments"
                                   :key="department.id"></el-option> -->
                        </el-select>
                    </el-form-item>

                    <!-- <template v-if="userStore.crossView || userStore.department.user_id == userStore.id"> -->

                    <el-form-item label="申請人：" label-width="80px">
                        <el-select v-model="paymentSignForm.user_name" label="申請人：" placeholder="選擇申請人">
                            <el-option value="" label="全部" />
                            <el-option value="1" label="A User" />
                            <el-option value="2" label="B User" />
                            <!-- <el-option :value="user.id" :label="user.name" :key="user.id" v-for="user in selectData.users" /> -->
                        </el-select>
                    </el-form-item>


                    <el-form-item label="進度：" label-width="80px">
                        <el-select v-model="paymentSignForm.progress" label="進度：" :default-first-option="true"
                                   placeholder="全部">
                            <el-option value="" label="全部"></el-option>
                            <el-option value="1" label="完成"></el-option>
                            <el-option value="2" label="駁回"></el-option>
                            <el-option value="3" label="審核中"></el-option>
                            <el-option value="4" label="付款中"></el-option>
                            <el-option value="5" label="簽收中"></el-option>
                            <el-option value="6" label="撤回"></el-option>
                            <el-option value="7" label="未申請"></el-option>
                            <!-- <el-option v-for="ltype in leaveTypeOptionss" :value="ltype.id"
                               :label="ltype.name + `(${ltype.minimum})`" /> -->
                        </el-select>
                    </el-form-item>

                    <el-form-item label="簽核：" label-width="80px">
                        <el-select v-model="paymentSignForm.paymentRequest" :default-first-option="true">
                            <el-option value="" label="全部"></el-option>
                            <el-option value="1" label="核准"></el-option>
                            <el-option value="2" label="駁回"></el-option>
                            <el-option value="3" label="待審核"></el-option>
                        </el-select>
                    </el-form-item>
                </el-form>

                <div class="payment-request-table-container">
                    <!-- <el-table
                              :data="filteredSignApplications"
                              style="width: 100%; margin-bottom: 20px;"
                              row-key="id"
                              border
                              fit
                              highlight-current-row
                              :expand-row-keys="expandedRowKeys"
                              @sort-change="form.sortChange"
                              @row-click="handleRowClick"
                              :tree-props="{ children: 'children', hasChildren: 'hasChildren' }"> -->
                    <el-table
                              :data="filteredSignApplications"
                              style="width: 100%; margin-bottom: 20px;"
                              row-key="id"
                              border
                              fit
                              highlight-current-row
                              :expand-row-keys="expandedRowKeys"

                              @row-click="handleRowClick"
                              :tree-props="{ children: 'children', hasChildren: 'hasChildren' }">
                        <el-table-column class="payment-request-expand" type="expand" width="0" align="center">
                            <template #default="{ row }">
                                <el-steps class="show-expand p-4" :active="getActiveStep(row)"
                                          align-center :process-status="newSignStateType(row.state)" finish-status="success"
                                          space="250px">
                                    <div class="payment-request-process-text"></div>
                                    <el-step title="1.送出申請" :description="row.created_at + ` ` + `09:00`" />
                                    <el-step title="2.專案管理處" description="2023-02-24 09:30" />
                                    <el-step title="3.財務審核" description="2023-02-24 09:30" />
                                    <el-step title="4.副總經理" description="2023-02-24 09:30" />
                                    <el-step title="5.總經理" description="2023-02-24 09:30" />
                                    <el-step title="6.董事長" description="2023-02-24 09:30" />
                                    <el-step title="7.付款" description="" />
                                    <el-step
                                             v-for="(step, index) in row.sequence"
                                             :key="step.id"
                                             :title="letTitleAdd(row, index, step)"
                                             :description="step.time">
                                    </el-step>
                                </el-steps>
                                <el-steps class="show-expand show-another-expand p-4" :active="getActiveStep(row)"
                                          align-center :process-status="newSignStateType(row.state)" finish-status="success"
                                          space="250px">
                                    <div class="payment-request-process-text"></div>
                                    <!-- <el-step title="1.送出申請" :description="row.created_at + ` ` + `09:00`" /> -->
                                    <!-- 假如 status = 某種狀況的時候顯示 -->
                                    <template v-if="row.payment_detail == 1">
                                        <el-step title="2.專案管理處" description="2023-02-24 09:30" />
                                    </template>
                                    <el-step title="3.財務審核" description="2023-02-24 09:30" />
                                    <el-step title="4.副總經理" description="2023-02-24 09:30" />
                                    <el-step title="5.總經理" description="2023-02-24 09:30" />
                                    <el-step title="6.董事長" description="2023-02-24 09:30" />
                                    <!-- <el-step title="7.付款" description="" /> -->
                                    <!-- 這邊可能要做個判斷, 假如會簽的時候要亮燈 -->
                                    <el-step
                                             v-for="(step, index) in row.sequence"
                                             :key="step.id"
                                             :title="letTitleAdd(row, index, step)"
                                             :description="step.time">
                                    </el-step>
                                </el-steps>
                            </template>
                        </el-table-column>
                        <el-table-column prop="created_at" label="申請日期" sortable="custom" width="120">
                            <!-- <template #default="{ row }">{{ getApplyTime(row.created_at) }}</template> -->
                            <template #default="{ row }">{{ row.created_at }}</template>
                        </el-table-column>
                        <el-table-column prop="department" label="申請部門" sortable="custom" width="120">
                            <!-- <template #default="{ row }">{{ getApplyTime(row.department) }}</template> -->
                            <template #default="{ row }">{{ row.department }}</template>
                        </el-table-column>
                        <el-table-column prop="user_id" label="申請人" sortable="custom" width="120">
                            <template #default="{ row }">{{ row.user_name }}</template>
                        </el-table-column>
                        <!-- 最長的這欄位別設定寬度 -->
                        <el-table-column prop="user_id" label="請款事由">
                            <template #default="{ row }">{{ row.reason }}</template>
                        </el-table-column>
                        <el-table-column prop="currency" label="幣別" width="90">
                            <template #default="{ row }">{{ row.currency }}</template>
                        </el-table-column>
                        <el-table-column prop="request_amount" label="請款金額" width="120">
                            <template #default="{ row }">{{ row.request_amount }}</template>
                        </el-table-column>
                        <el-table-column prop="payment_method" label="付款方式" sortable="custom" width="120">
                            <template #default="{ row }">{{ row.payment_method }}</template>
                        </el-table-column>
                        <el-table-column prop="payment_detail" label="詳細內容" width="120">
                            <template #default="{ row }">
                                <!-- <div class="file-name" v-for="(file, index) in row.info.files" :key="index">
                                    <a :href="file.url" target="_blank" @click.stop>{{ file.name }}</a>
                                </div> -->
                                <!-- {{ row.info }} -->
                                <template v-if="row.payment_detail == 1">
                                    <!-- <el-icon class="payment-detail-display mt-2">
                                        <Document />
                                    </el-icon> -->
                                    <!-- 這裡引入 font-awesome -->
                                    <font-awesome-icon :icon="['fas', 'file-lines']" class="payment-detail-display mt-2"
                                                       @click="openPaymentDetail" @click.stop />
                                    <!-- <i class="fa fa-file-lines payment-detail-display"
                                       @click="openPaymentDetail">Hi</i> -->
                                    <!-- <div v-if="showPaymentDetail">This is a test</div> -->
                                    <!-- <el-button class="add-payment-detail-btn" type="warning"
                                               @click="createPaymentRequestFormBtn">
                                        簽收中
                                    </el-button> -->

                                </template>
                                <template v-if="row.payment_detail !== 1">
                                    <!-- 這裡引入 font-awesome -->
                                    <font-awesome-icon :icon="['fas', 'file-lines']"
                                                       class="payment-detail-no-display mt-2" />
                                </template>
                            </template>

                        </el-table-column>
                        <el-table-column prop="payment_process" label="進度" sortable="custom" width="100">
                            <template #default="{ row }">{{ row.payment_process1 }}</template>
                        </el-table-column>
                        <!-- 請款欄位 簽收按鈕 -->
                        <el-table-column prop="payment_sign" label="簽核" width="120">
                            <template #default="{ row }">
                                <el-button class="payment-sign-button" type="primary" @click="openPaymentSignDialog"
                                           @click.stop>{{
                                               row.payment_sign
                                           }}</el-button>
                            </template>
                        </el-table-column>
                    </el-table>
                </div>

                <el-form>
                    <el-form-item>
                        <!-- 詳細內容點擊彈窗, 請款內容 -->
                        <PaymentDetail v-model="showPaymentDetail" ref="paymentDialog" />
                    </el-form-item>
                </el-form>

                <el-form>
                    <el-form-item>
                        <!-- 詳細內容點擊彈窗, 請款內容 -->
                        <PaymentSignDialog v-model="showPaymentSignDialog" ref="paymentSignDialog" />
                    </el-form-item>
                </el-form>

                <el-row class="justify-center mt-1">
                    <!-- <el-pagination background layout="prev, pager, next" :current-page="page.currentPage"
                                   :page-count="page.lastPage"
                                   @current-change="(p?: number) => { refresh(p); }" />   -->
                    <!-- <el-pagination background layout="prev, pager, next" :current-page="page.currentPage"
                                   :page-count="page.lastPage" /> -->
                    <el-pagination layout="prev, pager, next" :total="10" />
                </el-row>

            </el-card>
        </div>
    </div>
</template>

<script lang="ts" setup>
import { provide, ref, reactive, nextTick, onMounted, computed, watch, onBeforeMount } from 'vue';
import type { PropType } from 'vue';
import moment from 'moment';
// import { punchs, punch, departments, leaveTypes, users, addLeaveApplication, exportDepartmentPunchs, signs, newSign, newLeaveApplications } from '@/api';
// import type { Department, Punch, User, SignState, NewLeaveApplication } from "@/types";
// import { useUserStore } from '@/store';
// import { httpCode } from '@/client';
import { minuteToHumanTime, signStateText, newSignStateType, newSignStateText, getStatusColor } from '@/config';
import { Calendar, Plus } from "@element-plus/icons-vue";
import { ElMessage, ElMessageBox } from "element-plus";
import PaymentDetail from '@/components/PaymentDetail.vue';
import PaymentSignDialog from '@/components/PaymentSignDialog.vue';

// 查詢請款單表單
const paymentSignForm = reactive({
    start: moment(new Date).format('YYYY-MM-DD'),  // 開始日期
    end: moment(new Date).format('YYYY-MM-DD'),  // 結束日期
    department_id: null,
    selectedDepartment: '',  // 申請部門
    user_id: null,
    user_name: '',  // 申請人
    progress: '', // 進度
    paymentRequest: '', // 請款
    state: null,
    order: null,
    page: 1,
    last_page: 1,
    data: [],
    paymentRequestRange: [moment().hour(9).minute(0).second(0).toDate(), moment().hour(18).minute(0).toDate()],  // 時間區段
    rangeChange: () => { // 時間檢查
        if (moment(paymentSignForm.paymentRequestRange[0]).hour() < 9 || moment(paymentSignForm.paymentRequestRange[0]).hour() > 18)
            paymentSignForm.paymentRequestRange[0] = moment(paymentSignForm.paymentRequestRange[0]).hour(9).toDate();
        if (moment(paymentSignForm.paymentRequestRange[1]).hour() < 9 || moment(paymentSignForm.paymentRequestRange[1]).hour() > 18)
            paymentSignForm.paymentRequestRange[1] = moment(paymentSignForm.paymentRequestRange[1]).hour(18).toDate();
        // paymentSignForm.search();
    },
    disabledDate: (date: Date) => moment().isAfter(moment(date).add(2, 'years')), // 禁用時間    
    // search: () => {
    //     businessTrips(paymentSignForm.start, paymentSignForm.end, paymentSignForm.page, paymentSignForm.department_id, paymentSignForm.user_id, paymentSignForm.state).then(res => {
    //         paymentSignForm.data = res.data.data;
    //     });
    // },
    // update: (id) => {
    //     updateBusinessTrip(id).then(res => {
    //         console.log(res.data);
    //         paymentSignForm.search();
    //     });
    // }
    // sortChange: (column) => {

    //     let { prop, order } = column;

    //     if (prop != null) { // 假如 column 不是 null 的情況下

    //         switch (order) {
    //             case 'ascending':
    //                 order = 'asc';
    //                 break;
    //             case 'descending':
    //                 order = 'desc';
    //                 break;
    //         }
    //         paymentSignForm.order = [[prop, order]];

    //     }
    //     else {
    //         paymentSignForm.order = null;
    //     }

    //     paymentSignForm.search();
    // },
});


// 展開簽核進度
const expandedRowKeys = ref([]);

const handleRowClick = (row: { id: never; }) => {
    const index = expandedRowKeys.value.indexOf(row.id);
    if (index > -1) {
        expandedRowKeys.value.splice(index, 1);
    } else {
        expandedRowKeys.value.push(row.id);
    }
};

// 動態填入簽核進度時間
const getActiveStep = (row: any) => {
    const { index } = row;  // 問題
    // console.log('asdf',index,row)
    return index !== null ? index + 1 : 1;
};

// 簽核進度條, 節點標題從1.送出申請之後+2
const letTitleAdd = (_row: any, index: any, step: any) => {
    return index >= 0 ? `${index + 2}.${step.name}` : step.name;
};

// 動態填入送出申請時間
const getApplyTime = (created_at: any) => {
    const applyTime = created_at.split(' ')[0];
    return applyTime;
};

// 點擊產生 詳細內容
const showPaymentDetail = ref(false);

// 調用子層 "請款內容" 函數, 開啟/關閉對話窗
const paymentDialog = ref();

// 在欄位的詳細內容中開啟子組件 "請款內容" 視窗
const openPaymentDetail = () => {
    // showPaymentDetail.value = true;
    paymentDialog.value.openDialog();
    // console.log('showPaymentDetail:', showPaymentDetail.value);
};

// 點擊產生 請款單簽核
const showPaymentSignDialog = ref(false);

// 調用子層 "請款單簽核" 函數, 開啟/關閉對話窗
const paymentSignDialog = ref();

// 欄位中的請款, 簽核彈窗
const openPaymentSignDialog = () => {
    paymentSignDialog.value.openSignDialog();
};

// 綁定選擇的新增請款單來復用到操作欄位的編輯顯示彈窗
const selectedPaymentRequest = ref(null);

// 定義存放修改的資料
// const editData = ref<businessFormDataType>()

// 頁數取得資料
const page = reactive({
    currentPage: 1,
    lastPage: 1
});
console.log('page', page.lastPage);

const filteredSignApplications = [
    {
        created_at: '2023-02-03',
        department: '總務收款處',
        user_name: '王小姐',
        reason: '收款理由很長很長很長很長很長很長很長很長很長很長很長所以試著讓這個理由框被佔滿43個字',
        currency: '新台幣',
        request_amount: '1,111,000',
        payment_method: '現金',
        info: 'CA 94114',
        payment_detail: 1,
        payment_process0: '未申請',
        payment_process1: '簽收中',
        payment_process2: '審核中',
        payment_sign: '簽核',
        payment_op0: 0,
        payment_op1: 1,
        payment_op2: 2,
        payment_op3: 3,

    }
];
console.log(filteredSignApplications);

</script>


<style lang="scss" scoped>
@import '@/scss/variable.scss';

.payment-request-date-container {
    :deep(.el-card-container) {
        .el-card {
            .payment-request-date-container {
                // width: calc(80vw - 100px);
                font-size: 1rem;

                // 調整 date picker 沒法置入 element-plus, suffix icon api 的問題
                .payment-request-start,
                .payment-request-end {
                    text-align: center;

                    .payment-request-timepicker-start,
                    .payment-request-timepicker-end {
                        .el-input__prefix {
                            @include min-dev($mobile_m) {
                                position: absolute;
                                left: 200px;
                                top: 0;
                            }
                        }

                        // input {
                        //     padding-left: 15px;
                        // }

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

                .payment-request-timepicker-start {
                    margin-left: 100px;

                    @include min-dev($mobile_m) {
                        margin-left: 0px;
                    }
                }

                .payment-request-timepicker-end {
                    margin-left: 95px;

                    @include min-dev($mobile_m) {
                        margin-left: 0px;
                    }
                }

                // 至
                div {
                    .to {
                        display: block;
                        width: 50px;
                        margin-left: 9.5vw;
                        padding-top: 0px;
                        padding-bottom: 15px;

                        @include min-dev($pad) {
                            margin: 0;
                            padding-top: 5px;
                        }
                    }
                }

                // 調整 date picker 沒法置入 element-plus, 日曆以及結尾關閉圖標的 api 的問題
                .payment-request-timepicker {
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

                    // .apply-time-end {

                    //     @include min-dev($pad) {
                    //         margin-left: -90px;

                    //     }
                    // }
                }

            }

            .payment-request-details {

                .payment-request-select-width,
                .el-input__inner {
                    width: 70px !important;
                }
            }

            // 新增請款單, 詳細內容點擊彈窗, 請款內容彈窗
            .add-payment-request-form {

                // 請款內容彈窗
                .payment-sign-dialog {
                    .el-dialog__header {
                        background-color: rgba(216, 234, 242, 1);
                        margin-right: 0px; // 將 el-dialog__header__btn 的 margin-right: 20px; 覆蓋掉
                        box-shadow: 0 1px; // 底線
                        padding-bottom: 10px;
                    }

                    // 確認按鈕
                    .payment-sign-check {
                        background-color: rgba(1, 84, 120, 1);
                    }
                }
            }

            .payment-request-table-container {

                // 展開列欄位隱藏
                .el-table__expand-column {
                    width: 0 !important;
                    padding: 0 !important;
                    border-right: none !important;
                }

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

                // 詳細內容的文件 icon 顯示時
                .payment-detail-display {
                    height: 1.2em;
                    width: 1em;
                    // color: rgray;
                    color: rgba(1, 84, 120, 1);
                    // background-color: white;
                    font-size: 1.2rem;
                }

                // 詳細內容的文件 icon 不顯示時
                .payment-detail-no-display {
                    height: 1.2em;
                    width: 1em;
                    color: gray;
                    // background-color: white;
                    font-size: 1.2rem;
                }

                .payment-sign-button {
                    background-color: rgba(1, 84, 120, 1);
                }


                // 核准/駁回 按鈕顏色
                .state-button-group {
                    position: absolute;
                    background-color: white;

                    :deep(.el-button:nth-child(1)) {
                        background-color: rgba(75, 121, 2, 1);
                        width: 40px;
                        height: 30px;
                    }

                    :deep(.el-button:nth-child(2)) {
                        background-color: rgba(163, 0, 20, 1);
                        width: 40px;
                        height: 30px;
                    }
                }

                .state-set {
                    z-index: -20 !important;
                }

                // 簽核進度背景
                :deep(.el-table__expanded-cell) {
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

                // 第二個進度條
                .show-another-expand {
                    margin: 0% 13.5%;
                }

                // 新增公出單的日期修除後綴
                // .add-business-trip-form-timepicker .el-input__suffix {
                //     display: none;
                // }

                // 新增公出單的時間 input 寬度
                // .add-business-trip-form-time-range,
                // .el-input__inner {
                //     width: 80px !important;
                // }

                // 新增公出單的時間關閉後綴, 清除樣式
                // .add-business-trip-form-time-range .el-input__suffix {
                //     display: none;
                // }
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
    }
}</style>