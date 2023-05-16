<template>
    <div class="add-payment-detail-dialog-container">

        <!-- <el-form>
            <el-form-item>
                <el-button class="add-payment-detail-btn" type="warning"
                           @click="createPaymentRequestFormBtn">
                    簽收中
                </el-button>
            </el-form-item>
        </el-form> -->

        <!-- 新增請款單 -->
        <!-- <el-dialog class="add-business-trip-form-dialog" v-model="addBusinessTripForm.value" :width="`${dialogWidth}px`"
                       @close="closeOnDelete"
                       @open="showLeaveDay"> -->
        <el-dialog class="add-payment-detail-dialog" v-model="internalPaymentDetail"
                   :width="`${dialogWidth}px`"
                   @close="closeOnDelete">
            <el-row :gutter="20">
                <el-col :sm="24">
                    <el-form-item class="add-payment-detail-title" label="請款內容"
                                  label-width="85px"></el-form-item>
                </el-col>
            </el-row>

            <el-form class="add-payment-detail-box ml-4" ref="addForm">
                <el-column>
                    <el-descriptions border :column="2" direction="horizontal" class="payment-detail-bright-color">

                        <el-descriptions-item label="申請人" width="110">{{ "Mr. X" }}</el-descriptions-item>
                        <el-descriptions-item label="申請部門">{{ "專案管理處" }}</el-descriptions-item>

                        <el-descriptions-item label="請款事項" :span="2">
                            <template #label>
                                <span>請款事項</span>
                            </template>
                            {{ "雜支(說明)" }}
                        </el-descriptions-item>

                        <!-- <el-descriptions-item class="payment-detail-info" label="付款資訊" :span="2"></el-descriptions-item> -->
                        <el-descriptions-item class="payment-detail-info" :span="2">
                            <template #label>
                                <span class="payment-detail-info-label">付款資訊</span>
                            </template>
                            <template #default>
                                <span class="payment-detail-info-content"></span>
                            </template>
                        </el-descriptions-item>

                        <el-descriptions-item label="廠商名稱" width="110">
                            <template #label>
                                <span>廠商名稱</span>
                            </template>
                            {{ "久久五金" }}
                            <!-- <el-input v-model="create_form.companyName" placeholder="請輸入廠商名稱..." /> -->
                        </el-descriptions-item>
                        <el-descriptions-item label="統一編號" width="80">
                            <template #label>
                                <span>統一編號</span>
                            </template>
                            {{ "12345678" }}
                            <!-- <el-input v-model="create_form.uniformNumbers" placeholder="請輸入統一編號..." /> -->
                        </el-descriptions-item>

                        <el-descriptions-item label="聯絡人" width="110">
                            <template #label>
                                <span>聯絡人</span>
                            </template>
                            <!-- <el-input v-model="create_form.contact" placeholder="請輸入聯絡人..." /> -->
                            {{ "陳小姐" }}
                        </el-descriptions-item>
                        <el-descriptions-item label="聯絡電話" width="80">
                            <template #label>
                                <span>聯絡電話</span>
                            </template>
                            <!-- <el-input v-model="create_form.phone" placeholder="請輸入聯絡電話..." /> -->
                            {{ "04-12345678" }}
                        </el-descriptions-item>
                        <!-- 上傳憑證 -->
                        <el-descriptions-item class="payment-detail-proof-container" :span="2">
                            <template #label>
                                <span>憑證</span>
                            </template>

                            <!-- <img :src="file" class="upload-leave-img pl-7"
                                             style="width: 100px; height: 100px; margin-right: 10px;" /> -->
                            <!-- <template #default="{ row }">
                                <div class="file-name" v-for="(file, index) in row.files" :key="index">
                                    這段隱著, 之後可以用 @click="showImage(file.path)
                                    這段隱著, 之後可以用 <el-button v-if="file.name === file.type" :src="file.path" alt="file.name">
                                    <a :href="file.path" target="_blank" @click.stop>{{ file.name }}</a>
                                    這段隱著, 之後可以用 </el-button>
                                    這段隱著, 之後可以用 <span v-else>{{ file.name }}</span>
                                </div>
                            </template> -->
                            <div class="payment-detail-group flex flex-row items-center justify-start">
                                <!-- <label class="payment-detail-proof-label" type="button">
                                    <el-icon class="payment-detail-proof-icon">
                                        <CirclePlusFilled />
                                    </el-icon>

                                    <input class="payment-detail-proof-input"
                                           style="display:none"
                                           type="file"
                                           multiple
                                           @change="changePaymentProofImg"
                                           accept="image/*,.png,.jpg,.jpeg,.pdf"
                                           ref="files" />
                                </label> -->
                                <el-button type="primary" target="_blank">{{ "請款單.pdf" }}</el-button>
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

                        <el-descriptions-item label="收款人/代付" width="110">
                            <template #label>
                                <span>收款人/代付</span>
                            </template>
                            <!-- <el-input v-model="create_form.payee" placeholder="請輸入收款人/代付..." /> -->
                            {{ "王小姐" }}
                        </el-descriptions-item>
                        <el-descriptions-item label="統一編號/員工編號" width="80">
                            <template #label>
                                <span>統一編號/員工編號</span>
                            </template>
                            <!-- <el-input v-model="create_form.uniOrEmployeeNumbers" placeholder="請輸入統一編號/員工編號..." /> -->
                            {{ "0020" }}
                        </el-descriptions-item>

                        <el-descriptions-item label="付款方式" width="110">
                            <template #label>
                                <span>付款方式</span>
                            </template>
                            <!-- <el-select v-model="create_form.selectedPaymentMethod" class="payment-select-width"
                                       placeholder="請選擇">
                                <el-option value="現金" label="現金" />
                                <el-option value="匯款" label="匯款" />
                                <el-option value="支票" label="支票" />
                                <el-option :value="user.id" :label="user.name" :key="user.id" v-for="user in selectData.users" />
                            </el-select> -->
                            {{ "現金" }}
                        </el-descriptions-item>
                        <el-descriptions-item label="指定付款日期" width="80">
                            <el-form-item class="payment-detail-assign-date">
                                {{ "2023-05-10" }}
                                <!-- <el-date-picker class="payment-detail-assign-date-timepicker mt-5"
                                                v-model="create_form.paymentDate"
                                                type="date"
                                                format="YYYY-MM-DD" value-format="YYYY-MM-DD"
                                                @change="create_form.rangeChange"
                                                @panel-change="create_form.rangeChange"
                                                prefix-icon="Calendar" :disabled-date="create_form.disabledDate"
                                                :editable="false"
                                                :picker-options="create_form.paymentDate" /> -->
                            </el-form-item>
                        </el-descriptions-item>

                        <el-descriptions-item label="開戶銀行" width="110">
                            <!-- <el-input v-model="create_form.bankDeposit" placeholder="請輸入開戶銀行..." /> -->
                            {{ "土地銀行" }}
                        </el-descriptions-item>

                        <el-descriptions-item label="銀行帳號" width="80">
                            <!-- <el-input v-model="create_form.bankAccount" placeholder="請輸入銀行帳號..." /> -->
                            {{ "20669999142784" }}
                        </el-descriptions-item>

                        <el-descriptions-item width="110">
                            <template #label>
                                <span>付款金額</span>
                            </template>
                            <!-- <el-input v-model="create_form.paymentAmount" placeholder="請輸入付款金額..." /> -->
                            {{ "100,000" }}
                        </el-descriptions-item>

                        <el-descriptions-item label="幣別" width="80">
                            <template #label>
                                <span>幣別</span>
                            </template>
                            <!-- <el-select v-model="create_form.selectedCurrency" class="payment-select-width"
                                       placeholder="請選擇">
                                <el-option value="新台幣" label="新台幣" />
                                <el-option :value="user.id" :label="user.name" :key="user.id" v-for="user in selectData.users" />
                            </el-select> -->
                            {{ "新台幣" }}
                        </el-descriptions-item>

                    </el-descriptions>
                </el-column>

                <!-- <div class="payment-detail-btns flex justify-between items-center mt-8 p-0">
                    <el-form-item>
                        <el-button class="payment-detail-store" type="warning"
                                   @click="create_form.storePayment()">儲存</el-button>
                    </el-form-item>
                    <div class="inline-flex">
                        <el-form-item>
                            <el-button class="payment-detail-submit mr-5" type="primary"
                                       @click="create_form.createPayment()">送出</el-button>
                        </el-form-item>
                        <el-form-item>
                            <el-button class="payment-detail-chancel" type="info"
                                       @click="cancelDialog()">取消</el-button>
                        </el-form-item>
                    </div>
                </div> -->
            </el-form>
        </el-dialog>
    </div>
