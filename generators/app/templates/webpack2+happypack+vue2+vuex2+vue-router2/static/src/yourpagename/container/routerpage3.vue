<template>
<div class="routerpage3">
    <page-title title="路由页面3"></page-title>
    <div class="router-btn" v-on:click="onNestedRouter1BtnClick">嵌套路由1</div>
    <div class="router-btn" v-on:click="onNestedRouter2BtnClick">嵌套路由2</div>
</div>
</template>

<script>
import PageTitle from '../components/page-title.vue'
export default {
    name: 'routerpage3',
    components: {
        PageTitle
    },
    data() {
        return {
        }
    },
    computed: {
    },
    mounted() {
    },
    methods: {
        onNestedRouter1BtnClick(){
            this.$router.push({ name: 'nestedrouter1'});
        },
        onNestedRouter2BtnClick(){
            this.$router.push({ name: 'nestedrouter2'});
        }
    }
}
</script>

<style scoped lang="less" rel="stylesheet/less">
.routerpage3{
    
}
</style>
