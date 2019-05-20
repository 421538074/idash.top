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
        currentIndex: 0,
        barList: [],
    },
    methods: {
        goIndex() {
            this.program_id = getUrlKey('program_id')
            window.location.href = `index.html?program_id=${this.program_id}`
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
        getList(id) {
            var index = id 
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
                    that.rate = res.data.rate
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
    components: {
        "cy-project": project,
        "cp-tabbar": tabBar,
    },
    created() {
        var program_id = getUrlKey('program_id')
        var process_id = getUrlKey('process_id')
        var that = this
        //待办事项 
        $.ajax({
            type: "post",
            url: `${api}/index/api/feedbackList`,
            async: true,
            data: {
                program_id: program_id,
                process_id: process_id,
            },
            dataType: 'json',
            success: function (res) {
                console.log(res)
                that.feedList = res.data.normal
                that.startList = res.data.complete
                that.delayList = res.data.delay
                that.firstList = res.data.first
                that.rate = res.data.rate


            },
        });
        // 获取需求
        $.ajax({
            type: "post",
            url: `${api}/index/api/myProgram`,
            async: true,
            data: {
                program_id: program_id,
            },
            dataType: 'json',
            success: function (res) {
                console.log(res)
                that.barList = res.data.process  //需求
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