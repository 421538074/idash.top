var vm = new Vue({
    el: "#app",
    data: {
        list: [],
        bar:['20%']
    },
    methods: {
        goUser() {
            window.location.href = "userInfo.html"
        },
        goStudy(id) {
            // console.log(id)
            // window.location.href = `index.html=${id}`
            window.location.href ="index.html"
        },
        indexDetail() {
            window.location.href = ""
        }
    },
    components: {
        [Bar.name]: Bar,
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
            url: `${api}/index/api/get_info`,
            async: true,
            data: {},
            dataType: 'json',
            success: res => {
                console.log(res)
                this.list = res.data
                
            },
            error: res => {
                console.log(res)
            }
        });
    }

})