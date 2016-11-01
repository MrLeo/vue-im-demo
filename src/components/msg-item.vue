<template>
    <section :class="type">
        <header>
            <!--<time>{{getSendTime}}</time>&nbsp;&nbsp;-->
            <timeago :since="msg.sendtime" :auto-update="10"></timeago>
            <span>{{msg.from.userName}}</span>
        </header>
        <div class="bubble" v-if="msg.msgType=='img'"><img class="preview" :src="msg.content" alt="preview"/></div>
        <div class="bubble" v-else>{{msg.content}}</div>
    </section>
</template>
<script>
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
        line-height: .9rem;
    }

    .bubble {
        position: relative;
        padding: 5px 10px;
        display: inline-block;
        border-radius: 5px;
        color: #ffffff;
        max-width: 100%;
        word-break: break-all;
    }

    .me .bubble {
        background-color: #b2b2b2;
    }

    .other .bubble {
        background-color: forestgreen;
    }

    .me .bubble::after,
    .other .bubble::before {
        content: '';
        position: absolute;
        top: 15px;
        display: block;
        width: 0;
        height: 0;
        border-top: 5px dashed transparent;
        border-bottom: 5px dashed transparent;
    }

    .me .bubble::after {
        right: -5px;
        border-left: 5px solid #b2b2b2;
    }

    .other .bubble::before {
        left: -5px;
        border-right: 5px solid forestgreen;
    }
</style>
