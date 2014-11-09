/* cookie操作封装
*  2012-11-16
*/
YYC.namespace("Tool").cookie = (function () {
    return {
         /*封装setCookie（处理异常）*/
        trySetCookie: function (objName, objValue, objHours, func) {
            try {
                //            alert("cookie=" + document.cookie);
                this.setCookie(objName, objValue, objHours);   //要设置expires，否则会出现错误！！！
                //            alert("after write   cookie="+document.cookie);
            }
            catch (e) {
                alert("写入Cookie操作失败！您可能禁用了Cookie");
            }
            finally {
                if (func) {
                    if (YYC.Tool.judge.isFunction(func)) {
                        func();
                    }
                    else {  //func为url
                        if (YYC.Tool.judge.isString(func)) {
                            //                    window.open(func); //打开新页面，跳转到对应模块
                            window.location.href = func;    //跳转到对应模块
                        }
                    }
                }
            }
        },
        /*设置cookie。要设置expires，否则会出现错误！*/
        setCookie: function (objName, objValue, objHours) {
            //    if (this.getCookie(objName) != "no"){
            //        alert("Exist!");
            //        this.clearCookie(objName);
            //        alert("delete cookie="+document.cookie);
            //    }
            //        try {
            //            alert("cookie=" + document.cookie);

            //            var str = objName + "=" + escape(objValue);
            /*
            最多利用的应为encodeURIComponent，它是将中文、韩文等特殊字符转换成utf-8格式的url编码，
            以是假定给背景转达参数必要利用encodeURIComponent时必要背景解码对utf-8撑持（form中的编码体例和当前页面编码体例不异）

            此处用encodeURIComponent而不用escape，因为objValue如果包含中文的话，escape编码的字符串在解码时会出问题！
            */
            //            var str = objName + "=" + encodeURIComponent(objValue);
            var str = encodeURIComponent(objName) + "=" + encodeURIComponent(objValue);
            var date = new Date();
            var ms = null;
            if (objHours > 0) {                               //如果不设定过期时间，浏览器关闭时cookie自动消失
                ms = objHours * 3600 * 1000;
            }
            else {
                ms = 1 * 3600 * 1000;   //默认为1小时。此处要设置过期时间！否则会出现错误！！！详见“6-27备忘:cookie的问题”
            }
            date.setTime(date.getTime() + ms);
            str += ";expires=" + date.toGMTString() + ";path=/";   //要设置相同的path，防止删除不掉
            document.cookie = str;
            if (document.cookie == "") {
                throw new Error("写入Cookie操作失败！您可能禁用了Cookie");  //如果写cookie失败，则抛出异常
                //                alert("写入Cookie操作失败！您可能禁用了Cookie");
                //                return;
            }
            //        }
            //        catch (e) {
            //        }
        },
        getCookie: function (name) {
            var arrStr = document.cookie.split(";"),
                decode = YYC.Tool.code.decode,
                temp = null,
                decodeStr = null;

            for (var i = 0; i < arrStr.length; i++) {
                temp = arrStr[i].split("=");

                if (YYC.Tool.string.trim(decode(temp[0])) === name) {
                    //        alert("get="+document.cookie);
                    return decode(temp[1]);
                }
            }
            return "no";
        },
        /*删除cookie
        */
        clearCookie: function (name) {
            //     alert("clear!");
            //alert("before delete = "+ document.cookie);
            var exp = new Date();

            exp.setTime(exp.getTime() - 10000);
            document.cookie = name + "=;expires=" + exp.toGMTString() + ";path=/";
            //        alert("after delete = "+ document.cookie);
        }
    }
})();