<template>
    <h2>查詢</h2>
    <el-card>
        <div class="business-trip-container flex flex-col md:flex-row">
            <el-form-item class="business-trip-start" label="申請時間：" label-width="100px">
                <el-date-picker class="business-trip-timepicker-start" v-model="form.start" type="date"
                                format="YYYY-MM-DD" value-format="YYYY-MM-DD" @change="form.rangeChange"
                                @panel-change="form.rangeChange"
                                prefix-icon="Calendar" :disabled-date="form.disabledDate" :editable="false"
                                :picker-options="startDate" />
            </el-form-item>
            <div>
                <span class="to px-5">至</span>
            </div>
            <el-form-item class="business-trip-end" label-width="100px">
                <el-date-picker class="business-trip-timepicker-end" v-model="form.end" type="date"
                                format="YYYY-MM-DD" value-format="YYYY-MM-DD" @change="form.rangeChange"
                                @panel-change="form.rangeChange"
                                prefix-icon="Calendar" :disabled-date="form.disabledDate" :editable="false"
                                :picker-options="endDate" />
            </el-form-item>
        </div>

    </el-card>
    公出日期<input v-model="form.start">至<input v-model="form.end"><br />
    部門<select v-model="form.department_id">
        <option :value="null">全部</option>
        <option v-for="department in departmentList" :value="department.id">{{ department.name }}</option>
    </select><br />
 
    申請人<select v-model="form.user_id">
        <option :value="null">全部</option>
        <option v-for="user in userList" :value="user.id">{{ user.name }}</option>
    </select><br />
    2
    狀態<select v-model.number="form.state">
        <option :value="null">全部</option>
        <option :value="1">正常</option>
        <option :value="0">未完成</option>
    </select><br />
    <button @click="form.search">搜尋</button>

    <table>
        <thead>
            <th>日期</th>
            <th>申請人</th>
            <th>外出時間</th>
            <th>地點</th>
            <th>事由</th>
            <th>返回時間</th>
            <th>狀態</th>
        </thead>
        <tbody>
            <tr v-for="row in form.data">
                <td>{{ row.date }}</td>
                <td>{{ row.user_name }}</td>
                <td>{{ row.out }}</td>
                <td>{{ row.place }}</td>
                <td>{{ row.reason }}</td>
                <td>
                    <template v-if="row.back != null">
                        {{ row.back }}
                    </template>
                    <template v-else>
                        <button @click="form.update(row.id)">返回</button>
                    </template>
                </td>
                <td>
                    <template v-if="row.state == 0">
                        未完成
                    </template>
                    <template v-else-if="row.state == 1">
                        正常
                    </template>
                    <template v-else>
                        ???
                    </template>
                </td>
            </tr>
        </tbody>
    </table>
    <hr />
    <h2>申請</h2>
    申請人:{{ create_form.user_name }}<br />
    時間<input v-model="create_form.date" />
    地點<input v-model="create_form.place" /><br />
    事由<input v-model="create_form.reason" /><br />
    <button @click="create_form.create">送出</button>
</template>

<script setup>
import { useUserStore } from '@/store';
import { reactive, ref, watch } from 'vue';
import { users, departments, businessTrips, addBusinessTrip, updateBusinessTrip } from '@/api';
import moment from 'moment';

// 部門列表
const departmentList = ref([]);
// 首次查詢部門列表
departments().then(res => {
    departmentList.value = res.data.data;
});

// 使用者列表
const userList = ref([]);
// 首次查詢使用者表單
users().then(res => {
    userList.value = res.data.data;
});

const userStore = useUserStore();

// 查詢公出單表單
const form = reactive({
    start: '',
    end: '',
    department_id: null,
    user_id: null,
    state: null,
    page: 1,
    last_page: 1,
    data: [],
    search: () => {
        businessTrips(form.start, form.end, form.page, form.department_id, form.user_id, form.state).then(res => {
            form.data = res.data.data;
        });
    },
    update: (id) => {
        updateBusinessTrip(id).then(res => {
            console.log(res.data);
            form.search();
        });
    }
});

// 監看department_id並更新使用者清單
watch(() => form.department_id, () => {
    users(form.department_id).then(res => {
        userList.value = res.data.data;
    });
});

// 新增公出單表單
const create_form = reactive({
    user_id: userStore.id,
    user_name: userStore.name,
    date: '2023-03-28 09:00:00',
    place: 'test place',
    reason: 'test reason',
    create: () => {
        addBusinessTrip(create_form.date, create_form.place, create_form.reason).then(res => {
            console.log(res.data);
            form.search();
        }).catch(err => {

        });
    }
})



</script>

<style lang="scss" scope>
@import '@/scss/variable.scss';

.el-card {
    .business-trip-container {
        // width: calc(80vw - 100px);
        font-size: 1rem;

        // 調整 date picker 沒法置入 element-plus, suffix icon api 的問題
        .business-trip-date {
            text-align: center;

            .business-trip-datepicker {
                .el-input__prefix {
                    position: absolute;
                    left: 200px;
                    top: 0;
                }

                input {
                    padding-left: 15px;
                }

                .el-input__suffix {
                    display: none;
                }
            }
        }

        // 調整 date picker 沒法置入 element-plus, 日曆以及結尾關閉圖標的 api 的問題
        .business-trip-timepicker {
            max-width: 85%;

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