</template>

<script lang='ts' setup >
import { provide, ref, reactive, nextTick, onMounted, computed, watch, onBeforeMount, defineProps, defineEmits  } from 'vue';
import moment from 'moment';
// import { punchs, punch, departments, leaveTypes, users, addLeaveApplication, exportDepartmentPunchs, signs, newSign, newLeaveApplications } from '@/api';
// import type { Department, Punch, User, SignState, NewLeaveApplication } from "@/types";
// import { useUserStore } from '@/store';
// import { httpCode } from '@/client';
// import { minuteToHumanTime, signType, newSignStateText } from '@/config';
import { Calendar, Plus } from "@element-plus/icons-vue";
import { ElMessage } from "element-plus";
// import PaymentRequestTable from '@/components/PaymentRequestTable/index.vue';

// 新增請款單彈窗顯示
const props = defineProps({
    modelValue: Boolean,
});

const emit = defineEmits(['update:modelValue']);

const internalPaymentDetail = computed({
    get() {
        return props.modelValue;
    },
    set(val) {
        emit('update:modelValue', val);
    },
});

// 開放方法讓父組件可以直接調用
const openDialog = () => {
    internalPaymentDetail.value = true;
};

const closeDialog = () => {
    internalPaymentDetail.value = false;
};

// 開放方法讓父組件可以直接調用
defineExpose({
    openDialog,
    closeDialog
});
// const internalPaymentDetail = ref(props.modelValue);

