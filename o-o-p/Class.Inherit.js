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
                deepCopy(s[i], t[i]);
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
    var Class = function() {};
    Class.Inherit = function(property, functionName) {
        var baseF = this !== Class ? this : null;
        function F() {
            // console.log(this);
            // this.__init__.apply(this.F, arguments);
            this.__init__(arguments);
        }
        F.Inherit = arguments.callee;
        F.Inherit = Class.Inherit;

        if (baseF) {
            F.prototype = deepCopy({}, baseF.prototype);
            F.prototype.constructor = F;
            F.prototype._base_ = deepCopy({}, baseF.prototype, {
                base: F,
            });
            F.prototype._base_.constructor = F;
            for (var key in property) {
                if (!property.hasOwnProperty(key)) {
                    continue;
                }
                F.prototype[key] = property[key];
            }
        } else {
            F.prototype = property;
            if (!F.prototype.__init__) {
                F.prototype.__init__ = function() {};
            }
            F.prototype.constructor = F;
            F.prototype._base_ = {};
            F.prototype._base_.constructor = F;
        }
        if (functionName) {
            F.prototype._functionName_ = functionName;
        }
        F._type_ = F;
        return F;
    };
    this.Class = Class;
})();
