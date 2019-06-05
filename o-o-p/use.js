function deepCopy(p, c) {
    var c = c || {};
    for (var i in p) {
        if (typeof p[i] === 'object') {
            c[i] = (p[i].constructor === Array) ? [] : {};
            deepCopy(p[i], c[i]);
        } else {
            c[i] = p[i];
        }
    }
    return c;
}
function Unrealized() {
    throw "throw Unrealized Method Exception!!!";
}

(function() {
    /* 引用自: JavaScript继承详解（五）http://www.cnblogs.com/sanshi/archive/2009/07/14/1523523.html */
    var initializing = false;
    Class = function() { };
    Class.extend = function(prop) {
        var baseClass = null;
        if (this !== Class) {
            baseClass = this;
        }
        function F() {
            if (!initializing) {
                if (baseClass) {
                    this._super_ = baseClass.prototype;
                }
                this.__init__.apply(this, arguments);
            }
        }
        if (baseClass) {
            initializing = true;
            F.prototype = new baseClass();
            F.prototype.constructor = F;
            initializing = false;
        }
        F.extend = arguments.callee;
        for (var name in prop) {
            if (prop.hasOwnProperty(name)) {
                var is_func = typeof (prop[name]) === "function";
                var is_pro_func = typeof (F.prototype[name]) === "function";
                var is_base_func = /\b_base_\b/.test(prop[name]);
                if (baseClass && is_func && is_pro_func && is_base_func) {
                    F.prototype[name] = (function(name, fn) {
                        return function() {
                            this._base_ = baseClass.prototype[name];
                            return fn.apply(this, arguments);
                        };
                    })(name, prop[name]);
                } else {
                    F.prototype[name] = prop[name];
                }
            }
        }
        return F;
    };
})();
