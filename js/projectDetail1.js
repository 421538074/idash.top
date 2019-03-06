var xm = new Vue({
    el: "#app",
    data: {
        isshow: true,
        program_id: '',
        process_id: '',
        feedList: [],
        title: [],
        startList: [],
        delayList: [],
        firstList: [],
        List: [],
        rate: '',
    },
    methods: {
        goback() {
            window.history.back()
        },
        goRequire() {
            window.location.href = "requirement.html"
        },
        upChange(index) { //跳转待办事项文件
            var arr = this.title
            var backlog_id = arr[index].id
            console.log(backlog_id)
            this.program_id = getUrlKey('program_id')
            window.location.href = `backlog.html?program_id=${this.program_id}&backlog_id=${backlog_id}`
        },
        goProject() {
            this.program_id = getUrlKey('program_id')
            window.location.href = `projectDetail.html?program_id=${this.program_id}`

        },
        lisTbar(index) {
            sessionStorage.setItem('key', JSON.stringify(index));
            this.program_id = getUrlKey('program_id')
            var that = this
            $.ajax({
                type: "post",
                url: `${api}/index/api/feedback_list`,
                async: true,
                data: {
                    program_id: this.program_id,
                    process_id: index,
                },
                dataType: 'json',
                success: function (res) {
                    that.title = res.data

                },
                error: function (res) {
                    console.log(res)
                }
            });
        }
    },
    filters: {
        filterTime(time) {
            var date = new Date(time * 1000);
            return date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + date.getDate();
        }
    },
    created() {
        var that = this
        this.program_id = getUrlKey('program_id')
        $.ajax({
            type: "post",
            url: `${api}/index/api/feedback_list`,
            async: true,
            data: {
                program_id: this.program_id,
                process_id: 1,
            },
            dataType: 'json',
            success: function (res) {
                console.log(res)
                that.title = res.data
                sessionStorage.setItem('key', JSON.stringify(1));
            },
            error: function (res) {
                console.log(res)
            }
        });
    },

})


$(function () {
    $(".project_banner ul li").each(function (index) {
        $(this).click(function () {
            $("li.blue").removeClass("blue");
            $(this).addClass("blue");
            // $(".tab-content div.active-txt").removeClass("active-txt");
            // $(".tab-content div").eq(index).addClass("active-txt");
        });
    })
});