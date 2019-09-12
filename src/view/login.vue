<template>
    <div class="login-wrapper">
        <div class="box" v-if="show">
            <h3>欢迎登录</h3>
            <el-input v-model="username" prefix-icon="iconfont icontouxiang"></el-input>
            <el-input v-model="password" show-password prefix-icon="el-icon-s-goods"></el-input>
            <div class="login-btn">
                <el-button type="primary" size="small" @click="login">登录</el-button>
                <el-button size="small" @click="show = !show">注册</el-button>
            </div>
        </div>

        <transition name="el-zoom-in-top">
            <div class="regist-box" v-if="!show">
                <h3>用户注册</h3>
                <el-form ref="form" :model="form" label-width="80px" style="padding: 0 20px;">
                    <el-form-item label="用户帐号">
                        <el-input v-model="form.uname"></el-input>
                    </el-form-item>
                    <el-form-item label="用户密码">
                        <el-input v-model="form.upasswd" type="password"></el-input>
                    </el-form-item>
                    <el-form-item label="用户邮箱">
                        <el-input v-model="form.uemail"></el-input>
                    </el-form-item>
                </el-form>

                <div class="login-btn">
                    <el-button size="small" @click="show = !show">取消</el-button>
                    <el-button size="small" type="primary" @click="regist">提交</el-button>
                </div>
            </div>
        </transition>
    </div>
</template>

<script>
import * as types from '../store/type'
export default {
    data() {
        return {
            username : '',
            password : '',
            show : true,
            form : {
                uname : '',
                upasswd : '',
                uemail : ''
            }
        }
    },
    methods : {
        login() {
            if (this.username && this.password) {
                this.$axios({
                    method: 'post',
                    url: '/Law/userLog',
                    data : { uname : this.username, upasswd : this.password }
                }).then(res => {
                	console.log(res)
                    if (res.status == 200 && res.data.code) {
                        this.$store.commit(types.LOGIN, { username : this.username, accout : new Date().getTime() })
                        this.$router.go(-1);
                    }else {
                        this.$message.warning('用户名或密码错误');
                    }
                })
            }else {
                this.$message.warning('请填写用户名和密码！');
            }
        },
        regist() {
            this.$axios({
            	method : 'post',
            	url : '/Law/userAdd',
            	data : this.form
            }).then(res => {
            	if (res.data.code) {
            		this.$message.success('注册成功！')
            		this.show = !this.show
            	}
            })
        }
    },
    mounted() {
        this.$store.commit(types.TITLE, 'Login');
    }
}
</script>

<style lang="scss" scoped>
.login-wrapper{
    position: relative;
    background-image: url('../../static/images/login-bg.jpg');
    height: 600px;
    background-size: 100% 100%;
    width: 1190px;
    margin: 0 auto;
    
}
.box{
    width: 340px;
    background-color: #fff;
    border-radius: 4px;
    /deep/ .el-input{
        margin-bottom: 10px;
        width: 300px;
        margin-left: 20px;
    }
    position: absolute;
    left: 50%;
    margin-left: -170px;
    top: 220px;
    h3{
        text-align: center;
        color: #f70;
        padding: 15px 0;
    }
}
.regist-box{
    background-color: #fff;
    border-radius: 4px;
    /deep/ .el-input{
        margin-bottom: 10px;
        width: 300px;
        margin-left: 20px;
    }
    position: absolute;
    left: 50%;
    margin-left: -170px;
    top: 220px;
    h3{
        text-align: center;
        color: #f70;
        padding: 15px 0;
    }
}
.login-btn{
    height: 38px;
    margin: 0 19px;
    font-size: 18px;
    line-height: 38px;
    text-align: center;
    cursor: pointer;
    margin-bottom: 20px;
    border-radius: 4px;
}

</style>


