var xm = new Vue({
    el: "#app",
    data: {
        isName: true,
        avtar: '',
        file_name: '',
        Username: "编辑名称",
    },
    methods: {
        editNickname() {
            this.isName = false;
        },
        goback() {
            window.history.back()
        },
        keepChange() {
            var title = $("#up_text").text()
            console.log(title)
            var image = sessionStorage.getItem("img");
            $.ajax({
                type: "post",
                url: `${api}/index/api/saveFile`,
                async: true,
                data: {
                    title: title,
                    file_name: image,
                    program_id: 5,
                    process_id: 1,
                },
                dataType: 'json',
                success: res => {
                    console.log(res)
                    window.history.back();
                    sessionStorage.clear();
                },
                error: res => {
                    console.log(res)
                }
            });
        },
        confire() {
            console.log($(".editor").val())
            var up_text = document.getElementById("up_text");
            var input_v = document.getElementById("input_v");
            up_text.innerText = input_v.value;
            this.isName = true;
        },
    },
    created() {
        var image = sessionStorage.getItem("img");
        image = image.replace(".", "");
        this.avtar = `${api}${image}`




        // $.ajax({
        //     type: "post",
        //     url: `${api}/index/api/file_list`,
        //     async: true,
        //     data: {
        //         program_id: this.program_id,
        //         process_id: this.process_id,
        //     },
        //     dataType: 'json',
        //     success: res => {
        //         console.log(res)
        //         this.titleList = res.data
        //     },
        //     error: res => {
        //         console.log(res)
        //     }
        // });
    }
})