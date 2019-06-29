# Object-Oriented-Programming 面向对象编程

## 结构链接
* [实现继承的 JS 文件](./inherit.js)
* [测试继承的 HTML 文件](./test.html)

## 学习链接

三生石博文
* [JavaScript继承详解(一)](https://www.cnblogs.com/sanshi/archive/2009/07/08/1519036.html)
* [JavaScript继承详解(二)](https://www.cnblogs.com/sanshi/archive/2009/07/08/1519251.html)
* [JavaScript继承详解(三)](https://www.cnblogs.com/sanshi/archive/2009/07/09/1519890.html)
* [JavaScript继承详解(四)](https://www.cnblogs.com/sanshi/archive/2009/07/13/1522647.html)
* [JavaScript继承详解(五)](https://www.cnblogs.com/sanshi/archive/2009/07/14/1523523.html)
* [JavaScript继承详解(六)](https://www.cnblogs.com/sanshi/archive/2009/07/15/1524263.html)

阮一峰博文
* [阮一峰 - Javascript继承机制的设计思想](http://www.ruanyifeng.com/blog/2011/06/designing_ideas_of_inheritance_mechanism_in_javascript.html)
* [Javascript面向对象编程一:封装](http://www.ruanyifeng.com/blog/2010/05/object-oriented_javascript_encapsulation.html)
* [Javascript面向对象编程二:构造函数的继承](http://www.ruanyifeng.com/blog/2010/05/object-oriented_javascript_inheritance.html)
* [Javascript面向对象编程三:非构造函数的继承](http://www.ruanyifeng.com/blog/2010/05/object-oriented_javascript_inheritance_continued.html)

国外工程师博文
* [John Resig - 简单的JavaScript继承](https://johnresig.com/blog/simple-javascript-inheritance/)
* [Vjeux - Javascript Prototypal Inheritance如何真正起作用](http://blog.vjeux.com/2011/javascript/how-prototypal-inheritance-really-works.html)


## 知识点

### constructor 属性 指向实例的构造函数
```js
var cat1 = new Cat("大毛","黄色");
var cat2 = new Cat("二毛","黑色");
alert(cat1.name); // 大毛
alert(cat1.color); // 黄色
```

这时 cat1 和 cat2 会自动含有一个 `constructor`属性，指向它们的构造函数。
```js
alert(cat1.constructor == Cat); // true
alert(cat2.constructor == Cat); // true
```

### instanceof 运算符

用于验证原型对象与实例对象之间的关系

```js
alert(cat1 instanceof Cat); // true
alert(cat2 instanceof Cat); // true
```

### prototype 属性

Javascript规定，每一个构造函数都有一个 `prototype` 属性，指向另一个对象。这个对象的所有属性和方法，都会被构造函数的实例继承。
