var xm = new Vue({
    el: "#app",
    data: {
        create_at: '',
        program_id: '',
        backlog_id:'',
        titleList: [],
        imgUrl: "",
    },
    methods: {
        goback() {
            window.history.back()
        },
        add_img(event) {
            this.program_id = getUrlKey('program_id')
            this.backlog_id = getUrlKey('backlog_id')
            var that = this
            let img1 = event.target.files[0];
            console.log(img1)
            let type = img1.type; //文件的类型，判断是否是图片
            let size = img1.size; //文件的大小，判断图片的大小
            // if (this.imgData.accept.indexOf(type) == -1) {
            //     alert('请选择我们支持的图片格式！');
            //     return false;
            // }
            if (size > 3145728) {
                alert('请选择3M以内的图片！');
                return false;
            }
            let formData = new FormData();
            formData.append('file', img1);
            $.ajax({
                type: "post",
                url: `${api}/index/api/uploadFile`,
                data: formData,
                processData: false,
                async: false,
                contentType: false,
                dataType: "json",
                success: function (res) {
                    console.log(res)
                    sessionStorage.setItem('img', res.data);
                    window.location.href = `upfile.html?backlog_id=${that.backlog_id}`
                },
                error: function (res) {
                    console.log(res)
                }
            });
        },
        upChange(event) {
            $(event.target).find('input.invisible').click();
        },
        downloadCodeImg(index) {
            console.log(index)
            var img = this.titleList
            var codeIMG = img[index].data_url
            console.log(codeIMG)
            if(codeIMG==""){
                alert("暂无文件")
            }else{
                 var a = document.createElement('a')
                a.download = name || 'pic'
                // 设置图片地址
                a.href = `${api}${codeIMG}`;
                console.log(a)
                a.click();
            }
           
        },
    },
    filters: {
        filterTime(time) {
            var date = new Date(time * 1000);
            return date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + date.getDate();
        }
    },
    created() {
        this.program_id = getUrlKey('program_id')
        this.backlog_id = getUrlKey('backlog_id')
        var that = this
        $.ajax({
            type: "post",
            url: `${api}/index/api/file_list`,
            async: true,
            data: {
                program_id: this.program_id,
                backlog_id: this.backlog_id,
            },
            dataType: 'json',
            success: function (res) {
                console.log(res)
                that.titleList = res.data
            },
            error: function (res) {
                console.log(res)
            }
        });
    },

})