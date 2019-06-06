/*
    静态 常用数据
*/
(function() {
    window.CommonData = {
        MaxDayCount: function(year, month) {
            if (month == 2) {
                var calc_num = year % 100 == 0 ? 400 : 4;
                return (year % calc_num == 0) ? 29 : 28;
            }
            return (month <= 7 ? month : month + 1) % 2 == 1 ? 31 : 30;
        },
        ASCII_Number: function() {
            return ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'];
        },
        ASCII_UpperEnglish: function() {
            return ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'];
        },
        ASCII_LowerEnglish: function() {
            return ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z'];
        },
        ASCII_Special: function() {
            return ['!', '"', '#', '$', '%', '&', '\'', '(', ')', '*', '+', ',', '-', '.', '/', ':', ';', '<', '=', '>', '?', '@', '[', '\\', ']', '^', '_', '`', '{', '|', '}', '~'];
        },
        ASCII_WordText: function() {
            var self = this;
            var arr_number = self.ASCII_Number();
            var arr_en_upper = self.ASCII_UpperEnglish();
            var arr_en_lower = self.ASCII_LowerEnglish();
            return arr_number.concat(arr_en_upper, arr_en_lower);
        },
        ASCII_ALL: function() {
            var self = this;
            var arr_number = self.ASCII_Number();
            var arr_en_upper = self.ASCII_UpperEnglish();
            var arr_en_lower = self.ASCII_LowerEnglish();
            var arr_special = self.ASCII_Special();
            return arr_number.concat(arr_en_upper, arr_en_lower, arr_special);
        },
        ASCII_Hexadecimal: function() {
            return ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', 'a', 'b', 'c', 'd', 'e', 'f'];
        },
    };
})();
