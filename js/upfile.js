var xm = new Vue({
    el: "#app",
    data: {
        isName: true,
        avtar: '',
        file_name: '',
        Username: "编辑名称",
        program_id: '',
        process_id: ''

    },
    methods: {
        editNickname() {
            this.isName = false;
        },
        goback() {
            window.history.back()
        },
        keepChange() {
            this.program_id = getUrlKey('program_id')
            this.backlog_id = getUrlKey('backlog_id')
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
                    program_id: this.program_id,
                    backlog_id: this.backlog_id,
                },
                dataType: 'json',
                success: function (res) {
                    window.history.back();
                    sessionStorage.clear();
                },
                error: function (res) {
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
    }
})