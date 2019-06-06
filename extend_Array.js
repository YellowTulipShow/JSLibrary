/*
    扩展 Array 数组
        js 删除数组几种方法 (大神解决方案)
        http://www.cnblogs.com/qiantuwuliang/archive/2010/09/01/1814706.html
*/
(function() {
    Array.prototype.Delete = function(n) {
        return n < 0 ? this : this.slice(0, n).concat(this.slice(n + 1, this.length));
    }
})();
