/*
    扩展 Date 时间
    使用:
        var time = new Date(); // 当前时间
        var time_format_string = time.FormatAsString('yyyy-MM-dd HH:mm:ss'); // 格式化时间成 2019-06-06 09:30:00 字符串格式
        var time_obj = time.GetNormalValue(); // 获取符合逻辑的时间各部分内容
        var app_new_time = time.AppendValueClone("yyyy", 1); 给时间添加一年, 并返回全新的时间对象
        time = time.AppendValueClone("MM", 1); 在当前时间基础上增加一个月
        var new_time = Date.NewTime(2019, 06, 06, 09, 30, 00, 00); // 创建一个时间对象
*/
(function() {
    Date.prototype.FormatAsString = function(format) {
        if (arguments.length <= 0) {
            format = 'yyyy-MM-dd HH:mm:ss';
        }
        var o = {
            "M+" : this.getMonth()+1, // month
            "d+" : this.getDate(), // day
            "[hH]+" : this.getHours(), // hour
            "m+" : this.getMinutes(), // minute
            "s+" : this.getSeconds(), // second
            "q+" : Math.floor((this.getMonth()+3)/3), // quarter
            "S" : this.getMilliseconds() // millisecond
        }
        if(/(y+)/.test(format)) {
            format=format.replace(RegExp.$1, (this.getFullYear()+"").substr(4 - RegExp.$1.length));
        }
        for(var k in o) {
            if (new RegExp("(" + k + ")").test(format)) {
                format = format.replace(RegExp.$1, RegExp.$1.length==1 ? o[k] : ("00"+ o[k]).substr((""+ o[k]).length));
            }
        }
        return format;
    }
    Date.prototype.GetNormalValue = function() {
        return {
            Year: this.getFullYear(),
            Month: this.getMonth() + 1,
            Day: this.getDate(),
            Hour: this.getHours(),
            Minute: this.getMinutes(),
            Second: this.getSeconds(),
            Millisecond: this.getMilliseconds(),
        };
    }
    Date.prototype.AppendValueClone = function(matchFmt, diffValue) {
        matchFmt = matchFmt || 'TTT';
        var v = this.GetNormalValue();
        diffValue = (!diffValue || isNaN(diffValue)) ? 0 : parseInt(diffValue);
        switch(matchFmt) {
            case 'yyyy': v.Year += diffValue; break;
            case 'MM': v.Month += diffValue; break;
            case 'dd': v.Day += diffValue; break;
            case 'HH':
            case 'hh': v.Hour += diffValue; break;
            case 'mm': v.Minute += diffValue; break;
            case 'ss': v.Second += diffValue; break;
        }
        return window.CommonData.CreateDateTime(v.Year, v.Month, v.Day, v.Hour, v.Minute, v.Second, v.Millisecond);
    }
    Date.prototype.AppendValue = function(matchFmt, diffValue) {
        if (isNaN(diffValue))
            return this;
        switch(matchFmt) {
            case 'yyyy': this.setFullYear(this.getFullYear() + Number(diffValue)); break;
            case 'MM': this.setMonth(this.getMonth() + Number(diffValue)); break;
            case 'dd': this.setDate(this.getDate() + Number(diffValue)); break;
            case 'HH':
            case 'hh': this.setHours(this.getHours() + Number(diffValue)); break;
            case 'mm': this.setMinutes(this.getMinutes() + Number(diffValue)); break;
            case 'ss': this.setSeconds(this.getSeconds() + Number(diffValue)); break;
        }
        return this;
    }
    Date.NewTime = function(year, month, day, hour, minute, second, millisecond) {
        var year = year || 1;
        var month = month || 1;
        var day = day || 1;
        var hour = hour || 0;
        var minute = minute || 0;
        var second = second || 0;
        var millisecond = millisecond || 0;
        return new Date(year, month - 1, day, hour, minute, second, millisecond);
    }
})();
