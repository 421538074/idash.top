var xm =new Vue({
    el:"#app",
    data:{
        list:[
            {},
            {},
            {},
            {},
        ]
    },
    methods:{
        goback(){
            window.history.back()
        },
        loadChange(){
            window.location.href="upfile.html"
        }
    },
    
})