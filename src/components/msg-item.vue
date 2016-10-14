<template>
    <section :class="type">
        <header>
            <!--<time>{{getSendTime}}</time>&nbsp;&nbsp;-->
            <timeago :since="msg.sendtime" :auto-update="10"></timeago>
            <span>{{msg.from.userName}}</span>
        </header>
        <div>{{msg.content}}</div>
    </section>
</template>
<script>
    import date from 'utils/convert/date'
    export default{
        name: 'msg-item',
        props: ['type', 'msg']
    }
</script>
<style scoped>
    .me {
        text-align: right;
    }

    .other {
        text-align: left;
    }

    section {
        margin: 10px;
    }

    section header {
        font-size: .5rem !important;
        color: #ccc;
    }
</style>
