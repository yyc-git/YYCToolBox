/************************************ 选择器 ***************************************/


YYC.namespace("Tool").selector = (function(){
    return {
        /*返回当前元素*/
        current: function (e) {
            /*  已修改！这样谷歌浏览器下也可以正常返回！ 
            9-28
    
            return (this.Browser.ff && arguments[0].target) || (this.Browser.ie && arguments[0].srcElement);
            */
            if (!e) {
                throw new Error("e未定义");
            }

            return (YYC.Tool.judge.browser.isIE() && e.srcElement) || e.target;
        },
        //获得当前样式
        /*            <style type="text/css">
                    p{color:#0F0;}
                    #text{color:#FF0;}
                    </style>
                    <p id="text"> hello world </p>
                    <script>
                    var ldd={
                        getStyle:function(obj,prop){return obj.style[prop];},
    
                        getCurrentStyle:function(obj,prop){
                            if(obj.currentStyle){return obj.currentStyle[prop];}      //IE
                            if(document.defaultView){return document.defaultView.getComputedStyle(obj,null)[prop];}   //非 IE
                            }
                        };
                    var obj=document.getElementById("text"); 
    
                    alert(ldd.getStyle(obj,"color"));
    
                    alert(ldd.getCurrentStyle(obj,"color"));
                    </script>
                    上述代码中，第一个alert 不显示任何内容，第二个alert显示"#F00" 。
                    obj.style 返回通过 STYLE 标签属性应用到元素的内嵌样式，此种样式权重最大，为1000。因为<p>中没有内嵌样式，故而第一个alert 不显示任何内容。
                    obj.currentStyle （IE 特有，w3c标准方法为 document.defaultView.getComputedStyle）返回的是浏览器当前使用的属性，由于<p> 中没有内嵌样式，根据css 权重，最终使用的color  是#text 中的样式，即color:#FF0。 所以第二个alert显示的内容为"#F00"。
        */
        getCurrentStyle: function (element) {
            return element.currentStyle || document.defaultView.getComputedStyle(element, null);
        },
        //按id值获得dom对象
        getDom: function (id) {
            return typeof id == "string" ? document.getElementById(id) : id;
        },
        $: function (id) {
            return typeof id == "string" ? $("#" + id) : id;
        }
    }
}());