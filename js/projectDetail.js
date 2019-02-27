var xm = new Vue({
    el: "#app",
    data: {
        isshow: true,
        isfile: false,
        list: [{},
            {},
            {},
            {},
        ],
        title: [{},
            {},
            {},
            {},
        ]
    },
    methods: {
        goback(){
            window.history.back()
        },
        goRequire(){
            window.location.href="requirement.html"
        },
        upChange(){
            window.location.href="backlog.html"
        }
    },

})


$(function() {
    $(".project_banner ul li").each(function(index) {
        $(this).click(function() {
            $("li.blue").removeClass("blue"); 
            $(this).addClass("blue"); 
            // $(".tab-content div.active-txt").removeClass("active-txt");
            // $(".tab-content div").eq(index).addClass("active-txt");
        });
    })
});