/************************************ 判断 ***************************************/

YYC.namespace("Tool").judge = (function () {
    return {
        //判断浏览器类型
        browser: {
            ie: ! -[1, ],
            //不能用===，因为navigator.appVersion.match(/MSIE\s\d/i)为object类型，不是string类型
            ie7: navigator.appVersion.match(/MSIE\s\d/i) == "MSIE 7",
            ie8: navigator.appVersion.match(/MSIE\s\d/i) == "MSIE 8",
            ie9: navigator.appVersion.match(/MSIE\s\d/i) == "MSIE 9",
            ff: navigator.userAgent.indexOf("Firefox") >= 0 && true,
            opera: navigator.userAgent.indexOf("Opera") >= 0 && true,
            chrome: navigator.userAgent.indexOf("Chrome") >= 0 && true
        },
        //判断是否为jQuery对象
        isjQuery: function (ob) {
            if (!jQuery) {
                throw new Error("jQuery未定义！");
            }

            return ob instanceof jQuery;
        },
        /*判断是否为function（是否为类）*/
        isFunction: function (func) {
            //            return typeof func == "function";
            return Object.prototype.toString.call(func) === "[object Function]";
        },
        isArray: function (val) {
            //            return !!(val &&    //"!!"表示转化为bool型
            //        typeof val == "object" &&
            //        typeof val.length == 'number' &&
            //        typeof val.splice == 'function' &&
            //        !(val.propertyIsEnumerable('length'))   //val.propertyIsEnumerable('length')：返回 Boolean 值，指出val是否具有该length属性且该属性是否是可列举的。
            //        );
            return Object.prototype.toString.call(val) === "[object Array]";
        },
        isDate: function (val) {
            return Object.prototype.toString.call(val) === "[object Date]";
        },
        /*判断是否为string型*/
        isString: function (str) {
            //            return typeof str == "string";
            return Object.prototype.toString.call(str) === "[object String]";
        },
        /* 
        * 检测对象是否是空对象(不包含任何可读属性)。 //如你上面的那个对象就是不含任何可读属性
        * 方法只既检测对象本身的属性，不检测从原型继承的属性。 
        */
        isOwnEmptyObject: function (obj) {
            var name = "";

            for (name in obj) {
                if (obj.hasOwnProperty(name)) {
                    return false;
                }
            }
            return true;
        },
        /* 
        * 检测对象是否是空对象(不包含任何可读属性)。 
        * 方法既检测对象本身的属性，也检测从原型继承的属性(因此没有使hasOwnProperty)。 
        */

        isEmptyObject: function (obj) {
            var name = "";

            for (name in obj) {
                return false;
            }
            return true;
        },
        isOdd: function (num) {
            return num % 2 !== 0;
        },
        ////判断是否不是对象
        //isNotObject: function (obj) {
        //    var result = false;

        //    switch (Object.prototype.toString.call(obj)) {
        //        case "[object String]":
        //        case "[object Number]":
        //        case "[object Boolean]":
        //            result = true;
        //            break;
        //        default:
        //            result = false;
        //            break;
        //    }
        //    return result;
        //},
        //判断是否为对象字面量（{}）
        isDirectObject: function (obj) {
            if (Object.prototype.toString.call(obj) === "[object Object]") {
                return true;
            }

            return false;
        },
        isHTMLImg: function (img) {
            return Object.prototype.toString.call(img) === "[object HTMLImageElement]";
        },
        isDom: function (obj) {
            return obj instanceof HTMLElement;
        },
        isNumber: function (obj) {
            return Object.prototype.toString.call(obj) === "[object Number]";
        },
        isBool: function (obj) {
            return Object.prototype.toString.call(obj) === "[object Boolean]";
        },
        /*
        任何对象，如果其语义在ECMAScript规范中被定义过，那么它被称为原生对象；
        环境所提供的，而在ECMAScript规范中没有被描述的对象，我们称之为宿主对象。
    
        该方法用于特性检测，判断对象是否可用。用法如下：
    
        MyEngine addEvent():
        if (Tool.judge.isHostMethod(dom, "addEventListener")) {    //判断dom是否具有addEventListener方法
        dom.addEventListener(sEventType, fnHandler, false);
        }
        */
        //检查宿主对象是否可调用
        isHostMethod: (function () {
            function isHostMethod(object, property) {
                var type = typeof object[property];

                return type === "function" ||
            (type === "object" && !!object[property]) ||
            type === "unknown";
            };

            return isHostMethod;
        }())
        /*
        该函数判断对象时，如果对象有方法，则判断有问题！
    
    
    
    
        //判断两者是否相等。相等返回true，不等返回false。
        //可以判断对象、string、number、boolean等类型是否相等。
        //如果是对象，则如果对象的每个属性的值相等，则返回true，否则返回false。
        //使用示例：
        //    isEqual({x: 1, y: {a: 1}, z: 1}, {x: 2, y: {a: 1}, z: 1});  //false
        //    isEqual({x: 1, y: {a: 1}, z: 1}, {x: 1, y: {a: 1}, z: 1});  //true
        //    isEqual({x: 1, y: {a: 1}, z: 1}, 2);  //false
        //    isEqual(2, 2);  //true
        //    isEqual("2", "2");  //true
        
        isEqual: function (source, target) {
            var i = null;
            if (this.isObject(source) && this.isObject(target)) {
                for (i in source) {
                    if (source.hasOwnProperty(i)) {
                        if (this.isObject(source[i]) && this.isObject(target[i])) {
                            if (!this.isEqual(source[i], target[i])) {
                                return false;
                            }
                            else {
                                continue;
                            }
                        }
                        if (source[i] !== target[i]) {
                            return false;
                        }
                    }
                }
                    return true;
            }
            return source === target;
        }
        */
    }
}());