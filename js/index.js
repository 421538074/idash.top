var xm = new Vue({
    el: "#app",
    data: {
        id: '',
        title: '',
        start_time: '',
        end_time: '',
        question: '',
        content: '',
        demand: '',
        graph: '',
        design: '',
        fronted: '',
        backer: '',
        test: '',
        check: '',
        percentList: [],
        rate: '',
        // program_id: 5,
    },
    methods: {
        goUser() {
            window.location.href = "userInfo.html"
        },
        goIndex() {
            window.location.href = "indexList.html"
        },
        projectDetail() {
            if (getUrlKey('program_id') == null) {
                this.program_id = 5
            } else {
                this.program_id = getUrlKey('program_id')
            }
            window.location.href = `projectDetail.html?program_id=${this.program_id}`
        },
        requireChange() {
            if (getUrlKey('program_id') == null) {
                this.program_id = 5
            } else {
                this.program_id = getUrlKey('program_id')
            }
            window.location.href = `projectDetail1.html?program_id=${this.program_id}`
        }
    },
    components: {
        [cylindricalGraph.name]: cylindricalGraph,
        [projectBar.name]: projectBar,
    },
    filters: {
        filterTime(time) {
            var date = new Date(time * 1000);
            return date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + date.getDate();
        }
    },
    created() {
        console.log(getUrlKey('id'))
        if (getUrlKey('program_id') == null) {
            this.program_id = 5
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
                // this.id = res.data.id
                that.title = res.data.title
                that.start_time = res.data.start_time
                that.end_time = res.data.end_time
                that.question = res.data.question
                that.content = res.data.content
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
                that.percentList = [that.demand + "%",
                    that.graph + "%", that.design + "%",
                    that.fronted + "%", that.backer + "%",
                    that.test + "%", that.check + "%"
                ]
                that.rate = res.data.rate

            },
            error: function (res) {
                console.log(res)
            }
        });
    }

})