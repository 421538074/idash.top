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
        rate: ''
    },
    methods: {
        goback() {
            window.history.back()
        },
        goRequire(index) {
            var arr = this.feedList
            var id = arr[index].id
            console.log(id)
            this.program_id = getUrlKey('program_id')
            window.location.href = `requirement.html?program_id=${this.program_id}&id=${id}`
        },
        goTwo(index) {
            var arr = this.startList
            var id = arr[index].id
            this.program_id = getUrlKey('program_id')
            window.location.href = `requirement.html?program_id=${this.program_id}&id=${id}`
        },
        goThree(index) {
            var arr = this.delayList
            var id = arr[index].id
            this.program_id = getUrlKey('program_id')
            window.location.href = `requirement.html?program_id=${this.program_id}&id=${id}`
        },
        goFour(index) {
            var arr = this.firstList
            var id = arr[index].id
            this.program_id = getUrlKey('program_id')
            window.location.href = `requirement.html?program_id=${this.program_id}&id=${id}`
        },
        upChange() { //跳转待办事项文件
            var process_id = sessionStorage.getItem("key");
            var program_id = this.program_id
            window.location.href = `backlog.html?program_id=${program_id}&process_id=${process_id}`
        },
        goProject() {
            this.program_id = getUrlKey('program_id')
            window.location.href = `projectDetail1.html?program_id=${this.program_id}`

        },
        lisTbar(index) {
            sessionStorage.setItem('key', JSON.stringify(index));
            this.program_id = getUrlKey('program_id')
            var that = this
            //待办事项 
            $.ajax({
                type: "post",
                url: `${api}/index/api/feedbackList`,
                async: true,
                data: {
                    program_id: this.program_id,
                    process_id: index,
                },
                dataType: 'json',
                success: function (res) {
                    that.feedList = res.data.normal
                    that.startList = res.data.complete
                    that.delayList = res.data.delay
                    that.firstList = res.data.first
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
    components: {
        "cy-project": project,
    },
    created() {
        this.program_id = getUrlKey('program_id')
        var that = this
        //待办事项 
        $.ajax({
            type: "post",
            url: `${api}/index/api/feedbackList`,
            async: true,
            data: {
                program_id: this.program_id,
                process_id: 1,
            },
            dataType: 'json',
            success: function (res) {
                that.feedList = res.data.normal
                that.startList = res.data.complete
                that.delayList = res.data.delay
                that.firstList = res.data.first
                that.rate = res.data.rate


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
        });
    })
});