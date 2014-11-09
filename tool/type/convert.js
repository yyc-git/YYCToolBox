YYC.namespace("Tool").convert = (function () {
    var JSON = (function(){
        useHasOwn = ({}.hasOwnProperty ? true : false);
        m = {
            "\b": '\\b',
            "\t": '\\t',
            "\n": '\\n',
            "\f": '\\f',
            "\r": '\\r',
            '"': '\\"',
            "\\": '\\\\'
        };

        function pad (n) {
            return n < 10 ? "0" + n : n;
        };
        function encodeString(s) {
            if (/["\\\x00-\x1f]/.test(s)) {
                return '"' + s.replace(/([\x00-\x1f\\"])/g,
                function (a, b) {
                    var c = m[b];
                    if (c) {
                        return c;
                    }
                    c = b.charCodeAt();
                    return "\\u00" + Math.floor(c / 16).toString(16) + (c % 16).toString(16);
                }) + '"';
            }
            return '"' + s + '"';
        };
        function encodeArray(o) {
            var a = ["["], b, i, l = o.length, v;
            for (i = 0; i < l; i += 1) {
                v = o[i];
                switch (typeof v) {
                    case "undefined":
                    case "function":
                    case "unknown":
                        break;
                    default:
                        if (b) {
                            a.push(',');
                        }
                        a.push(v === null ? "null" : encode(v));
                        b = true;
                }
            }
            a.push("]");
            return a.join("");
        };
        function encodeDate(o) {
            return '"' + o.getFullYear() + "-" + pad(o.getMonth() + 1) + "-" + pad(o.getDate()) + "T" + pad(o.getHours()) + ":" + pad(o.getMinutes()) + ":" + pad(o.getSeconds()) + '"';
        };


        return {
            stringify: function (o) {
                if (typeof o == "undefined" || o === null) {
                    return "null";
                } else if (o instanceof Array) {
                    return encodeArray(o);
                } else if (o instanceof Date) {
                    return encodeDate(o);
                } else if (typeof o == "string") {
                    return encodeString(o);
                } else if (typeof o == "number") {
                    return isFinite(o) ? String(o) : "null";
                } else if (typeof o == "boolean") {
                    return String(o);
                } else {
                    var self = this;
                    var a = ["{"], b, i, v;
                    for (i in o) {
                        if (!useHasOwn || o.hasOwnProperty(i)) {
                            v = o[i];
                            switch (typeof v) {
                                case "undefined":
                                case "function":
                                case "unknown":
                                    break;
                                default:
                                    if (b) {
                                        a.push(',');
                                    }
                                    a.push(self.encode(i), ":", v === null ? "null" : self.encode(v));
                                    b = true;
                            }
                        }
                    }
                    a.push("}");
                    return a.join("");
                }
            },
            parse: function (json) {
                return eval("(" + json + ')');
            }
        }
    }());

    /**
            注意以下转换：
            var myBool = Boolean("false");  // == true 
            var myBool = !!"false";  // == true 
        */
    function _strToBool(str) {
        switch (str.toLowerCase()) {
            case "true": case "yes": case "1":
                return true;
            case "false":
            case "no":
            case "0":
            case null:
                return false;
            default:
                return Boolean(str);
        }
    };
    //将jquery对象转换成string字符串，可用于测试该jquery对象是否包含某些字符串。如pagingServerSpec.js中的用法。
    //
    function _jqToString(jq) {
        var d = $("<div>");
        //                    str = "";

        d.html(jq);
        //                str = d.html();
        //                d = null;

        return d.html();
    };

    return {
        /**
            总结出
    
            toNumber
            toString
            toBoolean
            toJquery
            toDom
            toObject(json序列化)
    
            这些通用方法，而不用管是什么类型要转换！
        */


        toNumber: function (obj) {
            return Number(obj);
        },
        toString: function (obj) {
            var judge = YYC.Tool.judge;

            if (judge.isNumber(obj)) {
                return String(obj);
            }

            if (judge.isjQuery(obj)) {
                return _jqToString(obj);
            }

            if (judge.isDirectObject(obj) || judge.isArray(obj)) {
                if (window.JSON) {
                    return window.JSON.stringify(obj);
                }
                else {
                    return JSON.stringify(obj);
                }
            }

            //if (obj.toString) {
            //    return obj.toString();
            //}

            return String(obj);
        },
        toObject: function (obj) {
            var judge = YYC.Tool.judge;

            if (!judge.isString(obj)) {
                throw new Error("参数必须为字符串");
            }

            if (window.JSON) {
                return window.JSON.parse(obj);
            }
            else {
                return JSON.parse(obj);
            }
        },
        toBoolean: function (obj) {
            var judge = YYC.Tool.judge;

            if (judge.isString(obj)) {
                return _strToBool(obj);
            }
            else {
                return Boolean(obj);
            }
        },
        toJquery: function(obj){
            var judge = YYC.Tool.judge;

            if (judge.isDom(obj) || judge.isString(obj)) {
                return $(obj);
            }
            else if (judge.isjQuery(obj)) {
                return obj;
            }
            else {
                throw new Error("参数必须为dom元素或jquery对象");
            }
        },
        toDom: function (obj) {
            var judge = YYC.Tool.judge;

            if (judge.isjQuery(obj)) {
                return obj[0];
            }
            else if (judge.isDom(obj)) {
                return obj;
            }
            else if (judge.isString(obj)) {
                //return document.createElement(obj);
                return $(obj)[0];
            }
            else {
                throw new Error("参数必须为dom元素或jquery对象");
            }
        }
    }
}());