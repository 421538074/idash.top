var vm = new Vue({
    el: "#app",
    data: {
        list: [],
        bar:['0%'],
        show:false,
    },
    methods: {
        goUser() {
            window.location.href = "userInfo.html"
        },
        goStudy(id) {
            console.log(id)
            window.location.href = `index.html?program_id=${id}`
        },
        indexDetail() {
            window.location.href = ""
        },

    },
    components: {
        "cy-bar": Bar,
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
            return  year + "-" + month + "-" + day;
        }
    },
    created() {
        var that =this
        $.ajax({
            type: "post",
            url: `${api}/index/api/get_info`,
            async: true,
            data: {},
            dataType: 'json',
            success: function(res) {
                console.log(res)
                 if (res.data.length == 0) {
                    that.show = true
                }
                that.list = res.data
            },
            error: function(res) {
                console.log(res)
            }
        });
    }

})