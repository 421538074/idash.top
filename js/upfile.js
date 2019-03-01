var xm = new Vue({
    el: "#app",
    data: {
        isName: true,
        file_name: '',
    },
    methods: {
        editNickname() {
            this.isName = false;
        },
        goback() {
            window.history.back()
        },
        keepChange() {
            var file_name = sessionStorage.getItem("img");
            $.ajax({
                type: "post",
                url: `${api}/index/api/myProgram`,
                async: true,
                data: {
                    title: "haha",
                    file_name: file_name,
                    program_id: 5,
                    process_id: 1,
                },
                dataType: 'json',
                success: res => {
                    console.log(res)
                },
                error: res => {
                    console.log(res)
                }
            });
        }
    },
    created() {
        // var file_name = sessionStorage.getItem("img");
        
    }
})