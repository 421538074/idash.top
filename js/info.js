var vm = new Vue({
    el: "#app",
    data: {
        title: '',
        defend_time: '',
        wechat: '',
        wechat_time: '',
        domain_time: '',
        domain: '',
        rate: '',
        defend_fee: '',
        server_time: '',
        server_ip: "",
    },
    methods: {
        goIndex() {
            window.history.back();
        }
    },
    filters: {
        filterTime(time) {
            var date = new Date(time * 1000);
            // var date = new Date();
            var year = date.getFullYear();
            var month = date.getMonth() + 1;
            var day = date.getDate();
            if (month < 10) {
                month = "0" + month;
            }
            if (day < 10) {
                day = "0" + day;
            }
            return year + "年" + month + "月" + day + "日";
        }
    },
    created() {
        var program_id = getUrlKey('program_id')
        var that = this
        $.ajax({
            type: "post",
            url: `${api}/index/api/programDetail`,
            async: true,
            data: {
                program_id: program_id,
            },
            dataType: 'json',
            success: function (res) {
                that.title = res.data.title
                that.defend_fee = res.data.defend_fee
                that.defend_time = res.data.start_time
                that.wechat = res.data.wechat
                that.wechat_time = res.data.wechat_time
                that.domain_time = res.data.domain_time
                that.domain = res.data.domain
                that.server_ip = res.data.server_ip
                that.server_time = res.data.server_time
            },
            error: function (res) {}
        });
    }

})