<template>
    <div class="add-payment-request-form-dialog-container">
        <el-form>
            <el-form-item>
                <el-button class="add-payment-request-form-btn" type="primary"
                           @click="createPaymentRequestFormBtn">+
                    新增請款單
                </el-button>
            </el-form-item>
        </el-form>

        <!-- 新增請款單 -->
        <!-- <el-dialog class="add-business-trip-form-dialog" v-model="addBusinessTripForm.value" :width="`${dialogWidth}px`"
                       @close="closeOnDelete"
                       @open="showLeaveDay"> -->
        <el-dialog class="add-payment-request-form-dialog" v-model="addPaymentRequestForm"
                   :width="`${dialogWidth}px`"
                   @close="closeOnDelete">
            <el-row :gutter="20">
                <el-col :sm="24">
                    <el-form-item class="add-payment-request-form-title" label="新增請款單"
                                  label-width="100px"></el-form-item>
                </el-col>
            </el-row>

            <el-form class="add-payment-request-form-box ml-4" ref="addForm">
                <el-column>
                    <el-descriptions border :column="2" direction="horizontal" class="payment-form-bright-color">

                        <el-descriptions-item label="申請人">Mr. X</el-descriptions-item>
                        <el-descriptions-item label="申請部門">專案管理處</el-descriptions-item>

                        <el-descriptions-item label="請款事項" :span="2">
                            <template #label>
                                <span class="payment-form-label">*</span>請款事項
                            </template>
                            <el-input v-model="create_form.paymentMatter" placeholder="請輸入請款事項..." />
                        </el-descriptions-item>

                        <!-- <el-descriptions-item class="payment-form-info" label="付款資訊" :span="2"></el-descriptions-item> -->
                        <el-descriptions-item class="payment-form-info" :span="2">
                            <template #label>
                                <span class="payment-form-info-label">付款資訊</span>
                            </template>
                            <template #default>
                                <span class="payment-form-info-content"></span>
                            </template>
                        </el-descriptions-item>

                        <el-descriptions-item label="廠商名稱">
                            <template #label>
                                <span class="payment-form-label">*</span>廠商名稱
                            </template>
                            <el-input v-model="create_form.companyName" placeholder="請輸入廠商名稱..." />
                        </el-descriptions-item>
                        <el-descriptions-item label="統一編號">
                            <template #label>
                                <span class="payment-form-label">*</span>統一編號
                            </template>
                            <el-input v-model="create_form.uniformNumbers" placeholder="請輸入統一編號..." />
                        </el-descriptions-item>

                        <el-descriptions-item label="聯絡人">
                            <template #label>
                                <span class="payment-form-label">*</span>聯絡人
                            </template>
                            <el-input v-model="create_form.contact" placeholder="請輸入聯絡人..." />
                        </el-descriptions-item>
                        <el-descriptions-item label="聯絡電話">
                            <template #label>
                                <span class="payment-form-label">*</span>聯絡電話
                            </template>
                            <el-input v-model="create_form.phone" placeholder="請輸入聯絡電話..." />
                        </el-descriptions-item>
                        <!-- 上傳憑證 -->
                        <el-descriptions-item class="payment-form-proof-container" :span="2">
                            <template #label>
                                <span class="payment-form-label">*</span>憑證
                            </template>

                            <!-- <img :src="file" class="upload-leave-img pl-7"
                                             style="width: 100px; height: 100px; margin-right: 10px;" /> -->

                            <div class="payment-form-group flex flex-row items-center justify-start">
                                <label class="payment-form-proof-label" type="button">
                                    <el-icon class="payment-form-proof-icon">
                                        <CirclePlusFilled />
                                    </el-icon>

                                    <input class="payment-form-proof-input"
                                           style="display:none"
                                           type="file"
                                           multiple
                                           @change="changePaymentProofImg"
                                           accept="image/*,.png,.jpg,.jpeg,.pdf"
                                           ref="files" />
                                </label>
                                <template v-for="(file, index) in create_form.files" :key="index">
                                    <div class="payment-form-proof-files flex items-center justify-evenly ml-2">
                                        <!-- <el-tooltip
                                                            class="box-item"
                                                            effect="dark"
                                                            :content="file"
                                                            placement="bottom"><span class="files-name">{{ file }}</span>
                                                </el-tooltip> -->

                                        <!-- <span class="files-name">{{ file }}</span> -->
                                        <span class="files-name flex items-center justify-center">{{ ctrlFileName(file)
                                        }}</span>


                                        <!-- <el-popover placement="top-start" title="請假審核" :width="200"
                                                                trigger="hover"
                                                                content="0000" :hide-after="0"><ul>{{ file }}</ul>
                                                        <template #reference>
                                                            <ul>
                                                                <el-tag v-for="leave in data.leaves" :key="leave.leave_id"
                                                                        :color="bgColor(data.id)"
                                                                        :style="{ color: textColor(data.id) }"
                                                                        class="w-20 mr-1">{{ file }}
                                                                </el-tag>
                                                            </ul>
                                                        </template>
                                                    </el-popover> -->

                                        <button @click.prevent="removeFile(index)"
                                                class="files-btn flex items-center justify-center">
                                            <el-icon class="files-close">
                                                <CloseBold />
                                            </el-icon>
                                        </button>
                                    </div>
                                </template>
                            </div>
                            <!-- <label class="upload-leave-label ml-7" type="button">上傳圖片
                                        <input style="display:none"
                                               type="file"
                                               multiple
                                               @change="changePaymentProofImg"
                                               :src="userFormData.files?.[0]"
                                               accept="image/*,.png,.jpg"
                                               ref="files" />
                                    </label> -->
                        </el-descriptions-item>

                        <el-descriptions-item label="收款人/代付">
                            <template #label>
                                <span class="payment-form-label">*</span>收款人/代付
                            </template>
                            <el-input v-model="create_form.payee" placeholder="請輸入收款人/代付..." />
                        </el-descriptions-item>
                        <el-descriptions-item label="統一編號/員工編號">
                            <template #label>
                                <span class="payment-form-label">*</span>統一編號/員工編號
                            </template>
                            <el-input v-model="create_form.uniOrEmployeeNumbers" placeholder="請輸入統一編號/員工編號..." />
                        </el-descriptions-item>

                        <el-descriptions-item label="付款方式">
                            <template #label>
                                <span class="payment-form-label">*</span>付款方式
                            </template>
                            <el-select v-model="create_form.selectedPaymentMethod" class="payment-select-width"
                                       placeholder="請選擇">
                                <el-option value="現金" label="現金" />
                                <el-option value="匯款" label="匯款" />
                                <el-option value="支票" label="支票" />
                                <!-- <el-option :value="user.id" :label="user.name" :key="user.id" v-for="user in selectData.users" /> -->
                            </el-select>
                        </el-descriptions-item>
                        <el-descriptions-item label="指定付款日期">
                            <el-form-item class="payment-form-assign-date">
                                <el-date-picker class="payment-form-assign-date-timepicker mt-5"
                                                v-model="create_form.paymentDate"
                                                type="date"
                                                format="YYYY-MM-DD" value-format="YYYY-MM-DD"
                                                @change="create_form.rangeChange"
                                                @panel-change="create_form.rangeChange"
                                                prefix-icon="Calendar" :disabled-date="create_form.disabledDate"
                                                :editable="false"
                                                :picker-options="create_form.paymentDate" />
                            </el-form-item>
                        </el-descriptions-item>

                        <el-descriptions-item label="開戶銀行">
                            <el-input v-model="create_form.bankDeposit" placeholder="請輸入開戶銀行..." />
                        </el-descriptions-item>

                        <el-descriptions-item label="銀行帳號">
                            <el-input v-model="create_form.bankAccount" placeholder="請輸入銀行帳號..." />
                        </el-descriptions-item>

                        <el-descriptions-item>
                            <template #label>
                                <span class="payment-form-label">*</span>付款金額
                            </template>
                            <el-input v-model="create_form.paymentAmount" placeholder="請輸入付款金額..." />
                        </el-descriptions-item>

                        <el-descriptions-item label="幣別">
                            <template #label>
                                <span class="payment-form-label">*</span>幣別
                            </template>
                            <el-select v-model="create_form.selectedCurrency" class="payment-select-width"
                                       placeholder="請選擇">
                                <el-option value="新台幣" label="新台幣" />
                                <!-- <el-option :value="user.id" :label="user.name" :key="user.id" v-for="user in selectData.users" /> -->
                            </el-select>
                        </el-descriptions-item>

                    </el-descriptions>
                </el-column>

                <div class="payment-request-form-btns flex justify-between items-center mt-8 p-0">
                    <el-form-item>
                        <el-button class="payment-request-form-store" type="warning"
                                   @click="create_form.storePayment()">儲存</el-button>
                    </el-form-item>
                    <div class="inline-flex">
                        <el-form-item>
                            <el-button class="payment-request-form-submit mr-5" type="primary"
                                       @click="create_form.createPayment()">送出</el-button>
                        </el-form-item>
                        <el-form-item>
                            <el-button class="payment-request-form-chancel" type="info"
                                       @click="cancelDialog()">取消</el-button>
                        </el-form-item>
                    </div>
                </div>
            </el-form>
        </el-dialog>
    </div>
