/*
    静态 随机数据
*/
(function() {
    window.RandomData = {
        ID: function() {
            function S4() {
                return (((1+Math.random())*0x10000)|0).toString(16).substring(1);
            }
            var self = this;
            var str = S4();
            var ki = 4;
            for (var i = 0; i < 6; i++) {
                if (self.Int(0, 2) === 0 && ki > 0) {
                    str += '-';
                    ki -= 1;
                }
                str += S4();
            }
            return str;
        },
        Item: function(array) {
            if (window.CheckData.IsSizeEmpty(array)) {
                return null;
            }
            return array[this.Int(0, array.length)];
        },
        Int: function(min, max) {
            if (min > max) {
                var zhong = min;
                min = max;
                max = zhong;
            }
            max = parseInt(max) - 1;
            switch(arguments.length) {
                case 1: return parseInt(Math.random() * min + 1);
                case 2: return parseInt(Math.random() * (max - min + 1) + min);
                default: return 0;
            }
        },
        DateTime: function(min, max) {
            if (min > max) {
                var zhong = min;
                min = max;
                max = zhong;
            }
            var min_val_obj = min.GetNormalValue();
            var max_val_obj = max.GetNormalValue();
            var obj = {
                result: 0,
                upstatue: 0,
            };
            function TimeRangeSelect(obj, min, max, start, end) {
                if (obj.upstatue == 4) {
                    obj.result = this.Int(min, max);
                } else {
                    var minvalue = (obj.upstatue == 3) ? min : start;
                    var maxvalue = (obj.upstatue == 2) ? max - 1 : end;
                    if (minvalue > maxvalue) {
                        var zhong = minvalue;
                        minvalue = maxvalue;
                        maxvalue = zhong;
                    }
                    obj.result = this.Int(minvalue, maxvalue + 1);

                    var selfstatus = 0;
                    if (minvalue == obj.result && obj.result == maxvalue) {
                        selfstatus = 1;
                    }
                    if (minvalue == obj.result && obj.result < maxvalue) {
                        selfstatus = (obj.upstatue == 3) ? 4 : 2;
                    }
                    if (minvalue < obj.result && obj.result == maxvalue) {
                        selfstatus = (obj.upstatue == 2) ? 4 : 3;
                    }
                    if (minvalue < obj.result && obj.result < maxvalue) {
                        selfstatus = 4;
                    }
                    obj.upstatue = (selfstatus < obj.upstatue) ? obj.upstatue : selfstatus;
                }
                return obj;
            }
            obj = TimeRangeSelect(obj, 1, 9999 + 1, min_val_obj.Year, max_val_obj.Year);
            var r_Year = obj.result;
            obj = TimeRangeSelect(obj, 1, 12 + 1, min_val_obj.Month, max_val_obj.Month);
            var r_Month = obj.result;
            obj = TimeRangeSelect(obj, 1, window.CommonData.GetMaxDayCount(r_Year, r_Month) + 1, min_val_obj.Day, max_val_obj.Day);
            var r_Day = obj.result;
            obj = TimeRangeSelect(obj, 0, 23 + 1, min_val_obj.Hour, max_val_obj.Hour);
            var r_Hour = obj.result;
            obj = TimeRangeSelect(obj, 0, 59 + 1, min_val_obj.Minute, max_val_obj.Minute);
            var r_Minute = obj.result;
            obj = TimeRangeSelect(obj, 0, 59 + 1, min_val_obj.Second, max_val_obj.Second);
            var r_Second = obj.result;
            obj = TimeRangeSelect(obj, 0, 999 + 1, min_val_obj.Millisecond, max_val_obj.Millisecond);
            var r_Millisecond = obj.result;
            return Date.NewTime(r_Year, r_Month, r_Day, r_Hour, r_Minute, r_Second, r_Millisecond);
        },
        CombinedString: function(array, strlength) {
            var self = this;
            if (window.CheckData.IsSizeEmpty(array) || arguments.length <= 0) {
                array = window.CommonData.ASCII_WordText();
            }
            if (arguments.length <= 1) {
                strlength = 32;
            }
            var result = new Array();
            for (var i = 0; i < strlength; i++) {
                var index = self.Int(0, array.length);
                var item = array[index].toString();
                result.push(item);
            }
            return result.join('');
        }
    };
})();
