<template>
    <div class="loginWrap" v-if="accountStatus.loginDiv">
        <div class="loginDiv">
            <img class="loginLogo" src="@/assets/logo_login.png" alt="登录LOGO">
            <div class="loginHead">
                <span class="loginTitle">登录</span>
                <div class="loginClose" @click="closeLoginDiv">×</div>
            </div>
            <div class="loginCont" @keyup.enter="submitLogin">
                <input type="text" placeholder="请输入手机号码" v-model="loginInfo.id" @keyup="checkPhone">
                <input type="password" placeholder="请输入登录密码" v-model="loginInfo.password"  @keyup="checkPwd">
                <div class="tips" :class="{error:loginTips.error_status}">{{loginTips.error_tips}}</div>
                <button class="submitBtn" :disabled="loginTips.submit_status" @click="submitLogin">{{loginTips.submit_text}}</button>
            </div>
            <div class="loginFoot">
                <span>没有账号？</span>
                <span class="toRegister" @click="jumpTo('registerDiv')">朕要注册</span>
                <span class="forgetPw" @click="jumpTo('forgetDiv')">忘记密码</span>
            </div>
        </div>
    </div>
</template>

<script>

import validate from "@/utils/validate";
import storageUtil from '@/utils/storage';

export default {
  data () {
    return {
        loginInfo: {
            id: '',
            password: ''
        },
        loginTips: {
            error_status: false,
            error_text: '欢迎登录FEN！',
            error_tips: '欢迎登录FEN！',
            submit_text: '立即登录',
            submit_status: false
        },
    }
  },
  methods: {
        // 关闭当前
        closeLoginDiv() {
            this.$store.commit('accountPanel',{
                name: 'loginDiv',
                status: false
            });
            this.loginTips.error_status = false;
            this.loginTips.error_tips = this.loginTips.error_text;
            this.loginInfo.id = this.loginInfo.password = '';
        },
        // 跳转方法
        jumpTo(place){
            this.closeLoginDiv();
            this.$store.commit('accountPanel',{
                name: place,
                status: true
            });
        },

        // 检测方法
        checkPwd: function () {
            let result = validate.checkLength(this.loginInfo.password, 6, 16, '密码');
            if( !result.status ){
                if( result.type == -1 ){
                    this.loginTips.error_tips = result.msg;
                }else if ( result.type == 1 ){
                    this.loginTips.error_tips = "密码是必须的哦！";
                }
                this.loginTips.error_status = true;
                return false;
            }
            this.loginTips.error_status = false;
            this.loginTips.error_tips = this.loginTips.error_text;
            return true;
        },
        checkPhone: function () {
            let result = validate.checkPhone(this.loginInfo.id);
            if( !result.status ){
                this.loginTips.error_tips = result.msg;
                this.loginTips.error_status = true;
                return false;
            }
            this.loginTips.error_status = false;
            this.loginTips.error_tips = this.loginTips.error_text;
            return true;
        },

        // 提交信息
        submitLogin(){
            if(this.checkPhone() && this.checkPwd()){
                this.loginTips.submit_text="拼命登陆ing...";
                this.loginTips.submit_status=true;
                this.$ajax(this.$service.AccountLogin, this.loginInfo)
                .then((response)=>{
                    let data = response.data;
                    if( data.code == 0 ){
                        this.loginTips.error_tips = this.loginTips.error_text;
                        this.loginTips.error_status = false;
                        this.submitSuccess(data.data);
                    }else if ( data.code == -1 ){
                        this.loginTips.error_tips = data.msg;
                        this.loginTips.error_status = true;
                    }
                    this.loginTips.submit_text="立即登录"
                    this.loginTips.submit_status=false;
                }).catch((err, errInfo)=>{
                    this.loginTips.error_tips = '网络请求错误';
                    this.loginTips.error_status = true;
                    this.loginTips.submit_text="立即登录"
                    this.loginTips.submit_status=false;
                })
            }
        },
        submitSuccess(data){
            // 设置全局信息
            this.$store.commit('setUserInfo', data);
            // 存储本地Token
            storageUtil.setUserInfo(data);
            // 关闭登录框
            this.closeLoginDiv();
        }
  },
  computed: {
      accountStatus(){
          return this.$store.state.accountStatus;
      }
  },
  mounted(){
      
  }
}
</script>
 
 
<style scoped>
    .loginWrap{
        width: 100%;
        height: 100%;
        position: fixed;
        top: 0;left: 0;
        z-index: 999;
        background-color: rgba(0, 0, 0, .7);
    }
    .loginDiv{
        width: 320px;
        height: 320px;
        padding: 10px 0;
        position: absolute;
        top: 0;bottom: 0;left: 0;right: 0;
        margin: auto;
        background: #fff;
        border-radius: 6px;
    }
    .loginLogo{
        display: block;
        width:100px;
        height: auto;
        position: absolute;
        left: 0;right: 0;
        top: -95px;
        margin: auto;
    }
    .loginHead{
        box-sizing: border-box;
        width: 100%;
        height: 50px;
        line-height: 50px;
        padding: 0 20px;
        margin-bottom: 20px;
    }
    .loginTitle{
        font-size: 18px;
        font-weight: 600;
        color: #3c3c3c;
    }
    /* 关闭按钮 */
    .loginClose{
        width: 30px;
        height: 30px;
        text-align: center;
        font-size: 25px;
        float: right;
        cursor: pointer;
        color: #3c3c3c;
    }
    .loginClose:hover{
        color: crimson;
    }
    /* 登录页表单样式 */
    .loginCont .tips{
        width: 86%;
        box-sizing: border-box;
        padding: 10px;
        margin: 0 auto;
        font-size: 14px;
        color:#307B8A;
        line-height: 20px;
    }
    .loginCont .error{
        color:tomato;
    }
    .loginCont input[type=password], input[type=text]{
        padding: 10px;
        width: 86%;
        border-radius: 2px;
        outline: none;
        box-sizing: border-box;
        display: block;
        margin: 15px auto;
        outline: none;
        border: 1px solid #e9e9e9;
    }
    .loginCont input[type=password]:focus,input[type=text]:focus{
        border-color: #307B8A;
    }
    .loginCont .submitBtn{
        display: block;
        box-sizing: border-box;
        margin: 15px auto;
        text-align: center;
        width: 86%;
        padding: 10px;
        cursor: pointer;
        color: #fff;
        outline: none;
        border: none;
        border-radius: 2px;
        background: #307B8A;
    }
    /* 登录页底部提示 */
    .loginFoot{
        box-sizing: border-box;
        width: 86%;
        padding: 10px;
        margin: 0 auto;
    }
    .loginFoot span{
        color: #757575;
        font-size: 14px;
    }
    .loginFoot .toRegister, .loginFoot .forgetPw{
        cursor: pointer;
        color: #307B8A;
    }
    .loginFoot .forgetPw{
        float: right;
    }
</style>