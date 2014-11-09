YYC.namespace("Tool").ajaxHelper = (function () {

    var timeCount = function (loading, whole) {
        if (timeCount) {    //如果已经加载成功或加载失败，则清除重复执行并返回
            clearInterval(time);
            return;
        }
        else {
            $(whole).css("display", "none");
            var imgSrc = '<img src="/Content/Image/Shared/Loading/ico_loading3.gif" border="0" alt=""/>';   //加载中图片
            $(loading).html(imgSrc).css("display", "");
            clearInterval(time);
        }
    }

    return {
        /*
        ajax全局设定，显示加载中、加载失败

        whole为正文所在层的ID
        loading为提示所在层的ID

        Dom示例：
        <div id="loading" style="border:1px solid red;display:none;">
        </div>
        <div id="whole" >
        </div>
        */
        showLoading: function (loading, whole) {
            $(loading).ajaxStart(function () {
                timeCount = 0;  //归位
                time = setInterval(function () { timeCount(loading, whole); }, 500); //此处设置延迟时间：如果500毫秒内加载成功，则不显示“加载中”，超过500ms则显示
                //                alert("aa");
            }).ajaxSuccess(function () {
                timeCount++;    //计数加1，用来判断是否加载成功
                $(this).css("display", "none");
                $(whole).css("display", "");


                //        /*实现表格错行显示颜色和hover*/
                //        $(".wrap tbody tr").hover(function () {

                //            //            backColor = $(this).addClass("hover");
                //            //            alert(backColor);
                //            $(this).addClass("hover");
                //        }, function () {
                //            //            alert(backColor);
                //            $(this).removeClass("hover");
                //            //            $(this).css("background-color", backColor);
                //        });

                //        $(".wrap tbody tr:odd").addClass("odd");
                //        //        $("table tbody tr:odd").css("background-color", "#ffffff");


            }).ajaxError(function (e, xhr, settings, exception) {
                timeCount += 2;    //计数加2，用来判断是否加载失败
                $(this).html("加载失败：" + exception).css("display", "");
                $(whole).css("display", "none");
            });
        }
    }

}());


