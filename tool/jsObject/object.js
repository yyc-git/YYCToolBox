YYC.namespace("Tool").object = (function () {
        return {
            //删除obj的属性attr
            delete: function (obj, attr) {
                //因为ie下使用delete有bug，所以用指定为undefined来代替：
                //ie中（如ie8）使用delete删除全局属性（如“window.foo = 1;”中的foo），
                //会抛出错误：“对象不支持此操作”！
                obj[attr] = undefined;
            }
        };
    }());