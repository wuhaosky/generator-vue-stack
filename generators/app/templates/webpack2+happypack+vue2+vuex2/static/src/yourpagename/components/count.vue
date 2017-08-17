<template>
<div class="count">
    <h2>{{ "count:" + data.count }}</h2>
    <button @click="add">Increment async</button>
    <button @click="sub">Decrement async</button>
</div>
</template>

<script>
export default {
    name: 'count',
    data() {
        return {

        }
    },
    props: {
        data: {}
    },
    methods: {
        add() {
            this.$store.dispatch('increment');
        },
        sub() {
            this.$store.dispatch('decrement');
        }
    }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less" rel="stylesheet/less">
h1,
h2 {
    font-weight: normal;
}
</style>
