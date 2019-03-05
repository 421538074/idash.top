var xm = new Vue({
    el: "#app",
    data: {
        create_at: '',
        program_id: '',
        titleList: [],
        imgUrl:"",
    },
    methods: {
        goback() {
            window.history.back()
        },
        add_img(event) {
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
                success: res => {
                    console.log(res)
                    sessionStorage.setItem('img', res.data);
                    window.location.href = "upfile.html"
                },
                error: res => {
                    console.log(res)
                }
            });
        },
        upChange(event) {
            $(event.target).find('input.invisible').click();
        },
        downloadCodeImg(index) {
            console.log(index)
            console.log(this.titleList)
            var img=this.titleList
            console.log(img)
            var codeIMG =img[index].data_url
            // console.log('下载图片')
            var a = document.createElement('a')
            a.download = name || 'pic'
            // 设置图片地址
            a.href = codeIMG;
            a.click();
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
        this.process_id = getUrlKey('process_id')
        $.ajax({
            type: "post",
            url: `${api}/index/api/file_list`,
            async: true,
            data: {
                program_id: this.program_id,
                process_id: 1,
            },
            dataType: 'json',
            success: res => {
                console.log(res)
                this.titleList = res.data
            },
            error: res => {
                console.log(res)
            }
        });
    },

})