</template>

<script lang='ts' setup>
import { provide, ref, reactive, nextTick, onMounted, computed, watch, watchEffect, onBeforeMount } from 'vue';
import moment from 'moment';
// import { punchs, punch, departments, leaveTypes, users, addLeaveApplication, exportDepartmentPunchs, signs, newSign, newLeaveApplications } from '@/api';
// import type { Department, Punch, User, SignState, NewLeaveApplication } from "@/types";
// import { useUserStore } from '@/store';
// import { httpCode } from '@/client';
// import { minuteToHumanTime, signType, newSignStateText } from '@/config';
import { Calendar, Plus } from "@element-plus/icons-vue";
import { ElMessage } from "element-plus";
import PaymentRequestTable from '@/components/PaymentRequestTable/index.vue';

// 新增請款單彈窗顯示
const addPaymentRequestForm = ref(false);

const createPaymentRequestFormBtn = () => {
    addPaymentRequestForm.value = true;
};

// const paymentRequestStyle = ({
//     labelStyle: {'background-color: 'white'}
// })

// 這個子組件需要觸發 update:modelValue 事件
const props = withDefaults(defineProps<{
    modelValue: boolean;
}>(), {
    modelValue: false
});

// 監聽modelValue, 並在 modelValue 改變時更新子組件的值
watchEffect(() => {
    addPaymentRequestForm.value = props.modelValue;
});

