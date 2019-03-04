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
        switchTab(index, id) {
            if (index != this.currentIndex) {
                this.currentIndex = index;
                this.$emit('get-list', id);
            }
        }
    }
}


//列表
const itemList = {
    name: 'cp-itemlist',
    props: ['item-list', 'icon'],
    template: `
        <ul class="cp-list">
            <li @click="getDetail(item.id,$event)" v-for="(item,index) in itemList" class="cp-list-item arrow-right">
                <img :src="icon" class="item-icon"/>
                <p v-cloak class="item-title">{{item.title}}</p>
            </li>
        </ul>
    `,
    data() {
        return {
            tempList: this.itemList
        }
    },
    methods: {
        getDetail(itemId) {

        }
    },
    watch: {
        tempList() {
            this.$emit('scroll-to-top', document.querySelector('.cp-list'));
        }
    },
}

//柱形图
const cylindricalGraph = {
    name: 'cp-cylind',
    props: ['percentList'],
    template: `
        <div class="cp-cylind">
            <span class="cp-cylind-per-top">100%</span>
            <div class="cp-cylind-bottom">
                <div v-for="n in 7" class="cp-cylind-bottom-thumb"></div>
            </div>
            <div class="cp-cylind-chart-group">
                <div v-for="item in percentList" class="cp-cylind-chart-item" :style="item | filterHeight">
                    <span v-cloak class="cp-cylind-chart-item-percent" :class="{'not-full':parseInt(item) < 100}">{{item}}</span>
                </div>
            </div>
            <div class="cp-cylind-left">
                <div v-for="n in 5" class="cp-cylind-left-thumb"></div>
            </div>
            <div class="cp-cylind-category-group">  
                <p class="cp-cylind-item" v-for="item in showList" v-cloak>{{item}}</p>
            </div>
            <span class="cp-cylind-per-bottom">0%</span>
        </div>
    `,
    data() {
        return {
            showList: ['需求', '原型', '设计', '前端', '后台', '测试', '验收']
        }
    },
    filters: {
        filterHeight(chartHeight) {
            if (chartHeight == '0%') {
                chartHeight = '2%';
            }
            return {
                height: `${chartHeight}`
            }
        }
    }
}





// 进度条
const projectBar = {
    name: 'cy-bar',
    props: ['num'],
    template: `
    <div class="content_bot">
        <div class="content_pre" v-for="item in num">
            <div class="content_bar"  :style="item | filterWidth"></div>
            <span>{{item}}</span>
        </div> 
    </div>
    `,
    data() {
        return {}
    },
    filters: {
        filterWidth(chartWidth) {
            if (chartWidth == '0%') {
                chartWidth = '2%';
            }
            return {
                width: `${chartWidth}`
            }
        }
    }
}


// indexList 
const Bar = {
    name: 'cy-bar',
    props: ['bar'],
    template: `
    <div class="process_wrap">
        <div class="process" v-for="item in bar">
            <div class="bar"  :style="item | filterWidth"></div>
            <span class="per">{{item}}</span>
        </div> 
    </div>
    `,
    data() {
        return {}
    },
    filters: {
        filterWidth(chartWidth) {
            if (chartWidth == '0%') {
                chartWidth = '2%';
            }
            return {
                width: `${chartWidth}`
            }
        }
    }
}



























































//===================================other functoin=====================================
/**
 * 滚动到顶部方法
 */
function scrollToTop(e) {
    const scrollTop = e.scrollTop;
    const interval = setInterval(function () {
        if (e.scrollTop <= 0) {
            clearInterval(interval);
            return;
        }
        e.scrollTop -= scrollTop / 5;
    }, 20);
}