<template>
    <div id="app">
        <div class="person-mess">
            <span class="iconfont icontouxiang"></span>
            <span class="login-but" v-if="!username" @click="toLogin">登录</span>
            <span  v-if="username">欢迎您，{{username}}</span>
            <span class="iconfont iconzhuxiao" v-if="username" @click="handLogout"></span>
        </div>

        <div class="title">法律宣传</div>


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
            return store.state.user.username || this.$cookie.get('username')
        }
    }
}
</script>

<style lang="scss" scoped>
#app{
    margin-top: 5px;
}
.footer-copyright{
    width: 80%;
    text-align: center;
    line-height: 36px;
    position: fixed;
    bottom: 0;
    left: 10%;
    color: #8d8d8d;
    font-size: 14px;
    background-color: #fff;
    border-radius: 4px;
}
.person-mess{
    font-size: 14px;
    cursor: pointer;
    height: 35px;
    line-height: 35px;
    background-color: #f5f5f5;
    border-bottom: 1px solid #eee;
    text-align: right;
    color: #6C6C6C;
    padding: 0 20px;
}
.title{
    width: 1190px;
    font-size: 25px;
    line-height: 40px;
    text-align: center;
    background-color: #409eff;
    color: #c9231d;
    margin: 10px auto;
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
    background-color: #fff;
}
*{
    margin: 0;
    padding: 0;
}
</style>