// 關閉對話窗時, 將新的值作為參數傳遞給父組件並更新 v-model 雙向綁定
const emit = defineEmits(['update:modelValue']);

// 通知父組件更新 v-model 雙向綁定的值
watch(addPaymentRequestForm, (newVal) => {
    emit('update:modelValue', newVal);
});


// 新增請款單表單
const create_form = reactive({
    // user_id: userStore.id,
    // user_name: userStore.name,
    user_name: '', //  申請人
    selectedDepartment: '',  // 申請部門
    paymentMatter: '', // 請款事項
    paymentInfo: '', // 付款資訊
    companyName: '', // 廠商名稱
    uniformNumbers: '', // 統一編號
    contact: '', // 聯絡人
    phone: '', // 聯絡電話
    files: [] as Array<any>, // 上傳憑證
    proof: '', // 憑證
    payee: '', // 收款人
    uniOrEmployeeNumbers: '', // 統一編號/員編
    selectedPaymentMethod: '', // 付款方式
    paymentDate: moment(new Date).format('YYYY-MM-DD'), // 指定付款日期
    paymentDateRange: [moment().hour(9).minute(0).second(0).toDate(), moment().hour(18).minute(0).toDate()],  // 時間區段
    rangeChange: () => { // 時間檢查
        if (moment(create_form.paymentDateRange[0]).hour() < 9 || moment(create_form.paymentDateRange[0]).hour() > 18)
            create_form.paymentDateRange[0] = moment(create_form.paymentDateRange[0]).hour(9).toDate();
        if (moment(create_form.paymentDateRange[1]).hour() < 9 || moment(create_form.paymentDateRange[1]).hour() > 18)
            create_form.paymentDateRange[1] = moment(create_form.paymentDateRange[1]).hour(18).toDate();
        // create_form.search();
    },
    disabledDate: (date: Date) => moment().isAfter(moment(date).add(2, 'years')), // 禁用時間
    bankDeposit: '', // 開戶銀行
    bankAccount: '', // 銀行帳號
    paymentAmount: '', // 付款金額
    selectedCurrency: '', // 幣別
    storePayment: () => {

    },
    createPayment: () => {

        const date_str = moment(create_form.paymentDate).format('YYYY-MM-DD HH:mm:ss');
        // addBusinessTrip(date_str, create_form.place, create_form.reason).then(res => {
        //     console.log(res.data);
        //     form.search();
        // }).catch(err => {

        // });
    },
    dateChange: () => {
        console.log('asd', create_form.paymentDate); // 時間檢查
        if (moment(create_form.paymentDate).hour() < 9)
            create_form.paymentDate = moment(create_form.paymentDate).set({ hour: 9 }).toDate().toString();  // 之後傳值要注意一下
        else if ((moment(create_form.paymentDate).hour() > 18))
            create_form.paymentDate = moment(create_form.paymentDate).set({ hour: 18 }).toDate().toString();
    },
});

