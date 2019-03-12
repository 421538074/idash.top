var xm = new Vue({
    el: "#app",
    data: {
        isName: true,
        avtar: '',
        file_name: '',
        Username: "编辑名称",
        program_id: '',
        process_id: '',
        name: '',
        times:'',
    },
    methods: {
        editNickname() {
            this.isName = false;
        },
        goback() {
            window.history.back()
        },
        keepChange() {
            if (sessionStorage.getItem("replay_id")) {
                var replay_id = sessionStorage.getItem("replay_id");

            } else {
                var replay_id = ''
            }
            var id = replay_id ? parseInt(replay_id) : null
            console.log(id)

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
                    replay_id: id,
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

        this.name = sessionStorage.getItem("imgName");


        var myDate = new Date();
        this.times = myDate.toLocaleTimeString();
    }
})





// showTime();
// function showTime() {
//     var date = new Date(time * 1000);
//     var year = date.getFullYear();
//     var month = date.getMonth() + 1;
//     var day = date.getDate();
//     var hours = date.getHours();
//     var min = date.getMinutes(); //获取当前分钟数(0-59)
//     var sce = date.getSeconds(); //获取当前秒数(0-59)
//     if (month < 10) {
//         month = "0" + month;
//     }
//     if (day < 10) {
//         day = "0" + day;
//     }
//     if (hours < 10) {
//         hours = "0" + hours;
//     }
//     if (min < 10) {
//         min = "0" + min;
//     }
//     if (sce < 10) {
//         sce = "0" + sce;
//     }
//     document.getElementById("times").innerText = year + "-" + month + "-" + day + "  " + hours + ":" + min + ":" + sce;
// }