<template>
    <div class="indexWrap">
        <user-header></user-header>
        <div class="content">

        </div>
        <user-footer></user-footer>
    </div>
</template>

<script>

import UserHeader from "./layout/UserHeader";
import UserFooter from "./layout/UserFooter";

export default {
    data () {
        return {}
    },
    components: {
        UserHeader,
        UserFooter
    }
}
</script>

<style scoped>
    .content{
        min-height: calc(100vh - 50px - 50px);
    }
</style>