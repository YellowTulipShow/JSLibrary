function Map() {
    this.keys = new Array();
    this.values = new Array();

    this.Keys = function() {};
    this.Size = function() {};
    this.ContainsKey = function(key) {};
    this.ContainsValue = function(value) {};

    //添加键值对
    this.Set = function (key, value) {
        if (this.values[key] == null) {//如键不存在则身【键】数组添加键名
            this.keys.push(value);
        }
        this.values[key] = value;//给键赋值
    };
    //获取键对应的值
    this.Get = function (key) {
        return this.values[key];
    };
    //去除键值，(去除键数据中的键名及对应的值)
    this.Remove = function (key) {
        this.keys.remove(key);
        this.values[key] = null;
    };
    //判断键值元素是否为空
    this.isEmpty = function () {
        return this.keys.length == 0;
    };
    //获取键值元素大小
    this.Size = function () {
        return this.keys.length;
    };
}
