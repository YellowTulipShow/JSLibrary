/*
    继承类实现
    作者: YellowTulipShow
    开源地址: https://github.com/YellowTulipShow/JSLibrary/tree/master/o-o-p/Class.Inherit.js
    使用看同级目录下的 Class.Inherit.Use.html
*/
(function() {
    function deepCopy(target, sourceProperty, config) {
        var t = target || {};
        var s = sourceProperty;
        var c = config || {
            base: null,
            isContinue: function(sourceProperty, key) {},
        };
        for (var i in s) {
            if (c.isContinue && c.isContinue(s, i)) {
                continue;
            }
            if (typeof s[i] === 'object') {
                t[i] = (s[i].constructor === Array) ? [] : {};
                deepCopy(s[i], t[i], config);
                continue;
            }
            if (typeof (s[i]) === "function") {
                if (c.base) {
                    t[i] = s[i].bind(c.base);;
                    continue;
                }
            }
            t[i] = s[i];
        }
        return t;
    }
    function Unrealized() {
        throw "throw Unrealized Method Exception!!!";
    }

    var initializing = false;
    function RecursiveBase(chain_array, index, bindBase) {
        initializing = true;
        var obj = deepCopy({}, chain_array[index].prototype);
        initializing = false;
        if (index > 0) {
            var _base_ = RecursiveBase(chain_array, index - 1, bindBase);
            for (var key in _base_) {
                if (_base_.hasOwnProperty(key)) {
                    if (typeof (_base_[key]) === "function") {
                        _base_[key] = _base_[key].bind(bindBase);
                    }
                    console.log(_base_, key);
                }
            }
            obj["_base_"] = _base_;
        }
        return obj;
    }
    var Class = function() {};
    Class.Inherit = function(property, functionName) {
        var baseF = null;
        if (this !== Class) {
            baseF = this;
        } else {
            baseF = function() {};
            baseF.prototype = {
                __init__: function() {},
            };
            baseF.constructor = baseF;
        }
        function F() {
            if (!initializing) {
                this._base_ = RecursiveBase(this._chain_, this._chain_.length - 1, this);
                this.__init__.apply(this, arguments);
            }
        }

        initializing = true;
        F.prototype = new baseF();
        F.prototype.constructor = F;
        initializing = false;
        var chain = F.prototype._chain_;
        F.prototype._chain_ = !chain ? new Array() : deepCopy([], chain);
        F.prototype._chain_.push(baseF);
        F.prototype._functionName_ = functionName;
        F.Inherit = arguments.callee;
        for (var name in property) {
            if (property.hasOwnProperty(name)) {
                F.prototype[name] = property[name];
            }
        }
        return F;
    };
    this.Class = Class;
})();
