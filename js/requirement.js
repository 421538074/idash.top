var xm = new Vue({
    el: "#app",
    data: {
        arr: [{
            text: ""
        }],
        Garr: [],
        text: "",
        create_at: '',
        log_content: '',
        log_name: '',
        content: ''
    },
    methods: {
        goback() {
            window.history.back()
        },
        upChange() {
            $.ajax({
                type: "post",
                url: `${api}/index/api/backlogReplay`,
                async: true,
                data: {
                    backlog_id: 1,
                    content: this.text
                },
                dataType: 'json',
                success: res => {
                    console.log(res)
                    
                },
                error: res => {
                    console.log(res)
                }
            });

        },
        backChange() {
            window.location.href = "backlog.html"
        }

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
            url: `${api}/index/api/backlogDetail`,
            async: true,
            data: {
                backlog_id: 1,
            },
            dataType: 'json',
            success: res => {
                console.log(res)
                this.create_at = res.data.descr.create_at
                this.log_content = res.data.descr.log_content
                this.log_name = res.data.descr.log_name

                this.Garr = res.data.detail
                this.arr = res.data.detail
            },
            error: res => {
                console.log(res)
            }
        });
    }


})