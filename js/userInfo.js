var xm = new Vue({
    el: "#app",
    data: {
        avatar: '',
        name: ''
    },
    methods: {
        goback() {
            window.history.back()
        },
    },
    created() {
        var that =this
        $.ajax({
            type: "post",
            url: `${api}/index/api/getUserInfo`,
            async: true,
            data: {},
            dataType: 'json',
            success: function (res) {
                console.log(res)
                that.avatar = res.data.avatar
                that.name = res.data.nickname
            },
            error: function (res) {
                console.log(res)
            }
        });
    }

})