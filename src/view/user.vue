<template>
    <div class="user-wrapper">
        <div class="table-box">
             <el-table :data="tableData" border style="width: 100%">
                <el-table-column type="index" width="50" header-align="center" align="center"></el-table-column>
                <el-table-column prop="uname" label="用户名" min-width="150" header-align="center" align="center"></el-table-column>
                <el-table-column prop="upasswd" label="密码" width="200" header-align="center" align="center"></el-table-column>
                <el-table-column prop="uemail" label="邮箱" width="250" header-align="center" align="center"></el-table-column>
                <el-table-column label="操作" width="100" header-align="center" align="center">
                    <template slot-scope="scope">
                        <el-button @click="handDelete(scope)" type="danger" size="small">移除</el-button>
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
    mounted() {
    	this.getTableData()
    },
    methods : {
        handDelete(item) {
        	debugger
        	this.$axios({
        		method : 'get',
        		url : '/Law/userDel?id=' + item.row.uid,
        	}).then(res => {
        		if (res.data.code) {
        			this.getTableData()
        			this.$message('删除成功！')
        		}
        	})
        },
        
        getTableData() {
        	this.$axios({
        		method : 'post',
        		url : '/Law/userSel'
        	}).then(res => {
        		this.tableData = res.data
        	})
        }
    }
}
</script>

<style lang="scss" scoped>

</style>


