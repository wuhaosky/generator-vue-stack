<template>
<div class="corepage">
    <page-title title="主页面"></page-title>
    <div class="router-btn" v-on:click="onRouterPage1BtnClick">路由页面1</div>
    <div class="router-btn" v-on:click="onRouterPage2BtnClick">路由页面2</div>
    <div class="router-btn" v-on:click="onRouterPage3BtnClick">路由页面3</div>
</div>
</template>

<script>
import PageTitle from '../components/page-title.vue'
export default {
    name: 'corepage',
    components: {
        PageTitle
    },
    data() {
        return {

        }
    },
    props: {
        data: {}
    },
    mounted() {
    },
    methods: {
        onRouterPage1BtnClick(){
            this.$router.push({ name: 'routerpage1'});
        },
        onRouterPage2BtnClick(){
            this.$router.push({ name: 'routerpage2'});
        },
        onRouterPage3BtnClick(){
            this.$router.push({ name: 'routerpage3'});
        }
    },
    computed: {

    }
}
</script>

<style scoped lang="less" rel="stylesheet/less">
.corepage{

}
</style>
