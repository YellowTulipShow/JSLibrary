/*
    继承类实现
    作者: YellowTulipShow
    开源地址: https://github.com/YellowTulipShow/JSLibrary/tree/master/o-o-p/Class.Inherit.js
    使用看同级目录下的 Class.Inherit.Use.html
*/
(function() {
    function deepCopy(p, c, b) {
        var c = c || {};
        for (var i in p) {
            if (typeof p[i] === 'object') {
                c[i] = (p[i].constructor === Array) ? [] : {};
                deepCopy(p[i], c[i]);
            } if (typeof (p[i]) === "function") {
                c[i] = p[i].bind(b);;
            } else {
                c[i] = p[i];
            }
        }
        return c;
    }
    function Unrealized() {
        throw "throw Unrealized Method Exception!!!";
    }
    var Class = function() {};
    Class.Inherit = function(property) {
        var baseF = this !== Class ? this : null;
        function F() {
            if (!initializing) {
                if (baseF) {
                    this._base_ = deepCopy(baseF.prototype, {}, this);
                }
                this.__init__.apply(this, arguments);
            }
        }
        if (baseF) {
            initializing = true;
            var baseFcase = new baseF();
            F.prototype = baseFcase;
            F.prototype._super_ = baseFcase;
            F.prototype.constructor = F;
            initializing = false;
        }
        F.Inherit = arguments.callee;
        for (var name in property) {
            if (!property.hasOwnProperty(name)) {
                continue;
            }
            F.prototype[name] = property[name];
        }
        return F;
    };
    this.Class = Class;
})();
