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
    },
    methods: {
        goback() {
            window.history.back()
        },
        goRequire() {
            this.program_id = getUrlKey('program_id')
            window.location.href = `requirement.html?program_id=${this.program_id}`
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
                success: res => {
                    this.feedList = res.data.normal
                    // this.List = res.data.normal
                    this.startList = res.data.complete
                    this.delayList = res.data.delay
                    this.firstList = res.data.first
                },
                error: res => {
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
        this.program_id = getUrlKey('program_id')
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
            success: res => {
                this.feedList = res.data.normal
                // this.List = res.data.normal
                this.startList = res.data.complete
                this.delayList = res.data.delay
                this.firstList = res.data.first
            },
            error: res => {
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