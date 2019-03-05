var xm = new Vue({
    el: "#app",
    data: {
        phone: '',
        psw: '',
        info: ''
    },
    methods: {
        gain() {
            var that =this
            $.ajax({
                type: "post",
                url: `${api}/index/api/sendSms`,
                async: true,
                data: {
                    phone: this.phone
                },
                dataType: 'json',
                success: function (res) {
                    that.info = res.info
                },
                error: function (res) {
                    console.log(res)
                }
            });
        },
        enter() {
            console.log(this.info)
            if (this.psw !== '') {
                if (this.psw == this.info && this.psw !== '') {
                    window.location.href = "topic.html"
                } else {
                    alert("验证码有误")
                }
            } else {
                alert("请输入手机号")
            }

        }
    },
    created() {}

})