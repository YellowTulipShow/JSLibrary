function Map() {
    this.O = new Object();
    this.keyLength = 0;
    // 添加键值对
    this.Set = function (key, value) {
        this.O[key] = value;
    };
    // 获取键对应的值
    this.Get = function (key) {
        return this.O[key];
    };
    this.ContainsKey = function(key) {
        var v = this.Get(key);
        return v != undefined;
    };
    // 去除键值，(去除键数据中的键名及对应的值)
    this.Remove = function (key) {
        delete this.O[key];
    };
    // 判断键值元素是否为空
    this.isEmpty = function () {
        return this.Size() == 0;
    };
    // 获取键值元素大小
    this.Size = function () {
        if (this.keyLength <= 0) {
            this.keyLength = this.Keys().length;
        }
        return this.keyLength;
    };
    this.Keys = function () {
        var keys = new Array();
        for (var key in this.O) {
            keys.push(key);
        }
        return keys;
    };
    this.ContainsValue = function (value) {
        for (var key in this.O) {
            if (this.O[key] == value) {
                return true;
            }
        }
        return false;
    };
}
