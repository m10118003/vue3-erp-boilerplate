<template>
    <div class="payment-sign-dialog-container">
        <!-- <el-form>
    <el-form-item>
        <el-button class="payment-sign-btn" type="warning"
                   @click="createPaymentRequestFormBtn">
            簽收中
        </el-button>
    </el-form-item>
</el-form> -->

        <!-- 新增請款單 -->
        <!-- <el-dialog class="add-business-trip-form-dialog" v-model="addBusinessTripForm.value" :width="`${dialogWidth}px`"
               @close="closeOnDelete"
               @open="showLeaveDay"> -->
        <el-dialog class="payment-sign-dialog" v-model="internalPaymentSignDialog"
                   :width="`${dialogWidth}px`"
                   @close="closeOnDelete">
            <div class="flex justify-between">
                <div></div>
                <el-form-item class="payment-sign-title flex self-start ml-20" label="請款單簽核"
                              label-width="85px"></el-form-item>

                <el-form-item class="payment-sign-title" label="申請日期："
                              label-width="85px">
                    <!-- <template #default="{ row }">{{ row.created_at }}</template> -->
                    {{ '2023-02-02' }}
                </el-form-item>
            </div>

            <el-form class="payment-sign-box ml-4" ref="addForm">
                <el-column>
                    <el-descriptions border :column="2" direction="horizontal" class="payment-sign-detail-bright-color">

                        <el-descriptions-item label="申請人" width="110">{{ "Mr. X" }}</el-descriptions-item>
                        <el-descriptions-item label="申請部門">{{ "專案管理處" }}</el-descriptions-item>

                        <el-descriptions-item label="請款事項" :span="2">
                            <template #label>
                                <span>請款事項</span>
                            </template>
                            {{ "雜支(說明)" }}
                        </el-descriptions-item>

                        <!-- <el-descriptions-item class="payment-sign-detail-info" label="付款資訊" :span="2"></el-descriptions-item> -->
                        <el-descriptions-item class="payment-sign-detail-info" :span="2">
                            <template #label>
                                <span class="payment-sign-detail-info-label">付款資訊</span>
                            </template>
                            <template #default>
                                <span class="payment-sign-detail-info-content"></span>
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
                        <el-descriptions-item class="payment-sign-detail-proof-container" :span="2">
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
                            <div class="payment-sign-detail-group flex flex-row items-center justify-start">
                                <!-- <label class="payment-sign-detail-proof-label" type="button">
                            <el-icon class="payment-sign-detail-proof-icon">
                                <CirclePlusFilled />
                            </el-icon>

                            <input class="payment-sign-detail-proof-input"
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
                            <el-form-item class="payment-sign-detail-assign-date">
                                {{ "2023-05-10" }}
                                <!-- <el-date-picker class="payment-sign-detail-assign-date-timepicker mt-5"
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

                        <el-descriptions-item class="payment-sign-detail-comments" label="簽核意見" :span="2">
                            <template #label>
                                <span class="sign-detail-comments">簽核意見</span>
                            </template>
                            <el-input class="sign-detail-input" v-model="signDialogForm.signComments"
                                      placeholder="請輸入簽核意見..." @keydown.enter.prevent />
                        </el-descriptions-item>

                        <!-- 上傳憑證 -->
                        <el-descriptions-item class="payment-sign-form-proof-container" :span="2">
                            <template #label>
                                <span class="payment-sign-form-label">加簽成員</span>
                            </template>

                            <!-- <img :src="file" class="upload-leave-img pl-7"
                                             style="width: 100px; height: 100px; margin-right: 10px;" /> -->

                            <div class="payment-sign-form-group flex flex-row items-center justify-start">
                                <label class="payment-sign-form-proof-label" type="button">
                                    <el-icon class="payment-sign-form-proof-icon">
                                        <CirclePlusFilled />
                                    </el-icon>
                                    
                                    <el-button class="add-sign-members-btn" @click="addSignMembers = true"></el-button>

                                    <!-- <input class="payment-sign-form-proof-input"
                                           style="display:none"
                                           type="file"
                                           multiple
                                           @change="changePaymentProofImg"
                                           accept="image/*,.png,.jpg,.jpeg,.pdf"
                                           ref="files" /> -->
                                </label>
                                <template v-for="(file, index) in signDialogForm.signMember" :key="index">
                                    <div class="payment-sign-form-proof-files flex items-center justify-evenly ml-2">
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

                    </el-descriptions>
                </el-column>

                <div class="payment-sign-detail-btns flex justify-evenly items-center mt-8 p-0">
                    <el-form-item>
                        <el-button class="payment-sign-detail-return" type="success"
                                   @click="create_form.storePayment()">加簽完回傳給我</el-button>
                    </el-form-item>

                    <el-form-item>
                        <el-button class="payment-sign-detail-approve" type="success"
                                   @click="create_form.createPayment()">核准</el-button>
                    </el-form-item>

                    <el-form-item>
                        <el-button class="payment-sign-detail-denied" type="danger"
                                   @click="cancelDialog()">駁回</el-button>
                    </el-form-item>

                    <el-form-item>
                        <el-button class="payment-sign-detail-chancel" type="info"
                                   @click="cancelDialog()">返回</el-button>
                    </el-form-item>

                </div>
            </el-form>
        </el-dialog>
        <el-dialog class="add-sign-members-dialog"
                   v-model="addSignMembers"
                   title="加簽成員"
                   width="22%"
                   :before-close="handleClose"
                   :show-close="false">
            <span>請確認是否收到請款金額 新台幣 1,200元整?</span>
            <template #footer>
                <span class="add-sign-members-dialog-footer">
                    <el-button class="add-sign-members-check mr-4" type="primary"
                               @click="addSignMembers = false">
                        確認
                    </el-button>
                    <el-button type="info" @click="addSignMembers = false">取消</el-button>
                </span>
            </template>
        </el-dialog>
    </div>
