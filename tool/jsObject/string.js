/************************************ 字符串操作 ***************************************/

YYC.namespace("Tool").string = (function(){
    return {
        /* 去除开头和结尾的指定字符串（如果有的话） */
        trimStr: function (source, str) {
            var temp = "";
            var new_str = "^" + str;
            var reg = new RegExp(new_str);

            temp = source.replace(reg, "");
            new_str = str + "$";
            reg = new RegExp(new_str);

            return temp.replace(reg, "");
        },
        /*7-16 - 7-17
        * 替换指定的匹配。
        *即替换第number个匹配项
        *source为要处理的字符串，matchStr为匹配的正则表达式(没有两边的“/“，即本来应该为“/\d*as/g“，则match为“\d*as“)，
        *replaceMent为替换项，number指明要替换第几个匹配项
    
        例如：
        var body = "<br/><span/><br/>";
        replace(body, "<br\/>", "<br/>*\r", "last");   //最后的br后加*，作为评论内容开始的标记
    
        //body = "<br/><span/><br/>*\r"
        */
        replace: function (source, matchStr, replaceMent, number) {
            var _source = "";
            var _number = null;
            var temp = null;
            var remain = null;
            var index = null;
            var result = null;
            var str = null;
            var reg = null;
            var replace_reg = null;
            var i = 1;
            var arr_m = null;

            if (YYC.Tool.judge.isString(source)) {
                _source = source;
            }
            else {
                try {
                    _source = source.toString();
                }
                catch (e) {
                    alert("source需要为string类型");
                    return;
                }
            }
            //        alert("number=" + number);
            switch (number) {
                case "last":    //替换最后一个匹配项
                    //                alert("last!");
                    str = matchStr + "([^" + matchStr + "]*)$";
                    //                alert("str=" + str);
                    reg = new RegExp(str);  //使用RegExp对象来构造动态匹配
                    //                    alert("replace");
                    //                                        alert("reg= " + reg);
                    result = _source.replace(reg, function (_match, first) { //_match为匹配项，first为第一个子匹配项
                        return replaceMent + first;
                    });
                    //                                        alert("result=" + result);
                    break;
                case "first":   //替换第一个匹配项  
                    //                            var str = "^[^" + match + "]*" + match;  
                    str = matchStr;
                    //                alert("str=" + str);
                    reg = new RegExp(str);  //使用RegExp对象来构造动态匹配  
                    //                    alert("reg= " + reg);
                    result = _source.replace(reg, replaceMent);
                    //                    alert("result=" + result);
                    break;
                default:    //替换指定位置的匹配项
                    reg = new RegExp(matchStr, "g");
                    replace_reg = new RegExp(matchStr);
                    //                alert("reg= " + reg);
                    //                var t = reg.exec(_source);
                    //                alert("position:" + reg.lastIndex);
                    //                alert("_source=" + _source);
                    //                alert("after slice   _source=" + _source.slice(reg.lastIndex));
                    while ((arr_m = reg.exec(_source)) != null) {

                        //                    alert("index position:" + index);
                        //                    alert("_source=" + _source);
                        //                    alert("after slice   _source=" + _source.slice(index));
                        if (i++ == number) {    //先判等，再自加
                            index = reg.lastIndex - arr_m[0].length;    //lastIndex为下一次匹配开始的位置，即为匹配的字符串的最后一个字符的后一位的位置
                            temp = _source.slice(0, index);
                            //                        alert("temp=" + temp);
                            remain = _source.slice(index).replace(replace_reg, replaceMent);
                            //                        alert("remain=" + remain);
                            result = temp + remain;
                            //                        alert("result=" + result);
                            break;
                        }
                    }
                    if (!reg.lastIndex) {
                        result = _source;
                    }
                    break;
            }
            return result;
        },
        //去掉两边空白
        trim: function (info) {

            //replace(/&nbsp;/g, "")：消去&nbsp;（&nbsp;用于解决在360下如果没有内容时不显示单元格的问题）
            //return info.replace(/^\s*/, "").replace(/\s*$/, "").replace(/&nbsp;/g, "");

            return info.replace(/^\s*/, "").replace(/\s*$/, "");
        }
    }
}());