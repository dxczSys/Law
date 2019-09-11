<template>
    <div class="user-wrapper">
        <div class="table-box">
             <el-table :data="tableData" border style="width: 100%">
                <el-table-column type="index" width="50" header-align="center" align="center"></el-table-column>
                <el-table-column prop="date" label="用户名" min-width="150" header-align="center" align="center"></el-table-column>
                <el-table-column prop="date" label="密码" width="200" header-align="center" align="center"></el-table-column>
                <el-table-column prop="date" label="邮箱" width="250" header-align="center" align="center"></el-table-column>
                <el-table-column label="操作" width="100" header-align="center" align="center">
                    <template slot-scope="scope">
                        <el-button @click="handDelete(scope.row)" type="danger" size="small">移除</el-button>
                    </template>
                </el-table-column>
            </el-table>
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            tableData : [],
        }
    },
    methods : {
        handDelete(id) {

        }
    }
}
</script>

<style lang="scss" scoped>

</style>