// 上傳圖片設定
const changePaymentProofImg = (e: Event) => {
    if (e.target) {
        const t = e.target as HTMLInputElement;
        if (t.files && t.files.length) {
            // 檔案限制在 5 個以內
            // console.log(t.files);
            if (t.files && t.files.length > 5) {
                ElMessage.error('最多只能上傳5個檔案');
                return;
            }

            // 移除舊的檔案預覽
            create_form.files = [];
            // userFormData.files = [];

            // 創建新的檔案預覽
            for (let i = 0; i < t.files.length; i++) {
                // userFormData.files![i] = window.URL.createObjectURL(t.files![i]);
                create_form.files[i] = t.files[i].name;

            }
        }

        // avatar.value = t.files;
    }
};

// 將檔案名稱取前五個字母, 加上檔名
const ctrlFileName = (file: any) => {
    return file.slice(0, 5) + file.substring(file.lastIndexOf('.'));
};

// 上傳憑證, 刪除按鈕控制
const removeFile = (index: any) => {
    create_form.files.splice(index, 1);
    const fileProofInput = document.querySelector("input[type='file']") as HTMLInputElement;
    if (fileProofInput) {
        fileProofInput.value = '';
    }
};

// 離開請款單時清空表格
const closeOnDelete = () => {
    // userFormData.leave_type.id = 5;
    // 代理人顯示為 無
    // create_form.place = ''; // 右上 XX 後地點清空
    // create_form.reason = ''; // 右上 XX 後理由清空
    // 清空上傳圖片的預覽，檢查 userFormData.files 是否為 null 或 undefined
    // if (userFormData.files) userFormData.files = [];
    // 清空檔案上傳
    // avatar.value = null;
    // 清空檔案輸入元素的值
    // if (files.value) files.value.value = "";
    // 重設驗證訊息
    // addForm.value?.resetFields();
};

