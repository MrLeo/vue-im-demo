<template>
    <section :class="type">
        <header>
            <time>{{getSendTime}}</time>
            <span>{{msg.from.userName}}</span>
        </header>
        <div>{{msg.content}}</div>
    </section>
</template>
<script>
    import date from 'utils/convert/date'
    export default{
        name: 'msg-item',
        props: ['type', 'msg'],
        computed: {
            getSendTime(){
                return date.getLocalTime(this.msg.sendtime)
            }
        }
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
        font-size: smaller;
        color: #ccc;
    }
</style>
