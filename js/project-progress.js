const vm = new Vue({
    el:'#app',
    data() {
        return {
            percentList:['100%','100%','90%','75%','10%','5%','0%','20%']
        }
    },
    methods: {
        
    },
    components:{
        [cylindricalGraph.name]:cylindricalGraph
    }
});