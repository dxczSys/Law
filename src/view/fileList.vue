<template>
    <div class="file-list-wrapper">
        <div class="admin-operate">
            <el-button icon="el-icon-plus" v-if="username == 'admin'" type="primary" size="small" @click="handClickAdd">增加</el-button>
        </div>

        <div class="file-content">
            <el-row :gutter="12">
                <el-col :span="6" v-for="(item, index) in dataList" :key="index">
                    <el-card :body-style="{ padding: '0px' }">
                        <img :src="baseIp + item.fpath" class="image">
                        <div style="padding: 14px;">
                            <div class="file-name">{{item.fname}}</div>
                            <div class="bottom clearfix">
                                <div style="text-align: right;;"><time class="time">{{dateFormat('YYYY-mm-dd', new Date(item.fdate))}}</time></div>
                                <el-button type="text" v-if="username == 'admin'" class="button" @click="handClickOperate(item, index, 1)">删除</el-button>
                                <el-button type="text" v-if="username == 'admin'" class="button" @click="handClickOperate(item, index, 2)">修改</el-button>
                                <el-button type="text" v-if="token" class="button" @click="handClickOperate(item, index, 3)">下载</el-button>
                                <el-button type="text" v-if="token" class="button" @click="handClickOperate(item, index, 4)">评论</el-button>
                                <span class="iconfont" v-if="token" :class="{'icondianzan' : !item.isIcon, 'icondianzan1' : item.isIcon }" @click="handClickLike(item, index)"><span>{{item.fdianzan}}</span></span>
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

				<el-form-item label="资源年限">
                    <el-select v-model="form.year" placeholder="请选择" style="width: 100%;">
                    	<el-option label="2017" value="2017"> </el-option>
                    	<el-option label="2018" value="2018"> </el-option>
                    	<el-option label="2019" value="2019"> </el-option>
                    	<el-option label="2020" value="2020"> </el-option>
                    </el-select>
                </el-form-item>

                <el-form-item label="资源缩略图">
                    <el-upload class="avatar-uploader" :action="url" :show-file-list="false"
                        :on-success="handleAvatarSuccess" :before-upload="beforeAvatarUpload">
                        <img v-if="imageUrl" :src="imageUrl" class="avatar">
                        <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                    </el-upload>
                </el-form-item>

                <el-form-item label="资源文件">
                    <el-upload class="upload-demo" :action="url" :file-list="fileList" :on-success="handleFileSuccess">
                        <el-button size="small" type="primary">点击上传</el-button>
                    </el-upload>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="dialogVisible = false">取 消</el-button>
                <el-button type="primary" @click="handClickSave">确 定</el-button>
            </div>
        </el-dialog>

        <el-dialog :visible.sync="dialogTableVisible" title="评论">
            <div class="comment-content">
                <div v-for="(item, index) in commentData" :key="index">
                    <div style="line-height:30px;padding-left:20px;">{{item.ctext}}</div>
                    <div class="dialog-comment-bottom">
                        <div>{{item.cname}}</div>
                        <div>{{dateFormat('YYYY-mm-dd', new Date(parseInt(item.cdate)))}}</div>
                    </div>
                     <hr style="margin-top: 10px;margin-bottom: 10px;"/>
                </div>
                <div>
                    <el-input v-model="commentVal" type="textarea" :rows="2"></el-input>
                </div>
               
            </div>
            <div slot="footer" class="dialog-footer">
                <el-button @click="dialogTableVisible = false">取 消</el-button>
                <el-button type="primary" @click="handClickSaveComment">确 定</el-button>
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
        },
        year : {
            type : String,
            default : '2019'
        }
    },
    data() {
        return {
            dialogVisible : false,
            form : {
                name : ''
            },
            imageUrl: '',
            imageUrlParam : '',
            fileList : [],
            fileParam : '',
            url : '/Law/Law/upload',
            baseIp : '/Law',
            fid : '',

            dataList : [],

            token : '',
            username : '',
            isEdit : false,

            dialogTableVisible : false,
            commentData : [],
            commentVal : '',
        }
    },

    watch : {
        indexN : {
            handler(n) {
                if (n != '1') {
                       this.$axios({
                       	   method :'post',
                           url : '/Law/fileSel',
                           data : {
                           		ftypeid : this.indexN,
    							fdatetype : this.year
                           }
                       }).then(res => {
                           if (res.data) {
                               this.dataList = []
                               this.dataList = res.data
                           }
                       })
                }
            },
            deep : true,
            immediate : true
            
        },
        year(n){
            this.$axios({
                method :'post',
                url : '/Law/fileSel',
                data : {
                    ftypeid : this.indexN,
                    fdatetype : n
                }
            }).then(res => {
                if (res.data) {
                    this.dataList = []
                    this.dataList = res.data
                }
            })
        }
    },

    mounted() {
        this.token = this.$cookie.get('token')
        this.username = this.$cookie.get('username')
    },

    created() {
        
    },

    methods : {
        handClickSaveComment() {
            this.$axios({
                method :'post',
                url : '/Law/commentAdd',
                data : { 
                    ctext: this.commentVal,
                    onlyid: this.fid}
            }).then(res => {
                if (res.data.code) {
                     this.$axios({
                        method :'get',
                        url : '/Law/commentSel?id=' + this.fid
                    }).then(res => {
                        if (res.data.code) {
                            this.commentData = []
                            this.commentData = res.data.msg
                        }
                    })
                }
            })
        },
    	
    	getList() {
    		
    		let _seldata = {
    			ftypeid : this.indexN,
    			fdatetype : this.year
    		}
    		
    		this.$axios({
                       	   method :'post',
                           url : '/Law/fileSel',
                           data : _seldata
                       }).then(res => {
                           if (res.data) {
                               this.dataList = []
                               this.dataList = res.data
                           }
                       })
    	},
    	
    	handClickAdd() {
    		this.dialogVisible = true
    		this.isEdit = false
    		this.fid = ''
                this.form.name = ''
                this.imageUrl = ''
                this.imageUrlParam = ''
                this.fileParam = ''
                this.fileList = [{ name : item.fpathone, url : item.fpathone }]
    	},

        handleAvatarSuccess(res, file) {
            this.imageUrl = URL.createObjectURL(file.raw);
            this.imageUrlParam = res.msg
        },

        handleFileSuccess(res, file) {
            if (res.code) {
            	this.fileParam = res.msg
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
               this.$axios({
               	   method : 'get',
                   url : '/Law/dianzai?id=' + item.fid
                   
               }).then(res => {
                   if (res.data.code) {
                   	 item.isIcon = 1
                     item.fdianzan ++
                     let obj = this.dataList.slice(index, index + 1)
                     this.dataList.splice(index, 1, ...obj)
                   }
               })
            }
        },

        //dialog确定
        handClickSave() {
        	if (this.isEdit) {
        		this.$axios({
               	   method : 'post',
                   url : '/Law/fileDpd',
                   data : {
                   	  fid : this.fid,
                   	  fname : this.form.name,
                   	  fpath : this.imageUrlParam,
                   	  ftypeid : this.indexN,
                   	  fpathone : this.fileParam,
                   	  fdatetype : this.form.year
                   	  
                   }
               }).then(res => {
                   if (res.data.code) {
                       this.$message.success('修改成功')
                       this.dialogVisible = false
                       this.getList()
                   }
               })
        	}else {
        		this.$axios({
               	   method : 'post',
                   url : '/Law/fileAdd',
                   data : {
                   	  fname : this.form.name,
                   	  fpath : this.imageUrlParam,
                   	  ftypeid : this.indexN,
                   	  fpathone : this.fileParam,
                   	  fdatetype : this.form.year
                   }
               }).then(res => {
                   if (res.data.code) {
                       this.$message.success('添加成功')
                       this.dialogVisible = false
                       this.getList()
                   }
               })
        	}
               
        },

        handClickOperate(item, index, num) {
            if (num == 1) {
                //删除
                this.$axios({
                	method : 'get',
                    url : '/Law/fileDel?id=' + item.fid
                }).then(res => {
                    if (res.data.code) {
                        this.dataList.splice(index, 1)
                        this.$message.success('删除成功') 
                    }
                })
            }else if (num == 2) {
                //修改
                this.fid = item.fid
                this.form.name = item.fname
                this.form.year = item.fdatetype
                this.imageUrl = this.baseIp + item.fpath
                this.imageUrlParam = item.fpath
                this.fileParam = item.fpathone
                this.fileList = [{ name : item.fpathone, url : item.fpathone }]
                this.dialogVisible = true
                this.isEdit = true
            }else if (num == 4) {
                this.fid = item.fid
                this.dialogTableVisible = true
                this.$axios({
                    method :'get',
                    url : '/Law/commentSel?id=' + item.fid
                }).then(res => {
                    if (res.data.code) {
                        this.commentData = []
                        this.commentData = res.data.msg
                    }
                })
            }else {
                //下载
                
                window.location.href = "/Law/Law/download?fname=" + item.fpathone;
                
                /*this.$axios({
                	method : 'get',
                    url : '/Law/download?fname=' + item.fpathone
                }).then(res => {
                    if (res.data.code) {
                         
                    }
                })*/
            }
        },
        
        dateFormat(fmt, date) {
		    let ret
		    let opt = {
		        "Y+": date.getFullYear().toString(),       
		        "m+": (date.getMonth() + 1).toString(),     
		        "d+": date.getDate().toString(),            
		        "H+": date.getHours().toString(),           
		        "M+": date.getMinutes().toString(),         
		        "S+": date.getSeconds().toString()         
		    }
		    for (let k in opt) {
		        ret = new RegExp("(" + k + ")").exec(fmt);
		        if (ret) {
		            fmt = fmt.replace(ret[1], (ret[1].length == 1) ? (opt[k]) : (opt[k].padStart(ret[1].length, "0")))
		        }
		    }
		    return fmt
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
.dialog-comment-bottom{
    display: flex;
    justify-content: space-between;
    padding-left: 10px;
    line-height: 36px;
    color: red;
}
</style>