// watch(internalPaymentDetail, (newVal) => {
//     emit('update:modelValue', newVal);
// });

// const props = defineProps({
//     modelValue: Boolean,

//     internalPaymentDetail: {
//         type: Boolean,
//         default: false,
//     },
// });

// console.log('props', props);


// const createPaymentRequestFormBtn = () => {
//     internalPaymentDetail.value = true;
// };



// const paymentRequestStyle = ({
//     labelStyle: {'background-color: 'white'}
// })

// const emit = defineEmits(["update:modelValue"]);

// 離開請款單時清空表格
const closeOnDelete = () => {
    closeDialog();
    // props.internalPaymentDetail = false;
    // internalPaymentDetail.value = false;
    // emit('update:internalPaymentDetail', false);
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
    // internalPaymentDetail.value = false;
    // create_form.place = ''; // 右上 XX 後地點清空
    // create_form.reason = ''; // 右上 XX 後理由清空
};

const dialogWidth = ref(860);  // 新增請款單整體高度
// const dialogHeigh = ref<number>(750);  // 新增請款單整體寬度
</script>

<style lang="scss" scoped>
@import '@/scss/variable.scss';

.add-payment-detail-dialog-container {
    .add-payment-detail-btn {
        background-color: rgba(1, 84, 120, 1);
    }

    :deep(.add-payment-detail-dialog) {

        .add-payment-detail-box {

            // 增加高亮顏色
            .payment-detail-bright-color {
                .is-bordered-label {
                    background-color: rgba(216, 234, 242, 1);
                }

                // 在模板使用插槽後這邊改屬性
                table {
                    tr {
                        td {

                            // 有這個 class 的時候去控制父元素
                            &:has(.payment-detail-info-label) {
                                background-color: #fff;
                                // border-left: 1px solid #ebeef5;
                                border-right: none; // 消除右邊的邊框
                            }

                            &:has(.payment-detail-info-content) {
                                border-left: none;

                            }
                        }
                    }
                }
                .payment-detail-group {
                    width: 660px;

                    // 憑證下 icon 的顏色樣式
                    .payment-detail-proof-icon {
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
                    .payment-detail-proof-files {
                        width: 7.5rem;
                        max-width: 7.5rem;
                        height: 2rem;
                        border: gray 1px solid;
                        border-radius: 5px;

                        // 上傳檔案名稱省略
                        .payment-detail-files-name {
                            width: 5.8rem;
                            // margin-left: 0.5rem;
                            text-overflow: ellipsis;
                            overflow: hidden;
                            word-break: break-all;
                            white-space: nowrap;
                        }

                        // 上傳檔案的檔案磚
                        .payment-detail-files-btn {
                            // height: 1rem;
                            // width: 1rem;
                            // max-width: 1rem;
                            background-color: #fff;
                            // opacity:0.5;
                            border: none;

                            // 關閉檔案磚
                            .payment-detail-files-close {
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
            .payment-detail-label {
                color: red;
                margin-right: 4px;
            }

            .payment-detail-btns {
                .payment-detail-submit {
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