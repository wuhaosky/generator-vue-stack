<template>
<div class="page-title">{{title}}</div>
</template>

<script>
export default {
    name: 'page-title',
    props: ['title']
}
</script>

<style scoped lang="less" rel="stylesheet/less">
.page-title{
    text-align: center;
    width: 100%;
}
</style>