<template>
<div class="app">
    <transition name="fade" mode="out-in">
        <!-- 路由出口 -->
        <!-- 路由匹配到的组件将渲染在这里 -->
        <router-view></router-view>
    </transition>
</div>
</template>

<script>

export default {
    name: 'app',
    components: {
    },
    data() {
        return {

        }
    },
    props: {
        data: {}
    },
    mounted() {
        this.$store.dispatch('fetchData');
    },
    methods: {

    },
    computed: {

    }
}
</script>

<style scoped lang="less" rel="stylesheet/less">
.app{

}
</style>