</template>

<script lang='ts' setup>
import { provide, ref, reactive, nextTick, onMounted, computed, watch, onBeforeMount, defineProps, defineEmits } from 'vue';
import moment from 'moment';
// import { punchs, punch, departments, leaveTypes, users, addLeaveApplication, exportDepartmentPunchs, signs, newSign, newLeaveApplications } from '@/api';
// import type { Department, Punch, User, SignState, NewLeaveApplication } from "@/types";
// import { useUserStore } from '@/store';
// import { httpCode } from '@/client';
// import { minuteToHumanTime, signType, newSignStateText } from '@/config';
import { Calendar, Plus } from "@element-plus/icons-vue";
import { ElMessage } from "element-plus";

// 新增請款單簽核顯示
const props = defineProps({
    modelValue: Boolean,
});

const emit = defineEmits(['update:modelValue']);

const internalPaymentSignDialog = computed({
    get() {
        return props.modelValue;
    },
    set(val) {
        emit('update:modelValue', val);
    },
});

// 開放方法讓父組件可以直接調用
const openSignDialog = () => {
    internalPaymentSignDialog.value = true;
};

const closeSignDialog = () => {
    internalPaymentSignDialog.value = false;
};

// 開放方法讓父組件可以直接調用
defineExpose({
    openSignDialog,
    closeSignDialog
});

// 離開請款單時清空表格
const closeOnDelete = () => {
    closeSignDialog();
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

// 請款單簽核意見送出
const signDialogForm = reactive({
    signComments: '',
    signMember: [] as Array<any>, // 增加會簽成員
    // return: () => { },
    // send: () => { },
    // search: () => { },
    // update: () => { },
});

// 加簽成員
const addSignMembers = ref(false);

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
            signDialogForm.signMember = [];
            // userFormData.files = [];

            // 創建新的檔案預覽
            for (let i = 0; i < t.files.length; i++) {
                // userFormData.files![i] = window.URL.createObjectURL(t.files![i]);
                signDialogForm.signMember[i] = t.files[i].name;

            }
        }

        // avatar.value = t.files;
    }
};

// 將檔案名稱取前五個字母, 加上檔名
const ctrlFileName = (signMember: any) => {
    return signMember.slice(0, 5) + signMember.substring(signMember.lastIndexOf('.'));
};

