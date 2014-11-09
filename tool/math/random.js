/************************************ 随机数 ********************************************/

YYC.namespace("Tool").random = (function () {
    return {
        //0到1随机小数，如0.4581578007260767
        zeroToOne: function () {
            return Math.random();
        },
        //over到under的任意整数
        nToM: function (over, _under) {
            //                alert("under = " + under);
            //                alert("over = " + over);
            if (over && _under < over) {
                throw new Error("参数错误");
                return;
            }

            under = _under + 1;     //此处要加1。因为_nToM函数只会产生over到_under-1的数。
            switch (arguments.length) {
                case 1:
                    return Math.floor(Math.random() * under + 1); //没设下限的话，默认为1
                case 2:
                    return Math.floor(Math.random() * (under - over) + over);
                default:
                    return 0;
            }
        },
        //生成制定位数的随机整数
        //如生成4位的随机整数：rndNum(4);
        rndNum: function (n) {
            var rnd = "";
            for (var i = 0; i < n; i++)
                rnd += Math.floor(Math.random() * 10);
            return rnd;
        },

        //over到under的任意整数，且是num的倍数
        nToMByT: function (num, over, under) {
            var a = 0,
                    b = 0,
                    c = 0;

            switch (arguments.length) {
                case 2:
                    a = Math.floor(under / num);
                    b = 0;  //没设下限的话，默认从0开始
                    c = this.nToM(a, b);
                    return c * num;
                case 3:
                    a = Math.floor(under / num);
                    b = Math.ceil(over / num);
                    if (a < b) {
                        throw new Error("不存over到under且是num的倍数的整数");
                        return;
                    }
                    c = this.nToM(b, a);
                    return c * num;
                default:
                    throw new Error("nToMByT 形参不能超过3个");
            }
        },
        //根据概率判断是否发生
        //probability为0-1的数，1表示100%，0表示0%
        probability: function (probability) {
            var result = Math.random();
            //            console.log(t);
            if (result <= probability) {
                return true;
            }
            else {
                return false;
            }
        }
    }
}());