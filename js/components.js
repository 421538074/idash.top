//返回键
const backButton = {
    name: 'cp-back',
    template: `
        <button class="cp-back" @click="goBack"></button>
    `,
    methods: {
        goBack() {
            history.go(-1);
        }
    }
};

//tab页
const tabBar = {
    name: 'cp-tabbar',
    props: ['bar-list'],
    template: `
        <ul class="cp-tabbar">
            <li v-for="(item,index) in barList" v-cloak :key="item.id" @click="switchTab(index,item.id)" :class="{'cp-tabbar-item':true,active:index == currentIndex}"> {{item.name}} </li>
        </ul>
    `,
    data() {
        return {
            currentIndex: 0
        }
    },
    methods: {
        switchTab (index,id) {
            if(index != this.currentIndex) {
                this.currentIndex = index;
                this.$emit('get-list',id);
            }
        }
    }
}
//列表
const itemList = {
    name:'cp-itemlist',
    props:['item-list','icon'],
    template:`
        <ul class="cp-list">
            <li @click="getDetail(item.id,$event)" v-for="(item,index) in itemList" class="cp-list-item arrow-right">
                <img :src="icon" class="item-icon"/>
                <p class="item-title">{{item.title}}</p>
            </li>
        </ul>
    `,
    data() {
        return {
            tempList:this.itemList
        }
    },
    methods: {
        getDetail(itemId) {
            
        }
    },
    watch: {
        tempList() {
            this.$emit('scroll-to-top',document.querySelector('.cp-list'));
        }
    },
}




























































//===================================other functoin=====================================
/**
 * 滚动到顶部方法
 */
function scrollToTop(e) {
    const scrollTop = e.scrollTop;
    const interval = setInterval(function(){
        if (e.scrollTop <= 0) {
            clearInterval(interval);
            return;
        }
        e.scrollTop -= scrollTop / 5;
    }, 20);
}