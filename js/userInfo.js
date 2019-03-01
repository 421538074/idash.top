var xm = new Vue({
    el: "#app",
    data: {
        avatar:'',
        name:''
    },
    methods: {
        goback() {
            window.history.back()
        },
    },
    created() {
        $.ajax({
            type: "post",
            url: `${api}/index/api/getUserInfo`,
            async: true,
            data: {},
            dataType: 'json',
            success: res => {
                console.log(res)
                this.avatar = res.data.avatar
                this.name = res.data.nickname
            },
            error: res => {
                console.log(res)
            }
        });
    }

})