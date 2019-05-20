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
            <li v-for="(item,index) in barList" v-cloak :key="item.id" @click="switchTab(index,item.id)" :class="{'cp-tabbar-item':true,active:index == currentIndex}"> {{item.process}} </li>
        </ul>
    `,
    data() {
        return {
            currentIndex: 0,
        }
    },
    methods: {
        switchTab(index, id) {
            console.log(index)
            if (index != this.currentIndex) {
                this.currentIndex = index;
                this.$emit('get-list', id);
            }
        }
    },
    created() {
        if (sessionStorage.getItem('numId') == null) {
            this.currentIndex = 0
        } else {
            this.currentIndex = sessionStorage.getItem('numId')
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
            <div class="cp-cylind-chart-scroll-container">
                <div class="cp-cylind-chart-item" v-for="(item,index) in percentList">
                    <div class="cp-cylind-item-container">
                        <span class="cp-cylind-item-percent-title" :class="{'not-full':parseInt(item.percent) < 100}" v-cloak>{{item.percent+'%'}}</span>
                        <div class="cp-cylind-item-percent" :style="item.percent+'%' | filterHeight"></div>
                    </div>
                    <div class="cp-cylind-thumb"></div>
                    <div @click="goDetail(item.id,index)" class="cp-cylind-item-title" v-cloak>{{item.process}}</div>
                </div>
            </div>
            <div class="cp-cylind-left">
                <div v-for="n in 5" class="cp-cylind-left-thumb"></div>
            </div>
            <span class="cp-cylind-per-bottom">0%</span>
        </div>
    `,
    data() {
        return {

        }
    },
    methods: {
        goDetail(id, index) {
            this.$emit("go-detail", id, index)
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
        <div class="content_pre">
            <div class="content_bar"  :style="num | filterWidth"></div>
            <span>{{num}}</span>
        </div> 
    </div>
    `,
    data() {
        return {}
    },
    filters: {
        filterWidth(chartWidth) {
            if (chartWidth == '0%') {
                chartWidth = '0%';
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
        <div class="process">
            <div class="bar"  :style="bar | filterWidth"></div>
            <span class="per">{{bar}}</span>
        </div> 
    </div>
    `,
    data() {
        return {}
    },
    filters: {
        filterWidth(chartWidth) {
            if (chartWidth == '0%') {
                chartWidth = '0%';
            }
            return {
                width: `${chartWidth}`
            }
        }
    },
}



// projectDetail
const project = {
    name: 'cy-project',
    props: ['bar'],
    template: `
    <div class="project_per">
            <div class="bar"  :style="bar | filterWidth"></div>
            <span >{{bar}}</span>
    </div>
    `,
    data() {
        return {}
    },
    filters: {
        filterWidth(chartWidth) {
            if (chartWidth == '0%') {
                chartWidth = '0%';
            }
            return {
                width: `${chartWidth}`
            }
        }
    },
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