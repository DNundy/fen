<template>
    <div class="footerLayout">
        <div class="footer">
            <p>Copyright © 2018 FEN All Rights Reserved</p>
        </div>
    </div>
</template>

<script>
export default {
    data () {
        return {}
    }
}
</script>

<style scoped>
    .footerLayout{
        width: 100%;
        font-size: 14px;
        text-decoration: none;
    }
    .footer{
        width: 1200px;
        height: 50px;
        margin: 0 auto;
        position: relative;
    }
    .footer p{
        width: 100%;
        height: 25px;
        line-height: 25px;
        text-align: center;
        margin: auto;
        position: absolute;
        top: 0;bottom: 0;
    }
</style>