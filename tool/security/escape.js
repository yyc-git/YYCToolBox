/************************************ 转义 ***************************************/

YYC.namespace("Tool").escape = (function(){
    return {
        /* 转义字符串str
        失败！！！ “\”被转义了！！因此取不到str中的"\"
        escape: function (str) {
        return String(str).replace(/\\/g, "\\\\");
        },
        */

        /*  对Jquery中的特殊字符转义。
        用于选择器中的字符（OperateSelect.js）。
        */
        escapeJquery: function (str) {
            return String(str).replace(/(#|\.|@|\[|\])/g, "\\$1");
        }
    }
}());