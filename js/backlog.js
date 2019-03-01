var xm = new Vue({
    el: "#app",
    data: {
        create_at: '',
        program_id: '',
        titleList: []
    },
    methods: {
        // great: function () {
        //     document.getElementById('file').onchange = function () {
        //         var imgFile = this.files[0];
        //         console.log(imgFile)
        //     }
        // },
        goback() {
            window.history.back()
        },
        loadChange() {
            window.location.href = "upfile.html"
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
            // var fr = new FileReader();
            // fr.onload = function () {
            //     document.getElementById('portrait').src = fr.result;
            // };
            // fr.readAsDataURL(img1);


            // sessionStorage.setItem('img', JSON.stringify(img1));
            let formData = new FormData();
            formData.append('file', img1);
            $.ajax({
                type: "post",
                url: `${api}/index/api/uploadFile`,
                data: formData,
                processData: false,
                async: false,
                contentType: false,
                dataType:"json",
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
        }
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
                process_id: this.process_id,
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