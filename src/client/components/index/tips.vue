<template>
    <div class="indexWrap">
        <user-header></user-header>
        <div class="contentLayout">
            <div class="content"></div>
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

</style>