// 上傳憑證, 刪除按鈕控制
const removeFile = (index: any) => {
    signDialogForm.signMember.splice(index, 1);
    const fileProofInput = document.querySelector("input[type='file']") as HTMLInputElement;
    if (fileProofInput) {
        fileProofInput.value = '';
    }
};

const dialogWidth = ref(860);  // 新增請款單簽核整體高度

</script>

<style lang="scss" scoped>
@import '@/scss/variable.scss';

.payment-sign-dialog-container {
    .payment-sign-btn {
        background-color: rgba(1, 84, 120, 1);
    }

    :deep(.payment-sign-dialog) {

        .payment-sign-box {

            // 增加高亮顏色
            .payment-sign-detail-bright-color {
                .is-bordered-label {
                    background-color: rgba(216, 234, 242, 1);
                }

                // 在模板使用插槽後這邊改屬性
                table {
                    tr {
                        td {

                            // 有這個 class 的時候去控制父元素
                            &:has(.payment-sign-detail-info-label) {
                                background-color: #fff;
                                // border-left: 1px solid #ebeef5;
                                border-right: none; // 消除右邊的邊框
                            }

                            &:has(.payment-sign-detail-info-content) {
                                border-left: none;

                            }

                            // 簽核意見改變高度
                            // &:has(.sign-detail-comments) {
                            //     height: 100px !important;
                            // }

                            // 簽核意見改變輸入框高度
                            :has(.sign-detail-input, .el-input__inner) {
                                height: 100px !important;
                                // vertical-align:text-top !important;
                                padding-bottom: 60px !important; //根據需要調整頂部填充
                            }
                        }
                    }
                }

                .payment-sign-detail-group {
                    width: 660px;

                    // 憑證下 icon 的顏色樣式
                    .payment-sign-detail-proof-icon {
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
                    .payment-sign-detail-proof-files {
                        width: 7.5rem;
                        max-width: 7.5rem;
                        height: 2rem;
                        border: gray 1px solid;
                        border-radius: 5px;

                        // 上傳檔案名稱省略
                        .payment-sign-detail-files-name {
                            width: 5.8rem;
                            // margin-left: 0.5rem;
                            text-overflow: ellipsis;
                            overflow: hidden;
                            word-break: break-all;
                            white-space: nowrap;
                        }

                        // 上傳檔案的檔案磚
                        .payment-sign-detail-files-btn {
                            // height: 1rem;
                            // width: 1rem;
                            // max-width: 1rem;
                            background-color: #fff;
                            // opacity:0.5;
                            border: none;

                            // 關閉檔案磚
                            .payment-sign-detail-files-close {
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

                // 加簽成員

                .payment-sign-form-group {
                    width: 660px;

                    // 憑證下 icon 的顏色樣式
                    .payment-sign-form-proof-icon {
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

                    // 隱藏加簽成員按鈕
                    .add-sign-members-btn {
                        display: none;
                    }


                    // 上傳檔案的樣式
                    .payment-sign-form-proof-files {
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
            .payment-sign-detail-label {
                color: red;
                margin-right: 4px;
            }

            .payment-sign-detail-btns {
                .payment-sign-detail-return {
                    background-color: rgba(0, 128, 128, 1);
                    width: 150px;
                    height: 40px;
                }

                .payment-sign-detail-approve {
                    background-color: rgba(75, 121, 2, 1);
                    width: 150px;
                    height: 40px;
                }

                .payment-sign-detail-denied {
                    background-color: rgba(163, 0, 20, 1);
                    width: 150px;
                    height: 40px;
                }

                .payment-sign-detail-chancel {
                    background-color: rgba(170, 170, 170, 1);
                    width: 150px;
                    height: 40px;
                }
            }
        }
    }

    :deep(.add-sign-members-dialog) {
        .el-dialog__header {
            background-color: rgba(216, 234, 242, 1);
            margin-right: 0px; // 將 el-dialog__header__btn 的 margin-right: 20px; 覆蓋掉
            box-shadow: 0 1px; // 底線
            padding-bottom: 10px;
        }

        // 確認按鈕
        .add-sign-members-check {
            background-color: rgba(1, 84, 120, 1);
        }
    }

    // 付款方式與幣別寬度
    .payment-select-width {
        width: 100px;
    }
}
</style>