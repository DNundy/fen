<template>
    <div class="headerLayout">
        <div class="header">
            <router-link class="headerLogo" to="/"><img src="@/assets/logo.png"></router-link>
            <el-input class="headerSearch" size='small' placeholder="输入想搜索的内容 . . ." prefix-icon="el-icon-search"></el-input>
            <div class="headerNav">
                <router-link to="" :class="nav.active===0?'active':''">首页</router-link>
                <router-link to="" :class="nav.active===1?'active':''">发现</router-link>
                <router-link to="" :class="nav.active===2?'active':''">纳新</router-link>
                <router-link to="" :class="nav.active===3?'active':''">反馈</router-link>
            </div>
            <div class="headerOpt">
                <span v-if="!accountStatus.loginStatus" class="loginTip">
                    <span class="goLogin" @click="jumpTo('loginDiv')">登录</span>
                    <span class="goRegister" @click="jumpTo('registerDiv')">&nbsp;&nbsp;注册</span>
                </span>
                <div v-else class="optCont">
                    <el-popover class="userAnother" placement="bottom" trigger="hover">
                        <div class="optButton" slot="reference">
                            <i class="el-icon-plus"></i>
                        </div>
                        <div class="optList">
                            <div class="linkHover"><i class="el-icon-service"></i>&nbsp;&nbsp;新建文档</div>
                        </div>
                    </el-popover>
                    <div class="userNotice">
                        <i class="el-icon-bell"></i>
                    </div>
                    <el-popover class="userInfo" placement="bottom" trigger="hover">
                        <div class="optButton" slot="reference">
                            <img src="@/assets/pic_boy.png">
                            <i class="el-icon-caret-bottom"></i>
                        </div>
                        <div class="optList">
                            <div class="optListGroup borderBottom">
                                <div>{{userInfo.a_name}}</div>
                            </div>
                            <div class="optListGroup borderBottom">
                                <div><router-link to="/personal" class="linkHover"><i class="el-icon-service"></i>&nbsp;&nbsp;个人主页</router-link></div>
                                <div><router-link to="/collect" class="linkHover"><i class="el-icon-star-off"></i>&nbsp;&nbsp;我的收藏</router-link></div>
                            </div>
                            <div class="optListGroup">
                                <div class="linkHover"><i class="el-icon-setting"></i>&nbsp;&nbsp;设置</div>
                                <div class="linkHover"  @click="loginOut"><i class="el-icon-sort"></i>&nbsp;&nbsp;退出</div>
                            </div>
                        </div>
                    </el-popover>
                </div>
            </div>
            <user-login></user-login>
            <user-register></user-register>
            <user-forget></user-forget>
        </div>
    </div>
</template>

<script>

import UserLogin from '../common/UserLogin'
import UserRegister from '../common/UserRegister'
import UserForget from '../common/UserForget'
import storageUtil from '@/utils/storage';

export default {
    data () {
        return {}
    },
    methods:{
        jumpTo(place){
            this.$store.commit('accountPanel',{
                name: place,
                status: true
            });
        },
        loginOut(){
            this.$store.commit('clearUserInfo');
            storageUtil.clearUserInfo();
        }
    },
    components: {
        UserLogin,
        UserRegister,
        UserForget
    },
    computed: {
        userInfo: function (params) {
            return this.$store.state.userInfo;
        },
        accountStatus: function (params) {
            return this.$store.state.accountStatus;
        },
        nav: function (params) {
            return this.$store.state.nav;
        }
    }
}
</script>

<style scoped>
    .headerLayout{
        width: 100%;
        height: 50px;
        background: #fff;
        box-shadow: 0 1px 2px 0 rgba(0,0,0,.06);
        text-decoration: none;
    }
    .header{
        width: 1200px;
        height: 50px;
        margin: 0 auto;
        overflow: hidden;
        position: relative;
    }
    /* header logo */
    .headerLogo img{
        width: 28px;
        position: absolute;
        top: 0;bottom: 0;left: 0;
        margin: auto 0;
    }
    /* header serarch */
    .headerSearch{
        display: inline-block;
        width: 25%;
        height: 50px;
        margin-left: 70px;
        line-height: 50px;
    }
    /* header nav */
    .headerNav{
        display: inline-block;
        width: 500px;
        height: 50px;
        vertical-align: top;
    }
    .headerNav .active{
        color: #08B35F;
    }
    .headerNav a{
        display: block;
        float: left;
        position: relative;
        margin: 0 20px;
        
        width: 60px;
        height: 49px;
        
        font-size: 14px;
        line-height: 49px;
        text-align: center;
        text-decoration: none;
    }
    .headerNav a:after{
        content: "";
        width: 0;
        height: 1px;
        background: #08B35F;
        position: absolute;
        top: 100%;
        left: 50%;
        transition: all .3s;
    }
    .headerNav a:hover:after{
        left: 0%;
        width: 100%;
    }
    /* header option */
    .headerOpt{
        float: right;
        width: 140px;
        height: 50px;
        text-align: center;
        overflow: hidden;
    }
    .headerOpt .loginTip{
        font-size: 16px;
        line-height: 50px;
        color: #08B35F;
        cursor: pointer;
    }
    .headerOpt .optCont{
        display: flex;
        display: -webkit-flex;
        justify-content: space-between;
        width: 100%;
        height: 50px;
        line-height: 50px;
        border: #08B35F 1px;
    }
    /* 用户功能列表 */
    .optCont div{
        width: 35px;
        cursor: pointer;
        font-size: 17px;
        line-height: 50px;
    }
    /* 用户个人内容 */
    .userInfo{
        width: 50px;
        margin-left: 5px;
        position: relative;
    }
    .userInfo div{
        height: 50px;
    }
    .userInfo img{
        width: 30px;
        position: absolute;
        left: 0;top: 0;bottom: 0;
        margin: auto 0;
    }
    .userInfo i{
        position: absolute;
        right: 0;
        line-height: 50px;
    }
    .userInfo i::before{
        color: #aaa;
        font-size: 12px;
    }
    .optListGroup div{
        line-height: 45px;
    }
    .linkHover:hover{
        cursor: pointer;
        color:mediumseagreen;
    }
    .borderBottom{
        border-bottom: 1px solid #eee;
    }
</style>