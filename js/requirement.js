var xm = new Vue({
    el: "#app",
    data: {
        arr: [],
        Garr: [],
        text: "",
        create_at: '',
        log_content: '',
        log_name: '',
        content: '',
        isshow: true,
        ischat: false,
        ischat1: false,
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
            let type = img1.type; //文件的类型，判断是否是图片
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
                this.isshow = false
            }
        },
        send() {
            if (this.text) {
                var that = this
                $.ajax({
                    type: "post",
                    url: `${api}/index/api/backlogReplay`,
                    data: {
                        backlog_id: 1,
                        content: this.text,
                    },
                    async: true,
                    dataType: 'json',
                    success: function (res) {
                        console.log(res)
                        // this.arr.push({
                        //     content: this.text,
                        // })

                        this.text = '',
                            $.ajax({
                                type: "post",
                                url: `${api}/index/api/backlogDetail`,
                                async: true,
                                data: {
                                    backlog_id: 1,
                                },
                                dataType: 'json',
                                success: res => {
                                    that.Garr = res.data.detail
                                    that.arr = res.data.detail
                                },
                                error: res => {
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
    },
    filters: {
        filterTime(time) {
            var date = new Date(time * 1000);
            return date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + date.getDate();
        }
    },
    created() {
        var that = this
        $.ajax({
            type: "post",
            url: `${api}/index/api/backlogDetail`,
            async: true,
            data: {
                backlog_id: 1,
            },
            dataType: 'json',
            success: function (res) {
                console.log(res)
                // that.create_at = res.data.descr.create_at
                // that.log_content = res.data.descr.log_content
                // that.log_name = res.data.descr.log_name

                that.Garr = res.data.detail
                that.arr = res.data.detail
            },
            error: function (res) {
                console.log(res)
            }
        });
    }
})



$(".require_main").click(function () {
    $("#myInput").blur()
    // $(".require_main").css("position", "fixed")
})