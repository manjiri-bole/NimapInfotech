"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class dateoperations {
    constructor() {
        //this._startDate = new Date(startDate);
        //this._nextDate = new Date(startDate);
        this.today = new Date();
    }
    get todayDate() {
        return this.today;
    }
    // get currentDatetime() {
    //     let date = this.today.getFullYear() + '-' + (this.today.getMonth() + 1) + '-' + this.today.getDate();
    //     let time = this.today.getHours() + ":" + this.today.getMinutes() + ":" + this.today.getSeconds();
    //     return date + " " + time;
    // }
    get currentDatetime() {
        this.today = new Date();
        let get_month, get_day, get_hour, get_min, get_sec;
        let Year = this.today.getFullYear();
        get_month = this.today.getMonth() + 1;
        get_day = this.today.getDate();
        get_hour = this.today.getHours();
        get_min = this.today.getMinutes();
        get_sec = this.today.getSeconds();
        if (get_month < 10) {
            get_month = '0' + get_month;
        }
        if (get_day < 10) {
            get_day = '0' + get_day;
        }
        if (get_hour < 10) {
            get_hour = '0' + get_hour;
        }
        if (get_min < 10) {
            get_min = '0' + get_min;
        }
        if (get_sec < 10) {
            get_sec = '0' + get_sec;
        }
        let date = Year + '-' + get_month + '-' + get_day;
        let time = get_hour + ":" + get_min + ":" + get_sec;
        return date + " " + time;
    }
    get CurrentTime() {
        this.today = new Date();
        let get_hour, get_min, get_sec;
        get_hour = this.today.getHours();
        get_min = this.today.getMinutes();
        get_sec = this.today.getSeconds();
        if (get_hour < 10) {
            get_hour = '0' + get_hour;
        }
        if (get_min < 10) {
            get_min = '0' + get_min;
        }
        if (get_sec < 10) {
            get_sec = '0' + get_sec;
        }
        let time = get_hour + ":" + get_min + ":" + get_sec;
        return time;
    }
    get NextDate() {
        this.today = new Date();
        let get_month, get_day;
        let Year = this.today.getFullYear();
        get_month = this.today.getMonth() + 1;
        get_day = this.today.getDate() + 1;
        if (get_month < 10) {
            get_month = '0' + get_month;
        }
        if (get_day < 10) {
            get_day = '0' + get_day;
        }
        let date = Year + '-' + get_month + '-' + get_day;
        return date;
    }
    get startDate() {
        return this._startDate;
    }
    get nextDate() {
        return this._nextDate;
    }
    todayStringDateTime() {
        return this.getStringDateTime(this.getStringDate(this.todayDate));
    }
    getStringDateTime(d) {
        return new Date(d);
    }
    getParseDate(d) {
        return (d.getDate() < 10 ? '0' : '') + d.getDate();
    }
    getParseMonth(d) {
        return (d.getMonth() < 10 ? '0' : '') + (d.getMonth() + 1);
    }
    getParseFullYear(d) {
        return d.getFullYear();
    }
    getStringDate(d) {
        return `${this.getParseFullYear(d)}-${this.getParseMonth(d)}-${this.getParseDate(d)}`;
    }
    isToday(d) {
        return d.getTime() === this.todayStringDateTime().getTime();
    }
    isPastDate(d) {
        return d.getTime() < this.todayStringDateTime().getTime();
    }
    isStartDate() {
        return this._nextDate.getTime() === this._startDate.getTime();
    }
    // updatedStartDate() {
    //     this._nextDate.setDate(this._startDate.getDate() + 1);
    // }
    updatedStartDate(d) {
        return d.setDate(d.getDate() + 1);
    }
    nextDateTime() {
        return this._nextDate.setDate(this._startDate.getDate() + 1);
    }
    getMonthName(month) {
        let months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
        return months[month] || null;
    }
    getCriteriaDate(d) {
        return `${this.getMonthName(d.getMonth())} ${this.getParseDate(d)}, ${this.getParseFullYear(d)}`;
    }
}
exports.default = dateoperations;
//# sourceMappingURL=DateOperations.js.map