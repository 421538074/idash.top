var xm = new Vue({
    el: "#app",
    data: {
        phone: '',
        psw: '',
        info: '',
        msg: "获取验证码",
    },
    methods: {
        gain() {
            var that = this
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
                    if (res.status == 1) {
                        var countdown = 60;
                        that.msg = countdown + "s";
                        var interval = setInterval(function () {
                            if (countdown == 1) {
                                countdown = 60;
                                that.msg = '获取验证码';
                                clearInterval(interval);
                                return false;
                            }
                            countdown -= 1;
                            that.msg = countdown + 's';
                        }, 1000);
                    }
                },
                error: function (res) {
                }
            });
        },
        enter() {
            if (this.psw !== '') {
                $.ajax({
                    type: "post",
                    url: `${api}/index/api/login`,
                    async: true,
                    data: {
                        phone: this.phone,
                        code: this.info
                    },
                    dataType: 'json',
                    success: function (res) {
                        console.log(res)
                        if (res.status == -1) {
                            alert(res.msg)
                        } else {
                            window.location.href = "topic.html"
                        }
                    },
                    error: function (res) {
                    }
                });
            } else {}
        },
        onfocus() {
            var body = document.querySelector('#app')
            body.scrollTop = body.scrollHeight
        },
        onblur() {
            window.scroll(0, 0)
            console.log(window.scroll)
        }
    },
    created() {}

})




const inputItems = document.querySelectorAll("input");
inputItems.forEach(function (ele) {
    ele.addEventListener("blur", function () {
        window.scrollTo(0, 0)
    })
})

// $(".login_main").click(function () {
//     $("").blur()
// })