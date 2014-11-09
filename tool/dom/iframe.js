/************************************ Iframe ***************************************/

YYC.namespace("Tool").iframe = (function(){
    return {
        //跳转到父窗口的锚记，用于在子窗口中调用（iframe）
        //name:锚记名
        //如果在父窗口调用，也能跳转到父窗口的锚记！
        jumpToParentPosition: function (name) {
            if (!parent) {
                throw new Error("parent未定义！");
            }

            parent.location.hash = name;
        }
    }
}());