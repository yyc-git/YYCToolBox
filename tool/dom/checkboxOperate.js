//var checkbox = checkbox || function () { };

YYC.namespace("Tool").checkbox =(function(){
    return {
        $: function (id) {
            return $("#" + id);
        },
        //selectAll()只对多选框有效，其余方法对单选框和多选框都有效。
        //id_all为全选框id，id_every为要操作的多选框的父级对象的id值。
        //如果全选框选中，则集合都选中；否则集合都不选中。
        //例子：
        //全选框：<input type="checkbox" id="user_company_selectAll" onclick="checkbox.selectAll('user_company_selectAll', 'user_company_table');"/>
        //其中user_company_selectAll为全选框的id，user_company_table为多选框的父级层的id。
        selectAll: function (id_all, id_every) {
            if (this.$(id_all).attr("checked") == "checked") {
                this.$(id_every).find("input[type=checkbox]").attr("checked", true);
            }
            else {
                this.$(id_every).find("input[type=checkbox]").attr("checked", false);
            }
        },
        check: function (id) {
            this.$(id).attr("checked", true);
        },
        unCheck: function (id) {
            this.$(id).attr("checked", false);
        },
        isCheck: function (id) {
            if (!this.$(id).attr("checked")) {
                return false;
            }
            else {
                return true;
            }
        },
        //获得单选框选中项。
        //返回项只有一项。
        getCheckedByRadio: function (name) {
            //对特殊字符转义
            var name = YYC.Tool.escape.escapeJquery(name);

            return $('input:radio[name=' + name + ']:checked');
        },
        //获得一组设置了name属性的多选框的选中项。
        //返回项可能有多项。
        getCheckedByCheckbox: function (name) {
            //对特殊字符转义
            var name = YYC.Tool.escape.escapeJquery(name);

            return $('input:checkbox[name=' + name + ']:checked'); 
        }
    }
}());

