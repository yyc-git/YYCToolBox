/************************************ 数字操作 ********************************************/

YYC.namespace("Tool").math = (function(){
    return {
    /**
     * 获得小数部分
     * 如：
     * expect(number.getDecimal(2.22, 2)).toEqual(0.22);
     * 
     * @param decimal	要处理的数字
     * @param digit	小数位数
     * @returns
     */
    getDecimal: function (decimal, digit) {
        var numStr = YYC.Tool.convert.toString(decimal),
            index = numStr.indexOf("."),
            digit = digit + 1;

        if (index === -1) {
            return 0;
        }


        return Number("0" + numStr.substring(index, index + digit));

        /*
         * 不使用正则表达式，因为不好处理digit位数大于实际的小数位数的情况。
         * 如：number.getDecimal("2.2", 2)
         
        var rex = new RegExp("[0-9]+(\\.[0-9]{" + digit.toString() + "})[0-9]\*");
        
        return parseFloat(decimal.toString().replace(rex, "0$1"));
        */
    },
    truncateDecimal: function (decimal, digit) {
        var num = Math.pow(10, digit);

        if (num === Infinity) {
            throw new Error("浮点溢出");
        }
        if (digit > this.getDecimalNumber(decimal)) {
            return decimal;
        }

        return Math.round(decimal * num) / num;
    },
    getDecimalNumber: function (decimal) {
        var numStr = YYC.Tool.convert.toString(decimal);

        var portionArr = numStr.split('.');

        if (portionArr.length === 1) {
            throw new Error("参数必须为小数");
        }

        return portionArr[1].length;
    }
}
}());