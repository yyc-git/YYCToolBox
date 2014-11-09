/************************************ 位置/坐标 ***************************************/

YYC.namespace("Tool").position = (function () {
    function _getCurrentCoord(target) {
        var coor = target.offset();

        if (coor) {
            return { left: coor.left, top: coor.top };
        }

        return { left: 0, top: 0 }
    }



    return {
        /*获得鼠标位置(代码来自于网上)
        兼容ie和ff和chrome
        //360下y坐标有问题！！
        
        */
        mousePosition: function (ev) {
            /*
            这段代码不兼容360
    
            if (ev.pageX || ev.pageY) { //ff
            return { x: ev.pageX, y: ev.pageY };
            }
            return {    //ie
            x: ev.clientX + document.body.scrollLeft - document.body.clientLeft,
            y: ev.clientY + document.body.scrollTop - document.body.clientTop
            };
            */
            /*新加的这段代码兼容360*/
            var point = {
                x: 0,
                y: 0
            };

            // 如果浏览器支持 pageYOffset, 通过 pageXOffset 和 pageYOffset 获取页面和视窗之间的距离
            if (typeof window.pageYOffset != 'undefined') {
                point.x = window.pageXOffset;
                point.y = window.pageYOffset;
            }
                // 如果浏览器支持 compatMode, 并且指定了 DOCTYPE, 通过 documentElement 获取滚动距离作为页面和视窗间的距离
                // IE 中, 当页面指定 DOCTYPE, compatMode 的值是 CSS1Compat, 否则 compatMode 的值是 BackCompat
            else if (typeof document.compatMode != 'undefined' && document.compatMode != 'BackCompat') {
                point.x = document.documentElement.scrollLeft;
                point.y = document.documentElement.scrollTop;
            }
                // 如果浏览器支持 document.body, 可以通过 document.body 来获取滚动高度
            else if (typeof document.body != 'undefined') {
                point.x = document.body.scrollLeft;
                point.y = document.body.scrollTop;
            }

            // 加上鼠标在视窗中的位置
            point.x += ev.clientX;
            point.y += ev.clientY;

            // 返回鼠标在视窗中的位置
            return point;

        },
        //获得obj到指定的被定为了的祖先元素parentObj的距离
        getToParentOffset: function (obj, parentObj) {
            var left = 0, top = 0, position = null,
                    obj = $(obj),
                    parentObj = $(parentObj);

            do {
                position = obj.position();
                left += position.left;
                top += position.top;

                obj = obj.offsetParent();
            } while (obj && obj[0] !== parentObj[0]);    //jquery对象不能用"=="或"==="判等，要转换为dom对象再判等
            return {
                left: left,
                top: top
            };
        },
        //获得页面滚动条距离
        //测试环境：ie7、9、ff、chrome
        currentScrollTop: function () {
            if (navigator.userAgent.indexOf("Chrome") >= 0) {
                return document.body.scrollTop;
            }
            else {
                return document.documentElement.scrollTop;
            }
        },
        //将obj绝对定位到target中中间。
        //被定位对象 定位目标 被定为对象宽度 被定为对象高度
        positionToCenter: function (obj, target, width, height) {
            var left = 0,
                top = 0,
                targetCoor = null,
            //            target = null,
            //            obj = null,
                target_width = 0,
                target_height = 0;
            //            100w,50h

            target = $(target);
            obj = $(obj);

            target_width = target.width();
            target_height = target.height();
            //            console.log(target_width);
            if (width > target_width || height > target_height) {
                throw new Error("被定位对象宽度或高度超过目标对象！");
            }


            targetCoor = _getCurrentCoord(target);

            //定位
            left = targetCoor.left + target_width / 2 - width / 2;
            top = targetCoor.top + target_height / 2 - height / 2;

            obj.css({ "top": top, "left": left, "position": "absolute" });
        }
    }
}());