/************************************ 页面 ***************************************/

YYC.namespace("Tool").page = (function(){
    return {
    //向上滚动
    rollUp: function (outerID, innerID) {
        var stopscroll = false;

        var scrollElem = document.getElementById(outerID);
        var leftElem = document.getElementById(innerID);


        /* 此处outerHeight为180px，innerHeight为720px，
        所以marqueesHeight为540px。
        又因为td的高度为180px，即显示的一行产品的高度为180px，
        所以总共可显示540/180 + 1 = 4行，即4* 5 = 20个产品
        */
        var outerHeight = scrollElem.style.height.slice(0, 3);     //外层的高度，也是页面显示层的高度
        var innerHeight = leftElem.style.height.slice(0, 3);   //内层的高度

        var marqueesHeight = innerHeight - outerHeight;    //滚动最大高度（即为scrollTop的最大高度）为内层高度 - 外层高度
        //     alert(marqueesHeight.slice(0, 3));

        //为scrollElem绑定鼠标事件
        scrollElem.onmouseover = new Function('stopscroll = true');
        scrollElem.onmouseout = new Function('stopscroll = false');


        var preTop = 0;
        var currentTop = 0;
        var stoptime = 0;


        //     preTop = scrollElem.scrollTop;
        //     scrollElem.scrollTop += 1;
        //     alert(scrollElem.scrollTop);
        ////     preTop = scrollElem.scrollTop;
        //     scrollElem.scrollTop += 1;
        //     alert(scrollElem.scrollTop);
        //     scrollElem.scrollTop += 100;
        //     alert(scrollElem.scrollTop);
        //     scrollElem.scrollTop += 100;
        //     alert(scrollElem.scrollTop);
        //     scrollElem.scrollTop += 100;
        //     alert(scrollElem.scrollTop);
        //     scrollElem.scrollTop += 100;
        //     alert(scrollElem.scrollTop);
        function init_srolltext() {
            scrollElem.scrollTop = 0;
            setInterval('scrollUp()', 10);     //值越小，滚动速度越快
        }
        function scrollUp() {
            if (stopscroll) return;
            currentTop += 1;
            if (currentTop == outerHeight) {
                stoptime += 1;
                currentTop -= 1;
                if (stoptime == 300) { //滚到到marqueesHeight后，停止3秒
                    currentTop = 0;
                    stoptime = 0;
                }
            } else {
                //             preTop = scrollElem.scrollTop;
                scrollElem.scrollTop += 1;
                if (scrollElem.scrollTop == marqueesHeight) {  //scrollElem.scrollTop的最大值为marqueesHeight
                    scrollElem.scrollTop = 0;
                    scrollElem.scrollTop += 1;
                }
            }

        }


        scrollElem.appendChild(leftElem.cloneNode(true));

        init_srolltext();
    },
    /*在当前鼠标位置的右边显示层*/
    showDivInRightPosition: function (e, id) {
        var position = YYC.Tool.posiiton.mousePosition(e);

        var top = position.y;   //e为event对象
        var left = position.x;

        this.$(id).css("top", top);     //id为层的Id
        this.$(id).css("left", left);
    },
    /*显示arguments[0]，其余隐藏*/
    showFirstArgument: function () {
        this.$(arguments[0]).css("display", "");
        var length = arguments.length;
        for (var i = 1; i < length; i++) {
            this.$(arguments[i]).css("display", "none");
        }
    },
    /*验证码*/
    createCode: function () {
        //        alert("aaa");
        var code = "";
        var codeLength = 6; //验证码的长度   
        var checkCode = document.getElementById("checkCode");
        //        alert("aaa");

        //所有候选组成验证码的字符，当然也可以用中文的      
        var selectChar = new Array(0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 'A', 'B', 'C', 'D', 'E', 'F', 'G',
            'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z');

        for (var i = 0; i < codeLength; i++) {
            var charIndex = Math.floor(Math.random() * 36);
            code += selectChar[charIndex];
        }
        //        alert("code=" + code);
        if (checkCode) {
            checkCode.className = "code";
            checkCode.value = code;
            checkCode.blur();
            //            alert("checkCode=" + checkCode);
        }
        //        alert("checkCode=" + checkCode.value);
    },
    //显示错误信息
    err_msg: function (str, id) {
        document.getElementById("d" + id).innerHTML = '<img src="/Content/Image/Shared/check_' + (str ? 'error' : 'right') + '.gif" align="absmiddle"/> ' + str.toString();
    }
}
}());