<template>
    <div id="app">
        <div class="person-mess">
            <span class="iconfont icontouxiang"></span>
            <span class="login-but" v-if="!username" @click="toLogin">登录</span>
            <span  v-if="username">欢迎您，{{username}}</span>
            <span class="iconfont iconzhuxiao" v-if="username" @click="handLogout"></span>
            <div class="title">法律宣传</div>
        </div>

        <router-view></router-view>

        <div class="footer-copyright">© 2004-2019 All Rights Reserved. 法律宣传 版权所有</div>
    </div>
</template>

<script>
import store from './store'
import * as types from './store/type'
export default {
    data() {
        return {
        }
    },

    methods : {
        toLogin() {
            this.$router.push({path:'/login'})
        },
        handLogout() {
            this.$store.commit(types.LOGOUT)
        }
    },

    mounted() {
        this.$router.push({path:'/'})
    },

    computed : {
        username() {
            return store.state.user.username
        }
    }
}
</script>

<style lang="scss" scoped>
#app{
    width: 80%;
    margin: 0 auto;
    margin-top: 5px;
    border-radius: 4px;
}
.footer-copyright{
    width: 80%;
    text-align: center;
    line-height: 40px;
    position: fixed;
    bottom: 0;
    color: #8d8d8d;
    font-size: 14px;
    background-color: #fff;
    border-radius: 4px;
}
.person-mess{
    position: relative;
    font-size: 16px;
    cursor: pointer;
    height: 60px;
    background-color: #fff;
    line-height: 60px;
    text-align: right;
    color: #333;
    padding: 0 20px;
    margin-bottom: 10px;
}
.title{
    position: absolute;
    top: 0;
    left: 48%;
    font-size: 25px;
    color: #c9231d;
}
.iconzhuxiao{
    margin-left: 10px;
    color: #c9231d;
    font-size: 18px;
    font-weight: bold;
}
.login-but:hover{
    color: #409eff;
}
</style>

<style>
a{
    text-decoration: none;
}
body{
    background-color: #f1f4f5;
}
*{
    margin: 0;
    padding: 0;
}
</style>


