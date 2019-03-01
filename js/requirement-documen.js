const vm = new Vue({
    el: '#app',
    data() {
        return {
            barList: [{
                    id: 0,
                    name: '需求'
                },
                {
                    id: 1,
                    name: '原型'
                },
                {
                    id: 2,
                    name: '设计'
                },
                {
                    id: 3,
                    name: '前台'
                },
                {
                    id: 4,
                    name: '后台'
                }
            ],
            itemList: [
                {
                    id: 0,
                    title: '待办事项标题'
                },
                {
                    id: 1,
                    title: '待办事项标题'
                },
                {
                    id: 2,
                    title: '待办事项标题'
                },
                {
                    id: 3,
                    title: '待办事项标题'
                },
                {
                    id: 4,
                    title: '待办事项标题'
                },
                {
                    id: 4,
                    title: '待办事项标题'
                },
                {
                    id: 4,
                    title: '待办事项标题'
                },
                {
                    id: 4,
                    title: '待办事项标题'
                },
                {
                    id: 4,
                    title: '待办事项标题'
                },
                {
                    id: 4,
                    title: '待办事项标题'
                },
                {
                    id: 4,
                    title: '待办事项标题'
                },
                {
                    id: 4,
                    title: '待办事项标题'
                },
                {
                    id: 4,
                    title: '待办事项标题'
                },
                {
                    id: 4,
                    title: '待办事项标题'
                },
                {
                    id: 4,
                    title: '待办事项标题'
                }
            ]
        }
    },
    methods: {
        getList(id) {
            this.itemList = [];
            setTimeout(() => {
                this.itemList.push({
                    id: 4,
                    title: '待办事项标题'
                });
            }, 200);
        },
        scrollEvent(e) {
            scrollToTop(e);
        }
    },
    components: {
        [backButton.name]: backButton,
        [tabBar.name]: tabBar,
        [itemList.name]: itemList
    }
});
