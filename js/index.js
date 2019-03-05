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
        num:['20%']
    },
    methods: {
        goUser() {
            window.location.href = "userInfo.html"
        },
        goIndex() {
            window.location.href = "indexList.html"
        },
        projectDetail() {
            var program_id = this.id
            console.log(program_id)
            window.location.href = `projectDetail.html?program_id=${program_id}`
        },
        requireChange() {
            var program_id = this.id
            console.log(program_id)
            window.location.href = `projectDetail1.html?program_id=${program_id}`
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
        $.ajax({
            type: "post",
            url: `${api}/index/api/myProgram`,
            async: true,
            data: {
                program_id: 5,
            },
            dataType: 'json',
            success: res => {
                console.log(res)
                this.id = res.data.id
                this.title = res.data.title
                this.start_time = res.data.start_time
                this.end_time = res.data.end_time
                this.question = res.data.question
                this.content = res.data.content
                this.demand = res.data.demand
                this.graph = res.data.graph
                this.design = res.data.design
                this.fronted = res.data.fronted
                this.backer = res.data.backer
                this.test = res.data.test
                this.check = res.data.check
                this.percentList = [this.demand + "%",
                    this.graph + "%", this.design + "%",
                    this.fronted + "%", this.backer + "%",
                    this.test + "%", this.check + "%"
                ]

            },
            error: res => {
                console.log(res)
            }
        });
    }

})