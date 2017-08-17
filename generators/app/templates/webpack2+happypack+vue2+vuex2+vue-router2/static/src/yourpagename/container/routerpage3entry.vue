<template>
<div class="routerpage3entry">
    <transition name="fade" mode="out-in">
        <!-- 路由出口 -->
        <!-- 路由匹配到的组件将渲染在这里 -->
        <router-view></router-view>
    </transition>
</div>
</template>

<script>

export default {
    name: 'routerpage3entry',
    components: {
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
    }
}
</script>

<style scoped lang="less" rel="stylesheet/less">
.routerpage3entry{
    
}
</style>
