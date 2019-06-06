/*
    静态 检查数据
*/
(function() {
    window.CheckData = {
        IsUndefined: function(obj) {
            //获得undefined，保证它没有被重新赋值
            var undefined = void(0);
            return obj === undefined;
        },
        IsObjectNull: function(obj) {
            return this.IsUndefined(obj) || obj == null;
        },
        IsStringNull: function(str) {
            return this.IsObjectNull(str) || str.toString() == "" || str.toString() == '';
        },
        IsChinaChar: function(value) {
            return /.*[\u4e00-\u9fa5]+.*$/.test(value);
        },
        IsSizeEmpty: function(array) {
            return this.IsObjectNull(array) || !array.length || array.length <= 0;
        },
    };
})();
