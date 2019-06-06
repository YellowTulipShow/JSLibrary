/* 静态 转化工具 */
(function() {
    window.ConvertTool = {
        ArrayToString: function(arrayobj, symbol) {
            if (window.CheckData.IsStringNull(symbol)) {
                return '';
            }
            var resustr = '';
            for (var i = 0; i < arrayobj.length; i++) {
                if (window.CheckData.IsStringNull(arrayobj[i])) {
                    continue;
                } else if (i != 0) {
                    resustr += symbol;
                }
                resustr += arrayobj[i];
            }
            return resustr;
        },
        ToInt: function(objvalue, defint) {
            if (arguments.length <= 1) {
                defint = 0;
            }
            var parsed = Number.parseInt(objvalue.toString(), 0);
            if (Number.isNaN(parsed)) {
                return defint;
            }
            return parsed;
        },
        ToDate: function(s_date, format) {
            if (arguments.length <= 1) {
                format = 'yyyy-MM-dd HH:mm:ss';
            }
            if (arguments.length <= 0) {
                return new Date();
            }

            s_date = s_date.replace(/-/g,"/");
            return new Date(s_date);
        },
    };
})();
