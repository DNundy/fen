<template>
    <div class="personalWrap">
        <user-header></user-header>
        <div class="contentLayout">
            <div class="content">
                <div class="personalLeft">
                    
                </div>
                <div class="personalRight">

                </div>
            </div>
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
    .personalLeft{
        width: 245px;
        background: red;
    }
    .personalRight{

    }
</style>