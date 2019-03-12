"use strict";

var xm = new Vue({
  el: "#app",
  data: {
    create_at: '',
    program_id: '',
    backlog_id: '',
    titleList: [],
    imgUrl: "",
    arr: [{}, {}, {}]
  },
  methods: {
    goback: function goback() {
      window.history.back();
    },
    add_img: function add_img(event) {
      this.program_id = getUrlKey('program_id');
      this.backlog_id = getUrlKey('backlog_id');
      var that = this;
      var img1 = event.target.files[0];
      console.log(img1);
      console.log(img1.name)
      // var type = img1.type; //文件的类型，判断是否是图片

      // var size = img1.size; //文件的大小，判断图片的大小
      // if (this.imgData.accept.indexOf(type) == -1) {
      //     alert('请选择我们支持的图片格式！');
      //     return false;
      // }

      // if (size > 3145728) {
      //   alert('请选择3M以内的图片！');
      //   return false;
      // }

      var formData = new FormData();
      formData.append('file', img1);
      $.ajax({
        type: "post",
        url: "".concat(api, "/index/api/uploadFile"),
        data: formData,
        processData: false,
        async: false,
        contentType: false,
        dataType: "json",
        success: function success(res) {
          console.log(res);
          sessionStorage.setItem('img', res.data);
          sessionStorage.setItem('imgName', img1.name);
          window.location.href = "upfile.html?backlog_id=".concat(that.backlog_id);
        },
        error: function error(res) {
          console.log(res);
        }
      });
    },
    upChange: function upChange(event) {
      $(event.target).find('input.invisible').click();
    },
    downloadCodeImg(title,url) {
      // var img = this.titleList;
      // var codeIMG = img[index].data_url;
      // console.log(codeIMG);

      // if (codeIMG == "") {
      //   alert("暂无文件");
      // } else {
      //   var a = document.createElement('a');
      //   a.download = name || 'pic'; // 设置图片地址

      //   a.href = "".concat(api).concat(codeIMG);
      //   console.log(a);
      //   a.click();
      // }
      getDownload(api+url.substring(1),title);
    }
  },
  filters: {
    filterTime: function filterTime(time) {
      var date = new Date(time * 1000);
      return date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + date.getDate();
    }
  },
  created: function created() {
    this.program_id = getUrlKey('program_id');
    this.backlog_id = getUrlKey('backlog_id');
    var that = this;
    $.ajax({
      type: "post",
      url: "".concat(api, "/index/api/file_list"),
      async: true,
      data: {
        program_id: this.program_id,
        backlog_id: this.backlog_id
      },
      dataType: 'json',
      success: function success(res) {
        console.log(res);
        that.titleList = res.data;
      }
    });
  }
});