/**
* @Date: 2016/10/11  0011  17:07
* @Author: lxbin
* Created with JetBrains WebStorm.
*/
<template>
    <header class="app-header">
        <div class="left-btn"><slot name="left-btn"></slot></div>
        <slot name="header-title" class="header-title">IM</slot>
        <div class="right-btn"><slot name="right-btn"></slot></div>
    </header>
</template>
<script>
    export default{
        name: 'pageHeader',
        props: []
    }
</script>
<style lang="scss" scoped>
    @import "../../assets/css/variable.scss";

    .app-header {
        position: relative;
        height: $headerHeight;
        background-color: #333;
        color: #ffffff;
        text-align: center;
        line-height: $headerHeight;
    }

    .left-btn {
        position: absolute;
        left: 0;
        top: 0;
        bottom: 0;
        min-width: $headerHeight;
        text-align: center;
    }

    .right-btn {
        position: absolute;
        right: 0;
        top: 0;
        bottom: 0;
        min-width: $headerHeight;
        text-align: center;
    }
</style>
