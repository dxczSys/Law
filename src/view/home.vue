<template>
    <div class="wrapper">
        <div class="nav-wrapper">
            <el-menu :default-active="index" class="el-menu-vertical-demo"  background-color="#545c64" text-color="#fff" active-text-color="#ffd04b">
                <el-menu-item index="1" @click="index = '1'" v-if="username == 'admin'">
                    <i class="iconfont icontouxiang"></i>
                    <span slot="title">用户管理</span>
                </el-menu-item>
                <el-menu-item index="2" @click="index = '2'">
                    <i class="iconfont iconwenxianbianmu"></i>
                    <span slot="title">文献</span>
                </el-menu-item>
                <el-menu-item index="3" @click="index = '3'">
                    <i class="iconfont iconshipin"></i>
                    <span slot="title">视频</span>
                </el-menu-item>
                <el-menu-item index="4" @click="index = '4'">
                    <i class="iconfont icontuwenguanli"></i>
                    <span slot="title">图文</span>
                </el-menu-item>
            </el-menu>
        </div>
        <div class="home-content">
            <userTable v-if="index == '1'"></userTable>
            <fileList v-else :indexN="index"></fileList>
        </div>
    </div>
</template>

<script>
import userTable from './user.vue'
import fileList from './fileList.vue'

export default {
    components : { userTable, fileList },
    data() {
        return {
            index : '2',
            username : '',
        }
    },
    mounted() {
        this.username = this.$cookie.get('username')
    },
}
</script>

<style lang="scss" scoped>
.wrapper{
    display: flex;
    width: 1190px;
    margin: 0 auto;
}
.nav-wrapper{
    width: 200px;
    flex-shrink: 0;
}
.home-content{
    flex-grow: 1;
    padding-left: 10px;
}
</style>


