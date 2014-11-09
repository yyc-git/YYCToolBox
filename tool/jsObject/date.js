YYC.namespace("Tool").date = (function () {
    var _addFirstTime = function (hourStr, minuteStr, arr) {
        arr.push(hourStr + ":" + minuteStr);
    };
    var _addRemainTime = function (hourStr, minuteStr, arr, interval, num) {
        var hour = parseInt(hourStr, 10);
        minute = parseInt(minuteStr, 10);

        num--;
        while (num) {
            minute = minute + interval;
            if (minute >= 60) {
                hour++;
                minute = 0;
            }

            if (hour >= 24) {
                hour = 0;
            }
            //转换字符串
            arr.push(("0" + hour.toString()).slice(-2) + ":" + ("0" + minute.toString()).slice(-2));

            num--;
        }
    };


    return {
        /**
         * 日期格式化
         * 用法：date.format(new Date(1372045823), "yyyy-MM-dd HH:mm:ss")
         * @param date	Date实例
         * @param format	格式
         * @returns	字符串
         */
        format: function (date, format) {
            var o = {
                "M+": date.getMonth() + 1, //month
                "d+": date.getDate(), //day
                "h+": date.getHours(), //hour
                "H+": date.getHours(), //hour
                "m+": date.getMinutes(), //minute
                "s+": date.getSeconds(), //second
                "q+": Math.floor((date.getMonth() + 3) / 3), //quarter
                "S": date.getMilliseconds() //millisecond
            }
            if (/(y+)/.test(format)) format = format.replace(RegExp.$1,
            (date.getFullYear() + "").substr(4 - RegExp.$1.length));
            for (var k in o) if (new RegExp("(" + k + ")").test(format))
                format = format.replace(RegExp.$1,
                RegExp.$1.length == 1 ? o[k] :
                ("00" + o[k]).substr(("" + o[k]).length));
            return format;
        },
        /**
         * 以beginTimeNum转换为的时间“00:00”-"23:59"开始，以interval递增num次，获得时间的数组。
         * 如：
         * expect(date.buildTimeArr(55, 5, 3)).toEqual(["00:55", "01:00", "01:05"]);
         * 
         * @param beginTimeNum	开始时间（String类型），值为"0000" - "2359"
         * @param interval	时间间隔，以分为单位
         * @param num	数组个数
         * @returns
         */
        buildTimeArr: function (beginTimeStr, interval, num) {
            var arr = [],
            hourStr = beginTimeStr.slice(0, 2),
            minuteStr = beginTimeStr.slice(2, 4);

            /*如果beginTimeStr为数字如550，则可以用以下代码
             * 
            var tempNum = parseInt(beginTimeStr, 10) / 100;
            hour = Math.floor(tempNum);
            minute = Math.round(Tool.number.getDecimal(tempNum, 2) * 100);
            arr.push(("0" + hour.toString()).slice(-2) + ":" + ("0" + minute.toString()).slice(-2));
            */

            _addFirstTime(hourStr, minuteStr, arr);
            _addRemainTime(hourStr, minuteStr, arr, interval, num);

            return arr;
        },
        /**
         * 将utc时间转换为本地时间，并指定格式
         * @param utc	以秒s为单位
         * @param pattern   如"yyyy-MM-dd HH:mm:ss"
         * @returns
         */
        utc2LocalTime: function (utc, pattern) {
            return this.format(new Date(Number(utc) * 1000), pattern);
        }
        /*
        当前时间戳（毫秒ms）

        第一种方法： 
        var timestamp = Date.parse(new Date()); 

        结果：1280977330000 
        第二种方法： 
        var timestamp = (new Date()).valueOf(); 

        结果：1280977330748 

        以上代码将获取从 1970年1月1日午夜开始的毫秒数。二者的区别是，第一种方法的毫秒位上为全零，即只是精确到秒的毫秒数 
        };
        */

        /*
        将"08/11/2013"转换为Date对象：new Date("08/11/2013");

        getMonth()获得的值的范围为0-11，0表示1月，11表示12月。
        */
    }
}());