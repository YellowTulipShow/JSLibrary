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
    function RecursiveBase(chain_array, bindBase) {
        var base_list = new Array();
        for (var index = 0; index < chain_array.length; index++) {
            initializing = true;
            var o = new chain_array[index]();
            initializing = false;
            for (var k in o) {
                if (o.hasOwnProperty(k)) {
                    if (typeof (o[k]) === "function") {
                        o[k] = o[k].bind(bindBase);
                    }
                }
            }
            base_list.push(o);
        }
        return base_list;
    }
    var Class = function() {};
    Class.Inherit = function(property, functionName) {
        var baseF = null;
        if (this !== Class) {
            baseF = this;
        // } else {
        //     baseF = function() {};
        //     baseF.prototype = {
        //         __init__: function() {},
        //     };
        //     baseF.constructor = baseF;
        }
        function F() {
            this._base_ = RecursiveBase(this._chain_, this);
            if (!initializing) {
                this.__init__.apply(this, arguments);
            }
        }

        if (baseF != null) {
            initializing = true;
            F.prototype = new baseF();
            F.prototype.constructor = F;
            initializing = false;
        } else {
            F.prototype = {};
            F.prototype.constructor = F;
        }
        var chain = F.prototype._chain_;
        F.prototype._chain_ = !chain ? new Array() : deepCopy([], chain);
        if (baseF != null) {
            F.prototype._chain_.push(baseF);
        }
        F.prototype._functionName_ = functionName;
        F.Inherit = arguments.callee;

        for (var name in property) {
            if (property.hasOwnProperty(name)) {
                F.prototype[name] = property[name];
            }
        }
        F._type_ = F;
        return F;
    };
    this.Class = Class;
})();
