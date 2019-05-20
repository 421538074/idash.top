var xm = new Vue({
    el: "#app",
    data: {
        id: '',
        title: '',
        start_time: '',
        end_time: '',
        demand: '',
        graph: '',
        design: '',
        fronted: '',
        backer: '',
        test: '',
        check: '',
        percentList: [{process:'我是啊啊啊啊啊'},{process:'我'}],
        rate: '',
        arr: '',
        staus: ['需求', '原型', '设计', '前端', '后台', '测试', '验收']
    },
    methods: {
        goUser() {
            window.location.href = "userInfo.html"
        },
        goIndex() {
            window.location.href = "indexList.html"
        },
        projectDetail() {
            var Pid = this.percentList[0].id
            if (getUrlKey('program_id') == null) {
                this.program_id = 10
            } else {
                this.program_id = getUrlKey('program_id')
            }
            window.location.href = `projectDetail.html?program_id=${this.program_id}&process_id=${Pid}`
        },
        requireChange() {
            if (getUrlKey('program_id') == null) {
                this.program_id = 10
            } else {
                this.program_id = getUrlKey('program_id')
            }
            window.location.href = `projectDetail1.html?program_id=${this.program_id}`
        },

        goDetail(id) {
            var process_id = id[0]
            var ids = id[1]
            sessionStorage.setItem('numId', ids)
            console.log(id[1])
            window.location.href = `projectDetail.html?program_id=${this.program_id}&process_id=${process_id}`
        },
        goInfo() { //跳转项目信息
            window.location.href = "info.html?program_id=" + getUrlKey('program_id')
        }
    },
    components: {
        "cp-cylind": cylindricalGraph,
        "cy-bar": projectBar,
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
    created() {
        if (getUrlKey('program_id') == null) {
            this.program_id = 10
        } else {
            this.program_id = getUrlKey('program_id')
        }
        var that = this
        $.ajax({
            type: "post",
            url: `${api}/index/api/myProgram`,
            async: true,
            data: {
                program_id: this.program_id,
            },
            dataType: 'json',
            success: function (res) {
                console.log(res)
                that.percentList = res.data.process  //需求

                that.arr = res.data.backlog
                that.title = res.data.title
                that.start_time = res.data.start_time
                that.end_time = res.data.end_time
                that.demand = res.data.demand
                that.graph = res.data.graph
                that.design = res.data.design
                that.fronted = res.data.fronted
                that.backer = res.data.backer
                that.test = res.data.test
                that.check = res.data.check
                if (that.demand == null && that.graph == null &&
                    that.design == null && that.fronted == null &&
                    that.backer == null && that.test == null &&
                    that.check == null
                ) {
                    that.demand = 0
                    that.graph = 0
                    that.design = 0
                    that.fronted = 0
                    that.backer = 0
                    that.test = 0
                    that.check = 0
                }
                that.rate = res.data.rate

                if (that.content == '' || null) {
                    $('.lis').css("display", "none")
                }
                if (that.question == '' || null) {
                    $('.lis1').css("display", "none")
                }
                if (res.data.backlog.length == 0) {
                    $('.index_one').css("display", "block")
                }

            },
            error: function (res) {
                console.log(res)
            }
        });
    }
})