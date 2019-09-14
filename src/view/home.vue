<template>
    <div class="wrapper">
        <div class="nav-wrapper">
            <el-menu :unique-opened="true" :default-active="index" class="el-menu-vertical-demo"  background-color="#545c64" text-color="#fff" active-text-color="#ffd04b">
                <el-menu-item index="1" @click="index = '1'" v-if="username == 'admin'">
                    <i class="iconfont icontouxiang"></i>
                    <span slot="title">用户管理</span>
                </el-menu-item>
                 <el-submenu index="2" @click.native="index = '2'">
                    <template slot="title">
                        <i class="iconfont iconwenxianbianmu"></i>
                        <span slot="title">文献</span>
                    </template>
                    <el-menu-item-group>
                        <el-menu-item index="1-1" @click="year='2017'">2017</el-menu-item>
                        <el-menu-item index="1-2" @click="year='2018'">2018</el-menu-item>
                        <el-menu-item index="1-3" @click="year='2019'">2019</el-menu-item>
                        <el-menu-item index="1-4" @click="year='2020'">2020</el-menu-item>
                    </el-menu-item-group>
                </el-submenu>

                <el-submenu index="3" @click.native="index = '3'">
                    <template slot="title">
                        <i class="iconfont iconshipin"></i>
                        <span slot="title">视频</span>
                    </template>
                    <el-menu-item-group>
                        <el-menu-item index="1-1" @click="year='2017'">2017</el-menu-item>
                        <el-menu-item index="1-2" @click="year='2018'">2018</el-menu-item>
                        <el-menu-item index="1-3" @click="year='2019'">2019</el-menu-item>
                        <el-menu-item index="1-4" @click="year='2020'">2020</el-menu-item>
                    </el-menu-item-group>
                </el-submenu>

                <el-submenu index="4" @click.native="index = '4'">
                     <template slot="title">
                        <i class="iconfont icontuwenguanli"></i>
                        <span slot="title">图文</span>
                    </template>
                    <el-menu-item-group>
                        <el-menu-item index="1-1" @click="year='2017'">2017</el-menu-item>
                        <el-menu-item index="1-2" @click="year='2018'">2018</el-menu-item>
                        <el-menu-item index="1-3" @click="year='2019'">2019</el-menu-item>
                        <el-menu-item index="1-4" @click="year='2020'">2020</el-menu-item>
                    </el-menu-item-group>
                </el-submenu>
            </el-menu>
        </div>
        <div class="home-content">
            <userTable v-if="index == '1'"></userTable>
            <fileList v-else :indexN="index" :year="year"></fileList>
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
            year : '2019'
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


