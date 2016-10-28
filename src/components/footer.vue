<template>
    <footer class="mainmenu">
        <ul>
            <router-link :to="{name: 'index'}" tag="li" active-class="hover">
                <em></em>
                <p>首页</p>
            </router-link>
            <li>
                <a href="discount.html">
                    <em></em>
                    <p>特惠</p>
                </a>
            </li>
            <li>
                <a href="news.html">
                    <em></em>
                    <p>快讯</p>
                </a>
            </li>
            <li>
                <a href="account-index.html">
                    <em></em>
                    <p>我的</p>
                </a>
            </li>
        </ul>
    </footer>
</template>
<script>
    export default{
        name: 'footer',
        props: [],
        data(){
            return {}
        }
    }
</script>
<style scoped>
    .mainmenu ul li.hover {
        color: #fb4a46;
    }
</style>
