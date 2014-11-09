/************************************ 集合 ***************************************/

YYC.namespace("Tool").collection = (function(){
    return {
    //获得jquery集合中Dom元素最大的width和height
    getMaxWidthHeight: function (list) {
        var maxWidth = 0,
            maxHeight = 0,
            width = 0,
            height = 0;

        list.each(function () {
            width = $(this).width();
            height = $(this).height();

            if (width > maxWidth) {
                maxWidth = width;
            }
            if (height > maxHeight) {
                maxHeight = height;
            }
        });

        return { width: maxWidth, height: maxHeight };
    }
}
}());

