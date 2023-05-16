
// export const apiBaseUrl = 'http://192.168.66.12/api/'

// export const apiBaseUrl = `${meta.content}/`
// export const host = `${meta2.content}/`

import type { NewLeaveAppTextColor } from "@/types";


// API 路徑以及 SERVER HOST 更改為吃 .env 檔案
export const apiBaseUrl = import.meta.env.VITE_API_URL;
export const apiTest2BaseUrl = 'http://192.168.66.12/test2';
export const host = import.meta.env.VITE_SERVER_HOST;

// 日期型態
export const dateType = (type: number) => {
    switch (type) {
        // 一般上班日
        case -1:
            return '';
        // 一般假日
        case 0:
            return 'danger';
        // 國定假日
        case 1:
            return 'success';
        // 補假
        case 2:
            return 'info';
        // 補班
        case 3:
            return 'warning';
        // 一般上班日
        default:
            return '';
    }
};

export const signType = {
    LeaveApplication: 'LeaveApplication'     //假卡
};

export const signStateText = (type: number) => {
    switch (type) {
        case 0:
            return '審核中';
        case 1:
            return '通過';
        case 2:
            return '拒絕';
        case 3:
            return '取消';
    }
};

// 綁定請假單中的狀態欄位文字到 row.sign_state.state
export const newSignStateText = (type: number) => {
    // let text = '';
    // let color = '';
    switch (type) {
        case 0:
            return '審核中';
        // color= '#4B7902'
        case 1:
            return '核准';
        // color= '#000000'
        case 2:
            return '駁回';
        // color= '#D9001B'
        case 3:
            return '取消';
        // color= '#000000'
    }
};
// 顏色對應請假單中的狀態欄位文字到 row.sign_state.state
export const getStatusColor = (type: number) => {
    switch (type) {
        case 0:
            return "#000000";
        case 1:
            return "#4B7902";
        case 2:
            return "#D9001B";
        case 3:
            return "#000000";
    }
};

// 顏色對應請假單中的狀態欄位文字到 time status
export const timeStatusColor = (type: string) => {
    switch (type) {
        case 'empty':
            return "#000000";
        case 'time':
            return "#4B7902";
        case 'problem':
            return "#D9001B";
        case 'warning':
            return "#FFFF00";
    }
};

// 顏色對應請假單中的狀態欄位文字到 row.sign_state.state
export const getBusinessTripStateColor = (type: number | null) => {
    switch (type) {
        case null:
            return "#000000"; // 全部
        case 0:
            return "#D9001B"; // 未完成
        case 1:
            return "#4B7902"; // 正常
        case 2:
            return "#FFFF00"; // 預留顏色
        case 3:
            return "#FFFF00"; // 預留顏色
    }
};
export const signStateType = (type: number) => {
    switch (type) {
        case 0:
            return '';
        case 1:
            return 'success';
        case 2:
            return 'danger';
        case 3:
            return 'warning';
    }
};

export const newSignStateType = (type: number) => {
    switch (type) {
        case 0:
            return 'wait'; // 審核中
        case 1:
            return 'success'; // 通過
        case 2:
            return 'error'; // 拒絕
        case 3:
            return ''; // 取消
    }
};

export const bgColor = (type: any) => {
    switch (type) {
        case 0:
            return '#f7cce2';
        case 1:
            return '#DB4D6D';
        case 2:
            return '#BDBDBD';
        case 3:
            return '#cfbfe5';
        case 4:
            return '#cfe5ce';
        case 5:
            return '#c4e0ef';
        case 6:
            return '#f1d4d7';
        case 7:
            return '#A8D8B9';
        case 8:
            return '#d9dacf';
        case 9:
            return '#a3bedd';
        case 10:
            return '#f9e0c7';
        case 11:
            return '#e6affc';
        case 12:
            return '#087ad8';
        case 13:
            return '#ffffbf';
        case 14:
            return '#b8d0c5';
        case 15:
            return '#95D672';
        case 16:
            return '#44a4b7';
        default:
            return '#A8DAFE';
    }

};

export const textColor = (type: any) => {
    switch (type) {
        case 0:
            return '#704F4F';
        case 1:
            return '#FFFFFF';
        case 2:
            return '#261212';
        case 3:
            return '#4A4A4A';
        case 4:
            return '#313F50';
        case 5:
            return '#363636';
        case 6:
            return '#536A84';
        case 7:
            return '#0003A3';
        case 8:
            return '#526983';
        case 9:
            return '#38495C';
        case 10:
            return '#6A5373';
        case 11:
            return '#585858';
        case 12:
            return '#F5F5F5';
        case 13:
            return '#7C7C7C';
        case 14:
            return '#5D5D5D';
        case 15:
            return '#131199';
        case 16:
            return '#ffff';
        default:
            return '#2F2F2F';
    }
};

// 計算分鐘被轉換成天、小時和分鐘後的數值
export const minuteToHumanTime = (minute: number) => {
    const day: number = (minute - (minute % 480)) / 480;
    const hour = (minute % 480 - (minute % 60)) / 60;
    const _minute = minute % 60;

    // if(day > 0 && hour == 0 && _minute == 0)
    //     return `${day}天`
    // else if(day > 0){
    //     return `${day}天${hour}時${_minute}分`
    // }
    // else{
    //     return `${hour}時${_minute}分`
    // }

    let str = '';
    if (day > 0)
        str += `${day} 天` + ` ${hour} 時`;
    if (hour > 0)
        str += `${hour} 時` + ` ${_minute} 分`;
    if (_minute > 0)
        str += `${_minute}分`;
    return str;
};

// 新增請假單, 計算分鐘被轉換成天、小時後的數值 → 請假天數：
export const leaveDaysHours = (minute: number) => {
    const day: number = (minute - (minute % 480)) / 480;
    const hour = (minute % 480 - (minute % 60)) / 60;
    const _minute = minute % 60;

    // if(day > 0 && hour == 0 && _minute == 0)
    //     return `${day}天`
    // else if(day > 0){
    //     return `${day}天${hour}時${_minute}分`
    // }
    // else{
    //     return `${hour}時${_minute}分`
    // }

    let str = '';
    if (day > 0)
        str += `${day} 天` + ` ${hour} 時`;
    else if (hour > 0)
        str += `${hour} 時` + ` ${_minute} 分`;
    else if (_minute > 0)
        str += `${_minute}分`;
    return str;
};

// 新增特休天數, 計算分鐘被轉換成天、小時後的數值 → 請假天數：
export const paidVacationDaysHours = (minute: number) => {
    const day: number = (minute - (minute % 480)) / 480;
    const hour = (minute % 480 - (minute % 60)) / 60;
    const _minute = minute % 60;

    // if(day > 0 && hour == 0 && _minute == 0)
    //     return `${day}天`
    // else if(day > 0){
    //     return `${day}天${hour}時${_minute}分`
    // }
    // else{
    //     return `${hour}時${_minute}分`
    // }

    let str = '';
    if (day > 0) {
        str += `${day} 天` + ` ${hour} 時` + ` ${_minute} 分`;
    }
    else if (hour > 0) {
        str += `${hour} 時` + ` ${_minute} 分`;
    }
    else if (_minute > 0) {
        str += `${_minute}分`;
    }
    return str;
};