<template>
    <div class="tipsWrap">
        <user-header></user-header>
        <div class="contentLayout">
            <div class="content">{{tipsInfo}}</div>
        </div>
        <user-footer></user-footer>
    </div>
</template>

<script>

import UserHeader from "./layout/UserHeader";
import UserFooter from "./layout/UserFooter";

export default {
    data () {
        return {
            tipsInfo: ''
        }
    },
    components: {
        UserHeader,
        UserFooter
    },
    methods: {
        decodeUrl() {
            this.tipsInfo = this.queryString('info')
        },
        queryString(name) {
            var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
            var result = window.location.search.substr(1).match(reg);
            if (result != null) {
                return decodeURIComponent(result[2]);
            } else {
                return;
            }
        }
    },
    mounted(){
        this.decodeUrl()
    }
}
</script>

<style scoped>

</style>