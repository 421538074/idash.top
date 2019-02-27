var xm =new Vue({
    el:"#app",
    data:{
        isName: true,
    },
    methods: {
        editNickname() {
            this.isName = false;
        },
        goback(){
            window.history.back()
        },
    },
})