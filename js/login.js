var xm = new Vue({
    el: "#app",
    data: {
        phone: '',
        psw: '',
        info: '',
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
                },
                error: function (res) {
                    console.log(res)
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
        }
    },
    created() {}

})


var countdown = 60;
$('#numbtn').on('click', function () {
    var obj = $("#numbtn");
    settime(obj);
})

function settime(obj) { //发送验证码倒计时
    if (countdown == 0) {
        obj.attr('disabled', false);
        obj.html("获取验证码");
        countdown = 60;
        return;
    } else {
        obj.attr('disabled', true);
        obj.html("重新发送(" + countdown + ")");
        countdown--;
    }
    setTimeout(function () {
        settime(obj)
    }, 1000)
}



const inputItems = document.querySelectorAll("input");
inputItems.forEach(function (ele) {
    ele.addEventListener("blur", function () {
        window.scrollTo(0, 0)
    })
})

// $(".login_main").click(function () {
//     inputItems.blur()
// })