// 返回, 關閉對話視窗
const cancelDialog = () => {
    addPaymentRequestForm.value = false;
    // create_form.place = ''; // 右上 XX 後地點清空
    // create_form.reason = ''; // 右上 XX 後理由清空
};

const dialogWidth = ref(860);  // 新增請款單整體高度
// const dialogHeigh = ref<number>(750);  // 新增請款單整體寬度
</script>

<style lang="scss" scoped>
@import '@/scss/variable.scss';

.add-payment-request-form-dialog-container {
    .add-payment-request-form-btn {
        background-color: rgba(1, 84, 120, 1);
    }

    :deep(.add-payment-request-form-dialog) {

        .add-payment-request-form-box {

            // 增加高亮顏色
            .payment-form-bright-color {
                .is-bordered-label {
                    background-color: rgba(216, 234, 242, 1);
                }

                // 在模板使用插槽後這邊改屬性
                table {
                    tr {
                        td {

                            // 有這個 class 的時候去控制父元素
                            &:has(.payment-form-info-label) {
                                background-color: #fff;
                                // border-left: 1px solid #ebeef5;
                                border-right: none; // 消除右邊的邊框
                            }

                            &:has(.payment-form-info-content) {
                                border-left: none;

                            }
                        }
                    }
                }

                // table {
                //     tr {
                //         &:nth-of-type(3) {
                //             td {
                //                 border: none;
                //             }

                //             td:nth-child(1) {
                //                 // 付款資訊
                //                 background-color: #fff;
                //                 // outline-style: solid 0.5px;
                //                 // border-color: #ebeef5 #ebeef5 #ebeef5 #ebeef5;
                //                 border-left: 1px solid #ebeef5;
                //             }

                //             td:nth-child(2) {
                //                 border-right: 1px solid #ebeef5;
                //             }
                //         }
                //     }
                // }
                .payment-form-group {
                    width: 660px;

                    // 憑證下 icon 的顏色樣式
                    .payment-form-proof-icon {
                        height: 1.5em;
                        width: 1.5em;
                        color: rgba(1, 84, 120, 1);
                        font-size: 1.5rem;
                        background-color: white;
                        border-radius: 50px;
                        cursor: pointer;

                        &:hover {
                            color: #78d6fe;
                            transition: 0.5s;
                        }

                        &:after {
                            transition-delay: 1s;
                            transition-duration: 1.5s;
                        }
                    }

                    // 上傳檔案的樣式
                    .payment-form-proof-files {
                        width: 7.5rem;
                        max-width: 7.5rem;
                        height: 2rem;
                        border: gray 1px solid;
                        border-radius: 5px;

                        // 上傳檔案名稱省略
                        .files-name {
                            width: 5.8rem;
                            // margin-left: 0.5rem;
                            text-overflow: ellipsis;
                            // overflow: hidden;
                            word-break: break-all;
                            white-space: nowrap;
                            z-index: 2;
                            padding-left: 5px;
                        }

                        // 上傳檔案的檔案磚
                        .files-btn {
                            // height: 1rem;
                            // width: 1rem;
                            // max-width: 1rem;
                            background-color: #fff;
                            // opacity:0.5;
                            border: none;

                            // 關閉檔案磚
                            .files-close {
                                // height: 1rem;
                                // width: 1rem;
                                // max-width: 1rem;
                                cursor: pointer;

                                &:hover {
                                    color: gray;
                                    transition: 0.5s;
                                }

                                &:after {
                                    transition-delay: 1s;
                                    transition-duration: 1.5s;
                                }
                            }
                        }
                    }

                }
            }

            // 幫 label 加上紅色 *
            .payment-form-label {
                color: red;
                margin-right: 4px;
            }

            .payment-request-form-btns {
                .payment-request-form-submit {
                    background-color: rgba(1, 84, 120, 1);
                }
            }
        }
    }

    // 付款方式與幣別寬度
    .payment-select-width {
        width: 100px;
    }
}
</style>