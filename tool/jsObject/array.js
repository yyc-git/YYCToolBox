/************************************ 数组操作 ***************************************/

YYC.namespace("Tool").array = (function(){
    return {
        /*
        判断数组中是否有重复项，有即返回true，否则返回false
        发送给多人时，判断是否重复发给同一人
        如收件人：yang11,yang11,111111
        此处yang11重复！
        */
        repeat: function (array) {
            var new_array = array;
            /*
            如果为第一次调用（即不是递归调用的），
            就赋值原数组array，并使new_array指向新数组。
            这样可防止修改原数组array（如删除元素）
            */
            if (!arguments[1]) {
                new_array = this.clone(array);
            }

            //        new_array = array;
            if (new_array.length == 0) {
                return false;
            }
            //        alert("array.length=" + array.length);
            var first = new_array[0];
            //        alert("first = " + first);
            //        for (var item in array) {
            //            if (item == 0) {
            //                temp = item;
            //                continue;
            //            }
            //        }
            /*判断数组是否有重复的第一个元素*/
            for (var i = 1; i < new_array.length; i++) {
                //            alert("start cycle");
                //            alert("first=" + first);
                //            alert("array[i]=" + array[i]);
                //            alert("first == array[i]?"+(first == array[i]));
                if (first == new_array[i]) {
                    return true;    //退出for循环，返回函数返回值true
                    //                alert("return!");
                }

                else {
                    continue;
                }
            }
            //        alert("delete first");
            new_array.shift();  //删除数组第一个元素
            //        alert("enter next");
            /*
            递归，判断数组其他元素是否重复
            注意：此处要用return！
            */
            return this.repeat(new_array, "next");
        },
        /*返回一个新的数组，元素与array相同（地址不同）*/
        clone: function (array) {
            var new_array = new Array(array.length);
            //            for (var item in array) {   //此处会遍历到Array的扩展方法（如getElement()）
            //                new_array[item] = array[item];
            //            }
            //            return new_array;
            for (var i = 0, _length = array.length; i < _length; i++) {
                new_array[i] = array[i];
            }
            return new_array;
        },
        /**
         * 将ele添加到数组开头
         * @param arr
         * @param ele
         * @returns
         */
        prependElement: function(arr, ele){
            arr.unshift(ele);	//arr.unshift(ele1, ele2, ...);		可以添加多个
    	
            return arr;
        },
        /**
         * 将ele添加到数组结尾
         * @param arr
         * @param ele
         * @returns
         */
        appendElement: function(arr, ele){
            arr.push(ele);	//arr.push(ele1, ele2, ...);		可以添加多个
    	
            return arr;
        }
    }
}());