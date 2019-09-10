<template>
    <div class="file-list-wrapper">
        <div class="admin-operate">
            <el-button icon="el-icon-plus" v-if="username == 'admin'" type="primary" size="small" @click="dialogVisible = true">增加</el-button>
        </div>

        <div class="file-content">
            <el-row :gutter="12">
                <el-col :span="6" v-for="(item, index) in dataList" :key="index">
                    <el-card :body-style="{ padding: '0px' }">
                        <img :src="item.path" class="image">
                        <div style="padding: 14px;">
                            <div class="file-name">{{item.name}}</div>
                            <div class="bottom clearfix">
                                <time class="time">{{item.date}}</time>
                                <el-button type="text" v-if="username == 'admin'" class="button" @click="handClickOperate(item, index, 1)">删除</el-button>
                                <el-button type="text" v-if="username == 'admin'" class="button" @click="handClickOperate(item, index, 2)">修改</el-button>
                                <el-button type="text" v-if="token" class="button" @click="handClickOperate(item, index, 3)">下载</el-button>
                                <span class="iconfont" v-if="token" :class="{'icondianzan' : !item.isIcon, 'icondianzan1' : item.isIcon }" @click="handClickLike(item, index)"><span>{{item.quantity}}</span></span>
                            </div>
                        </div>
                    </el-card>
                </el-col>
            </el-row>
        </div>

        <el-dialog :visible.sync="dialogVisible" title="新增资源">
            <el-form :model="form" label-width="100px">
                <el-form-item label="资源名称">
                    <el-input v-model="form.name"></el-input>
                </el-form-item>

                <el-form-item label="资源缩略图">
                    <el-upload class="avatar-uploader" action="http://127.0.0.1:8010/api/upload/pic" :show-file-list="false"
                        :on-success="handleAvatarSuccess" :before-upload="beforeAvatarUpload">
                        <img v-if="imageUrl" :src="imageUrl" class="avatar">
                        <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                    </el-upload>
                </el-form-item>

                <el-form-item label="资源文件">
                    <el-upload class="upload-demo" action="http://127.0.0.1:8010/api/upload/pic" :file-list="fileList" :on-success="handleFileSuccess">
                        <el-button size="small" type="primary">点击上传</el-button>
                    </el-upload>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="dialogVisible = false">取 消</el-button>
                <el-button type="primary" @click="handClickSave">确 定</el-button>
            </div>
        </el-dialog>
    </div>
</template>

<script>
export default {
    props : {
        indexN : {
            type : String,
            default : '2'
        }
    },
    data() {
        return {
            dialogVisible : false,
            form : {
                name : ''
            },
            imageUrl: '',
            fileList : [],


            dataList : [],

            token : '',
            username : '',
        }
    },

    watch : {
        indexN : {
            handler(n) {
                if (n != '1') {
                    //获取数据
                    // this.$axios.post({
                    //     url : '',
                    //     data : { num : n }
                    // }).then(res => {
                    //     if (res.code) {
                    //         this.dataList = []
                    //         this.dataList = res.msg
                    //     }
                    // })
                }
            },
            deep : true,
            immediate : true
            
        }
    },

    mounted() {
        this.token = this.$cookie.get('token')
        this.username = this.$cookie.get('username')
    },

    created() {
        this.dataList = [{
            id : '1',
            path : '../../static/images/1.jpg',
            name : '文件一',
            date : '2019-02-23',
            quantity : 20
        }, {
            id : '2',
            path : '../../static/images/2.jpg',
            name : '文件二',
            date : '2018-01-02',
            quantity : 20
        }, {
            id : '3',
            path : '../../static/images/2.jpg',
            name : '文件二',
            date : '2018-01-02',
            quantity : 20
        }, {
            id : '4',
            path : '../../static/images/2.jpg',
            name : '文件二',
            date : '2018-01-02',
            quantity : 20
        }]
    },

    methods : {

        handleAvatarSuccess(res, file) {
            this.imageUrl = URL.createObjectURL(file.raw);
        },

        handleFileSuccess(res, file) {
            if (res.code) {
                this.fileList = [res.path]
            }
        },

        beforeAvatarUpload(file) {
            const isLt2M = file.size / 1024 / 1024 < 5;
            if (!isLt2M) {
                this.$message.error('资源缩略图大小不能超过 5MB!');
            }
            return isLt2M;
        },

        //点赞
        handClickLike(item, index) {
            if (!item.isIcon) {
                item.isIcon = 1
                item.quantity ++
                let obj = this.dataList.slice(index, index + 1)
                this.dataList.splice(index, 1, ...obj)
                // this.$axios.post({
                //     url : '',
                //     data : { id : item.id}
                // }).then(res => {
                //     if (res.code) {
                        
                //     }
                // })
            }
        },

        //dialog确定
        handClickSave() {
            // this.$axios.post({
            //     url : '',
            // }).then(res => {
            //     if (res.code) {
            //         this.$message.success('添加成功')
            //         this.dialogVisible = false
            //     }
            // })
        },

        handClickOperate(item, index, num) {
            if (num == 1) {
                //删除
                this.$axios.post({
                    url : '',
                    data : { id : item.id }
                }).then(res => {
                    if (res.code) {
                        this.dataList.splice(index, 1)
                        this.$message.success('删除成功') 
                    }
                })
            }else if (num == 2) {
                //修改
                this.form.name = item.name
                this.imageUrl = item.path
                this.fileList = [{ name : 'aaaa', url : item.path }]
                this.dialogVisible = true
            }else {
                //下载
            }
        }
    },
}
</script>

<style lang="scss" scoped>
.admin-operate{
    padding: 5px;
}
.avatar-uploader{
    /deep/ .el-upload{
        border: 1px dashed #d9d9d9;
        border-radius: 6px;
        cursor: pointer;
        position: relative;
        overflow: hidden;
    }
    /deep/ .el-upload:hover {
        border-color: #409EFF;
    }
}
.avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 178px;
    height: 178px;
    line-height: 178px;
    text-align: center;
}
.avatar {
    width: 178px;
    height: 178px;
    display: block;
}
.image{
    height: 180px;
    width: 320px;
}
.file-name{
    text-align: center;
}
.icondianzan, .icondianzan1{
    padding-left: 5px;
    cursor: pointer;
    span{
        padding-left: 5px;
    }
}
.time{
    color: #888;
}
</style>


