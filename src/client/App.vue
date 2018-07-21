<template>
    <div id="app">
        <router-view/>
    </div>
</template>

<script>
import qs from 'qs';
import normalize from 'normalize.css'
import storageUtil from '@/utils/storage';
export default {
    name: 'App',
    methods: {
        checkLoginStatus(){
            // 本地含有sessionStorage时，刷新页面时同步数据
            let UserInfo = sessionStorage.getItem('user_info');
            let RefreshToken = localStorage.getItem('refresh_token');
            if( UserInfo && RefreshToken ){
                let UserData = qs.parse(UserInfo);
                this.$store.commit('setUserInfo', UserData);
                return;
            }
    
            // 本地无sessionStorage时，若含有refresh，则进行请求，同步数据
            if( !UserInfo && RefreshToken ){
                this.$axios.defaults.headers.refresh_token=RefreshToken;
                this.$ajax(this.$service.AccountRefresh)
                .then(response=>{
                    let data = response.data;
                    if( data.code == 0 ){
                        this.$store.commit('setUserInfo', data.data);
                        storageUtil.setUserInfo(data.data);
                    }else if(  data.code == -1 ){
                        storageUtil.clearUserInfo();
                    }
                })
                .catch(error=>{
                    throw new Error('【Refresh Token】')
                });
                return;
            }

            if( UserInfo && !RefreshToken ){
                storageUtil.clearUserInfo();
                return;
            }
        },
    },
    mounted(){
        this.checkLoginStatus();
    }
}
</script>

<style>
    body, a{
        color: #595959;
        font-family: 'Chinese Quote',-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,'PingFang SC','Hiragino Sans GB','Microsoft YaHei','Helvetica Neue',Helvetica,Arial,sans-serif;
    }
    #app{
        background: #fafafa;
    }
    .contentLayout{
        width: 100%;
    }
    .content{
        width: 1200px;
        min-height: calc(100vh - 50px - 50px);
        margin: 0 auto;
    }
    /* 选区设置 */
    ::selection {
        background: rgba(27,162,227,.2);
        color: inherit;
    }
    /* 滚动条设置 */
    ::-webkit-scrollbar {
        width: 10px;
        height: 10px;
    }

    ::-webkit-scrollbar-button {
        width: 0;
        height: 0;
    }

    ::-webkit-scrollbar-button:start:increment, ::-webkit-scrollbar-button:end:decrement {
        display: none;
    }

    ::-webkit-scrollbar-corner {
        display: block;
    }

    ::-webkit-scrollbar-thumb {
        border-radius: 8px;
        background-color: rgba(0, 0, 0, 0.2);
    }

    ::-webkit-scrollbar-thumb:hover {
        background-color: rgba(0, 0, 0, 0.3);
    }

    ::-webkit-scrollbar-track, ::-webkit-scrollbar-thumb {
        border-right: 1px solid transparent;
        border-left: 1px solid transparent;
    }

    ::-webkit-scrollbar-button:start {
        width: 10px;
        height: 10px;
        background: url(./assets/scrollbar_arrow.png) no-repeat 0 0;
    }

    ::-webkit-scrollbar-button:start:hover {
        background: url(./assets/scrollbar_arrow.png) no-repeat -15px 0;
    }

    ::-webkit-scrollbar-button:start:active {
        background: url(./assets/scrollbar_arrow.png) no-repeat -30px 0;
    }

    ::-webkit-scrollbar-button:end {
        width: 10px;
        height: 10px;
        background: url(./assets/scrollbar_arrow.png) no-repeat 0 -18px;
    }

    ::-webkit-scrollbar-button:end:hover {
        background: url(./assets/scrollbar_arrow.png) no-repeat -15px -18px;
    }

    ::-webkit-scrollbar-button:end:active {
        background: url(./assets/scrollbar_arrow.png) no-repeat -30px -18px;
    }
</style>
