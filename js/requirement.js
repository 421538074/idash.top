var xm = new Vue({
    el: "#app",
    data: {
        Garr: [],
        text: "",
        create_at: '',
        log_content: '',
        log_name: '',
        content: '',
        isshow: true,
        backlog_id: ''
    },
    methods: {
        goback() {
            window.history.back()
        },
        upChange(event) {
            $(event.target).find('input.invisible').click();
        },
        add_img(event) {
            let img1 = event.target.files[0];
            console.log(img1)
            // let type = img1.type; //文件的类型，判断是否是图片
            let size = img1.size; //文件的大小，判断图片的大小
            // if (this.imgData.accept.indexOf(type) == -1) {
            //     alert('请选择我们支持的图片格式！');
            //     return false;
            // }
            if (size > 3145728) {
                alert('请选择3M以内的图片！');
                return false;
            }
            let formData = new FormData();
            formData.append('file', img1);
            $.ajax({
                type: "post",
                url: `${api}/index/api/uploadFile`,
                data: formData,
                processData: false,
                async: false,
                contentType: false,
                dataType: "json",
                success: function (res) {
                    console.log(res)
                    sessionStorage.setItem('img', res.data);
                    window.location.href = "upfile.html"
                },
                error: function (res) {
                    console.log(res)
                }
            });
        },
        backChange() {
            this.program_id = getUrlKey('program_id')
            window.location.href = `projectDetail1.html?program_id=${this.program_id}`
        },
        focus() {
            var myInput = document.getElementById('myInput');
            if (myInput == document.activeElement) {
                // this.isshow = false
                $(".foot_require").hide();
                $(".require_foot_three").show();
            }
        },
        send() {
            this.backlog_id = getUrlKey('id')
            console.log(this.backlog_id)
            var that = this
            if (this.text) {
                var that = this
                $.ajax({
                    type: "post",
                    url: `${api}/index/api/backlogReplay`,
                    data: {
                        backlog_id: this.backlog_id,
                        content: this.text,
                    },
                    async: true,
                    dataType: 'json',
                    success: function (res) {
                        console.log(res)
                        that.text = '',
                            $.ajax({
                                type: "post",
                                url: `${api}/index/api/backlogDetail`,
                                async: true,
                                data: {
                                    backlog_id: that.backlog_id,
                                },
                                dataType: 'json',
                                success: function (res) {
                                    that.Garr = res.data.detail
                                },
                                error: function (res) {
                                    console.log(res)
                                }
                            });
                        this.isshow = true
                    },
                    error: function (res) {
                        console.log(res)
                    }
                });
            } else {
                alert('请输入内容')
            }

        },
        setHeight(event) {
            console.log(event.target.scrollHeight);
            let bodyFontSize = getComputedStyle(document.querySelector('body')).fontSize;
            bodyFontSize = bodyFontSize.substring(0,bodyFontSize.length - 2);
            let textareaHeight = getComputedStyle(event.target).height;
            textareaHeight = textareaHeight.substring(0,textareaHeight.length - 2);
            if(parseInt(bodyFontSize)*0.4 == parseInt(textareaHeight) && event.target.style.height.substring(0,event.target.style.height.length - 2) >= bodyFontSize*1.5) {
                return false;
            }
            event.target.style.height = 'auto';
            event.target.style.height = event.target.scrollHeight + 'px';
            if(event.target.style.height.substring(0,event.target.style.height.length - 2) >= bodyFontSize*1.5) {
                event.target.style.height = bodyFontSize*1.5 +'px';
            }
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
            return  year + "-" + month + "-" + day;
        }
    },
    created() {
        this.backlog_id = getUrlKey('id')
        console.log(this.backlog_id)
        var that = this
        $.ajax({
            type: "post",
            url: `${api}/index/api/backlogDetail`,
            async: true,
            data: {
                backlog_id: this.backlog_id,
            },
            dataType: 'json',
            success: function (res) {
                console.log(res)
                that.create_at = res.data.descr.create_at
                that.log_content = res.data.descr.log_content
                that.log_name = res.data.descr.log_name
                that.Garr = res.data.detail
            },
        });
    }
})



$(".require_main").click(function () {
    $("#myInput").blur()
    $(".require_foot_three").hide();
    $(".foot_require").show();
})


const inputItems = document.querySelectorAll("input");
inputItems.forEach(function (ele) {
    ele.addEventListener("blur", function () {
        window.scrollTo(0, 0)
    })
})