import type { type } from "os";

// import type { routeNames } from "@/router";
export type to = (name: string, params?: any) => void;
export type reload = () => void;
// export type redirect = (title: string, subTitle: string, name: routeNames, icon: 'success' | 'warning' | 'info' | 'error') => void;


export interface User {
    id: number;
    // 姓名
    name: string;
    // 小名
    nickName: string;
    email: string;
    // 角色
    role: Role,
    // 部門
    department: Department;
    // 員工編號
    employeeId: string;
    // 身分證
    identityCard: string;
    // 性別
    gender: string;
    // 出生日期
    dateOfBirth: string;
    // 地址
    address: string;
    // 手機
    phone: string;
    // 到職日
    boardDate: string;
    // 職稱
    jobTitle: string;
    // 頭像
    avatar: string;
    // 卡片Id
    card_id: string;
    // 特休(分)
    paid_vacation: number;
    // 狀態
    state: number;
}

export interface Role {
    id: number;
    name: string;        // 角色名稱
    order: number;       // 優先順序
    cross_view: number, // 跨部門瀏覽
    cross_edit: number;  // 跨部門修改
}

export interface Department {
    id: number;
    name: string;
    user: {
        id: number,
        name: string;
    };
    user_id: number;
}

export interface Menu {
    id: number;
    name: string,    //選單名稱
    path: string,    //選單路徑
    icon: string,
    sort: number;     //排序
    menu_id: number | null,  // 父選單id
    hasChildren?: boolean;    //是否有子選單
    children?: Menu[];        // 子選單
}

export interface Api {
    id: number;
    name: string;     //Api名稱
    method: string;   //請求方法
    path: string;     //路徑
    remark: string;   //備註
}

// 驗證碼類別，暫定
export enum emailCode {
    resetPassword = 'resetPassword'
}

export interface Punch {
    id: number;
    card_id: string;
    in: string;
    out: string;
    machine_id: number;
    user: User;
    day: number;
    dayOfWeek: number;
    current: boolean;
}

export interface PunchRecord {
    // 日
    day: number;
    // 星期
    dayOfWeek: number;
    // 打卡時間
    in: string;
    // 下班打卡時間
    out: string;
    // 機器id
    machine_id: number;
    // 備註
    remark: string[];
    // 狀態
    state: number;
    // 日期型態(假日、上班日、補假...)
    type: number;
}

// 搜索, 搜尋簽核假單
export interface searchSignLeave {
    application: null | string,
    type: string,
    start: null | string,
    end: null | string,
    user_id: null | number,
    department_id: null | number,
    leave_type: null | number,
    state: null | number,
    order: string[][] | null;
}

// 簽核流程
export interface SignProcess {
    id: number,
    // 簽核單名稱
    name: string,
    // 資料表名稱
    table_name: string,
    // 簽核順序
    order: { name: string, user_id: number | null, user_name: string, over: number; }[],
    // 單位
    unit: string;
}

// 簽核單
export interface SignState {
    id: number, // 詳細資料 關聯id
    sign_type: string, // 請假類別
    sign_type_name: string, // 假別名稱
    sign_id: number | null, // 詳細資料 關聯type
    state: number | null,  // 簽核狀態
    created_at: string;
    updated_at: string;
    index: number, // 簽核索引 對應sequence
    // 簽核流程順序
    sequence: {
        id: number,
        name: string,
        label: string,
        time: string,
    }[],
    // 詳細資料
    info: {
        id: number,
        agent: {
            id: number,
            name: string,
        } | null,
        type: {
            id: number,
            name: string,
        },
        reason: null | string,
        times: { start: string, end: string, total: number; }[],
        files: {
            url: string,
            type: string,
            name: string,
        }[];
        start: string,
        end: string | null,
        total: number | null,
    },
    // user: User,
    // 申請人id
    user_id: number,
    // 申請人名稱
    user_name: string;
    // 拒絕原因
    reason: string | null;
    // 部門id
    department_id?: number;
    // 主管id
    manager_id?: number;
    // 起訖時間
    // times: { start: string, end: string; }[],

    // 檔案 url
    // files: {
    //     name: string,
    //     url: string,
    //     type: string;
    // }[];
}

export interface SignFormType {
    data: SignState[];
    order: string[][] | null;
    page: number;
    search: () => void;
    sortChange: (column: any) => void;

}


// 新增 NewSignState 接口
// export interface NewSignState extends Omit<SignState, 'times'> {
//     times: {}[];
// }

// 假卡
export interface LeaveAppLication {
    id: number;
    agent_id: number | null,
    agent: string,
    leave_type_id: number,
    leave_type: string,
    reason: string,
    state: number,
    index: number,
    sequence: {
        id: number,
        name: string,
        label: string,
    },
    sequence_name: string[],
    sign_id: number,
    times: { start: string, end: string; }[],
    files: {
        name: string,
        url: string,
        type: string;
    }[];
}

// 新增請假單
export interface LeaveForm extends Pick<NewLeaveApplication, 'agent' | 'reason'> {
    leave_type: {
        id: number,
        name: string,
    };
    type: number,
    // start: string,
    // startTime: string,
    // end: string,
    // endTime: string,
    files: any[] | undefined | null,

    total?: number;
}

// meta
export interface Meta {
    page: number,
    per_page: number;
    total: number;
    total_page: number;
    last_page: number;
    current_page: number;
    from: number;
    to: number;

}

// 新簽核紀錄
export interface NewLeaveApplication {
    id: number;
    user: User;
    agent: null | any;
    sign_state: {
        id: number;
        state: number | null;
        sequence: {
            id: number,
            name: string,
            label: string,
        },
        index: number;
        reason: null | string;
    };
    files: [{
        name: string;
        type: string;
        path: string;
    }];
    leave_records: [{
        start: string;
        end: string;
    }];
    total: number;
    start: string | null;
    end: string | null;
    reason: string;
    leave_type: {
        id: number | null;
        name: string;
    };
    created_at: string;
    updated_at: string;
    order: string[][] | null;
}

export interface NewLeaveFormType {
    data: NewLeaveApplication[];
    order?: string[][];
    page: number;
    search: () => void;
    sortChange: (column: any) => void;

}

// 簽核紀錄會用到的字體顏色
export interface NewLeaveAppTextColor {
    text: string;
    color: string;
}

// 公出單
export interface BusinessTrip {
    id: number,
    date: string,
    place: string,
    reason: string,
    state: number,
    user_id: number,
    user_name: string,
    out: null | {
        date: string,
        time: string;
    },
    back: null | {
        date: string,
        time: string;
    };
}

// 請款單 操作 編輯復用定義
// export interface businessFormDataType {
//     type: string,


// }