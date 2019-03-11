"use strict";

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
        backlog_id: '',
        avatar: '',
        handle_status: '',
    },
    methods: {
        goback: function goback() {
            window.history.back();
        },
        upChange: function upChange(event) {
            $(event.target).find('input.invisible').click();
        },
        add_img: function add_img(event) {
            this.backlog_id = getUrlKey('id');
            var that = this;
            var img1 = event.target.files[0];
            console.log(img1); // let type = img1.type; //文件的类型，判断是否是图片

            var size = img1.size; //文件的大小，判断图片的大小
            // if (this.imgData.accept.indexOf(type) == -1) {
            //     alert('请选择我们支持的图片格式！');
            //     return false;
            // }

            if (size > 3145728) {
                alert('请选择3M以内的图片！');
                return false;
            }

            var formData = new FormData();
            formData.append('file', img1);
            $.ajax({
                type: "post",
                url: "".concat(api, "/index/api/uploadFile"),
                data: formData,
                processData: false,
                async: false,
                contentType: false,
                dataType: "json",
                success: function success(res) {
                    console.log(res);
                    sessionStorage.setItem('img', res.data);
                    window.location.href = "upfile.html?backlog_id=".concat(that.backlog_id);
                },
                error: function error(res) {
                    console.log(res);
                }
            });
        },
        goLog: function () {
            this.program_id = getUrlKey('program_id');
            this.backlog_id = getUrlKey('id');
            window.location.href = `backlog.html?program_id=${this.program_id}&backlog_id=${this.backlog_id}`
        },
        backChange: function backChange() {
            this.program_id = getUrlKey('program_id');
            window.location.href = "projectDetail1.html?program_id=".concat(this.program_id);
        },
        focus: function focus() {
            var myInput = document.getElementById('myInput');

            if (myInput == document.activeElement) {
                // this.isshow = false
                $(".foot_require").hide();
                $(".require_foot_three").show();
            }
        },
        send: function send() {
            this.backlog_id = getUrlKey('id');
            console.log(this.backlog_id);
            var that = this;
            if (this.text) {
                var that = this;
                $.ajax({
                    type: "post",
                    url: "".concat(api, "/index/api/backlogReplay"),
                    data: {
                        backlog_id: this.backlog_id,
                        content: this.text
                    },
                    async: true,
                    dataType: 'json',
                    success: function success(res) {
                        $(".require_foot_three").hide();
                        $(".foot_require").show(); // var replay_id =res.data.replay_id

                        sessionStorage.setItem('replay_id', res.data.replay_id);
                        that.text = '', $.ajax({
                            type: "post",
                            url: "".concat(api, "/index/api/backlogDetail"),
                            async: true,
                            data: {
                                backlog_id: that.backlog_id
                            },
                            dataType: 'json',
                            success: function success(res) {
                                that.Garr = res.data.detail;
                            },
                            error: function error(res) {
                                console.log(res);
                            }
                        });
                        this.isshow = true;
                    },
                    error: function error(res) {
                        console.log(res);
                    }
                });
            } else {
                alert('请输入内容');
            }
        },
        setHeight: function setHeight(event) {
            console.log(event.target.scrollHeight);
            var bodyFontSize = getComputedStyle(document.querySelector('body')).fontSize;
            bodyFontSize = bodyFontSize.substring(0, bodyFontSize.length - 2);
            var textareaHeight = getComputedStyle(event.target).height;
            textareaHeight = textareaHeight.substring(0, textareaHeight.length - 2);

            if (parseInt(bodyFontSize) * 0.4 == parseInt(textareaHeight) && event.target.style.height.substring(0, event.target.style.height.length - 2) >= bodyFontSize * 1) {
                return false;
            }

            event.target.style.height = 'auto';
            event.target.style.height = event.target.scrollHeight + 'px';

            if (event.target.style.height.substring(0, event.target.style.height.length - 2) >= bodyFontSize * 1) {
                event.target.style.height = bodyFontSize * 1 + 'px';
            }
        }
    },
    filters: {
        filterTime: function filterTime(time) {
            var date = new Date(time * 1000);
            var year = date.getFullYear();
            var month = date.getMonth() + 1;
            var day = date.getDate();
            var hours = date.getHours();
            var min = date.getMinutes(); //获取当前分钟数(0-59)
            var sce = date.getSeconds(); //获取当前秒数(0-59)
            if (month < 10) {
                month = "0" + month;
            }
            if (day < 10) {
                day = "0" + day;
            }
            if (hours < 10) {
                hours = "0" + hours;
            }
            if (min < 10) {
                min = "0" + min;
            }
            if (sce < 10) {
                sce = "0" + sce;
            }
            return year + "-" + month + "-" + day + "  " + hours + ":" + min + ":" + sce;
        },
        filterTime1: function filterTime(time) {
            var date = new Date(time * 1000);
            var year = date.getFullYear();
            var month = date.getMonth() + 1;
            var day = date.getDate();
            if (month < 10) {
                month = "0" + month;
            }
            if (day < 10) {
                day = "0" + day;
            }
            return year + "-" + month + "-" + day;
        }
    },
    created: function () {
        this.backlog_id = getUrlKey('id');
        console.log(this.backlog_id);
        var that = this;
        $.ajax({
            type: "post",
            url: "".concat(api, "/index/api/backlogDetail"),
            async: true,
            data: {
                backlog_id: this.backlog_id
            },
            dataType: 'json',
            success: function success(res) {
                console.log(res);
                that.avatar = res.data.descr.avatar;
                that.handle_status = res.data.descr.handle_status;
                that.create_at = res.data.descr.create_at;
                that.log_content = res.data.descr.log_content;
                that.log_name = res.data.descr.log_name;
                that.Garr = res.data.detail;
            }
        });
    }
});


$(".require_main").click(function () {
    $("#myInput").blur();
    $(".require_foot_three").hide();
    $(".foot_require").show();
});
$(".btn-group").click(function () {
    $("#myInput").blur();
    $(".require_foot_three").hide();
    $(".foot_require").show();
});
var inputItems = document.querySelectorAll("textarea");
inputItems.forEach(function (ele) {
    ele.addEventListener("blur", function () {
        window.scrollTo(0, 0);
    });
});