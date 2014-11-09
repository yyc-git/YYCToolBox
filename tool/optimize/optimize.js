/************************************ 优化 ***************************************/

YYC.namespace("Tool").optimize = (function () {
    return {
        /*  9-4
         释放闭包
         */
        release: function (resource) {
            $(window).unload(function () {
                //                alert("resource = " + resource);
                if (resource) {
                    resource = null;
                }
                try {
                    if (YYC.Tool.judge.browser.isIE()) {
                        CollectGarbage();   //强制回收,ie才有
                    }
                }
                catch (e) { //不处理异常
                }
            });
        },
        //循环处理数组的优化。来自《高性能Javascript》 -> 第6章
        //前提：处理过程可以异步。数据不用按顺序处理。
        //适用于一次性处理整个数组耗时太长（阻塞UI线程），处理单个数组元素耗时不是很短的情况（否则使用后面的批处理了！）。
        //参数：数组，处理函数，回调函数。
        //实例：
        //var arr = [1, 2, 3, 4, 5, 6];
        //function outputValue(value){
        //   console.log(value);
        //};
        //handleArray(arr, outputValue, function(){console.log("Done")});
        handleArray: function (arr, handler, callback) {
            var todo = arr.concat();    //克隆数组

            //处理完单个数组元素后，UI线程空闲25ms，然后再将处理下个数组元素的任务加入到UI线程队列中。
            setTimeout(function () {
                handler(todo.shift());

                if (todo.length > 0) {
                    setTimeout(arguments.callee, 25);
                }
                else {
                    callback(arr);
                }
            }, 25);
        },
        /**
         *
         将函数分为多步（函数）执行。来自《高性能Javascript》 -> 第6章
         前提：任务可以异步处理而不影响用户体验或造成相关代码错误。
         适用于函数运行时间太久的情况。
         参数：每步调用的函数数组，参数数组，回调函数。
         注意：每步调用的函数传入的参数都一样！。按照函数数组顺序调用。
         实例：
         function saveDocument(id){
      var tasks = [operDucument, writeText, closeDocument, updateUI]; //数组元素为每步调用的函数
      multiStep(tasks, [id], 25, function(){ console.log("Done");})
    }
         * @param steps
         * @param args
         * @param time 延迟时间，以ms为单位
         * @param callback
         */
        multiStep: function (steps, args, time, callback) {
            var tasks = steps.concat(),
                time = time || 25;

            setTimeout(function () {
                var task = tasks.shift();
                task.apply(null, args || []);
                if (tasks.length > 0) {
                    setTimeout(arguments.callee, time);
                }
                else {
                    callback();
                }
            }, time);
        },
        //循环批处理数组的优化。来自《高性能Javascript》 -> 第6章
        //与handleArray用法相同。
        //不同点是handleArray一次处理1个数组元素，而batchHandleArray一次处理多个数组元素（执行50ms）。
        batchHandleArray: function (arr, handler, callback) {
            var todo = arr.concat();    //克隆数组

            setTimeout(function () {
                var start = +new Date();    //“+”将Date对象转化成数字

                //执行50ms处理一批数组元素（至少处理1个），然后UI线程空闲25ms，然后将该任务加入到UI线程队列中。
                do {
                    handler(todo.shift());
                } while (todo.length > 0 && (+new Date() - start < 50));

                if (todo.length > 0) {
                    setTimeout(arguments.callee, 25);
                }
                else {
                    callback(arr);
                }
            }, 25);
        }
    }
}());