var vm = new Vue({
    el: "#app",
    data: {
        list: [],
        bar:['0%']
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
        }
    },
    components: {
        "cy-bar": Bar,
    },
    filters: {
        filterTime(time) {
            var date = new Date(time * 1000);
            return date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + date.getDate();
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
                that.list = res.data
            },
            error: function(res) {
                console.log(res)
            }
        });
    }

})