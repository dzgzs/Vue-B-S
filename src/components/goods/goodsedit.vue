<template>
    <div class="tmpl">
        <!--1.0 面包屑-->
        <div class="abread bt-line">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item>
                    <span>返回上一层</span>
                </el-breadcrumb-item>
                <el-breadcrumb-item>购物商城</el-breadcrumb-item>
                <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
                <el-breadcrumb-item>新增商品</el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <div class="operation">
            <!-- 表单操作  整个表单绑定一个ruleForm -->
            <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
                <el-row>
                    <!-- 绑定数据 下面一样   v-model="ruleForm.title-->
                    <el-col :span="12">
                        <el-form-item label="商品标题" prop="title">
                            <el-input v-model="ruleForm.title"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <el-form-item label="副标题" prop="sub_title">
                            <el-input v-model="ruleForm.sub_title"></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row>
                    <el-col :span="10">
                        <el-form-item label="所属类别">
                            <el-select v-model="ruleForm.category_id" placeholder="所属类别">
                                <!-- 遍历分类里面的数据 根据遍历里面的class_layer生产成空格 
                                    如果class_layer大于1证明是子产品 加丨- -->
                                <el-option v-for="item in catelist " :label="item.title" :value="item.category_id">
                                    <span v-for="space in (item.class_layer -1)">&nbsp;</span>
                                    <span v-if="item.class_layer>1">|-</span>
                                    {{item.title}}</el-option>
                            </el-select>
                        </el-form-item>
                    </el-col>
                    <el-col :span="6">
                        <el-form-item label="是否发布">
                            <el-switch v-model="ruleForm.status" :width="58" on-text="ON" off-text="OFF" on-color="#13ce66" off-color="#ff4949">
                            </el-switch>
                        </el-form-item>
                    </el-col>
                    <el-col :span="8">
                        <el-form-item label="推荐类型">
                            <el-switch v-model="ruleForm.is_slide" :width="58" on-text="ON" off-text="OFF" on-color="#13ce66" off-color="#ff4949"></el-switch>
                            <el-switch v-model="ruleForm.is_top" :width="58" on-text="ON" off-text="OFF" on-color="#13ce66" off-color="#ff4949"></el-switch>
                            <el-switch v-model="ruleForm.is_got" :width="58" on-text="ON" off-text="OFF" on-color="#13ce66" off-color="#ff4949"></el-switch>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row>
                    <el-col :span="12">
                        <el-form-item label="封面上传">
                            <!-- 数据传到后台 -->
                            <el-upload class="upload-demo" action="http://127.0.0.1:8899/admin/article/uploadimg" :file-list="ruleForm.imgList" list-type="picture"
                                :on-success="imgUpload">
                                <el-button size="small" type="primary">点击上传</el-button>
                            </el-upload>
                        </el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <el-form-item label="文件上传">
                            <el-upload class="upload-demo" action="http://127.0.0.1:8899/admin/article/uploadfile" :file-list="ruleForm.fileList" list-type="picture"
                                :on-success="fileUpload">
                                <el-button size="small" type="primary">点击上传</el-button>
                            </el-upload>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row>
                    <el-col :span="12">
                        <el-form-item label="商品货号" prop="goods_no">
                            <el-input v-model="ruleForm.goods_no"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <el-form-item label="库存数量" prop="stock_quantity">
                            <el-input v-model="ruleForm.stock_quantity"></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row>
                    <el-col :span="12">
                        <el-form-item label="市场价格" prop="market_price">
                            <el-input v-model="ruleForm.market_price"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <el-form-item label="销售价格" prop="sell_price">
                            <el-input v-model="ruleForm.sell_price"></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row>
                    <el-col :span="24">
                        <el-form-item label="内容摘要" prop="zhaiyao">
                            <el-input type="textarea" :rows="2" placeholder="请输入内容" v-model="ruleForm.zhaiyao">
                            </el-input>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row>
                    <el-col :span="24">
                        <el-form-item label="商品详情" prop="content">
                            <quill-editor :content="ruleForm.content" @change="onEditorChange($event)">
                            </quill-editor>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row>
                    <el-col :span="10">
                        <el-form-item>
                            <el-button type="primary" @click="submitForm('ruleForm')">立即创建</el-button>
                            <el-button @click="resetForm('ruleForm')">重置</el-button>
                        </el-form-item>
                    </el-col>
                </el-row>
            </el-form>
        </div>
    </div>
</template>

<script>
    // 引入富文本
    import { quillEditor } from "vue-quill-editor"


    export default {
        components: {
            quillEditor
        },
        data() {
            return {
                // catelist
                catelist: [],  //存储分类下拉框中的数据
                goodsid:this.$route.params.goodsid,
                // 表单元素的双向数据绑定对象
                ruleForm: {
                    title: '',
                    sub_title: '',
                    "goods_no": "",
                    category_id: '',
                    "stock_quantity": "",
                    "market_price": "",
                    "sell_price": "",
                    "status": "",
                    "is_slide":"",
                    "is_top": "",
                    "is_hot": "",
                    "zhaiyao": "",
                    "content": "",
                    imgList: [

                    ],
                    "fileList": [

                    ]
                },
                rules: {
                    title: [
                        { required: true, message: "请输入商品标题", trigger: 'blur' }
                    ]
                }
            }
        },
        mounted() {
            // 打开页面的时候加载页面
            this.getcastlist();
        },
        methods: {
            getOldData(){
                var url="/admin/goods/getgoodsmodel/"+this.goodsid;
                this.$ajax.get(url)
                .then(res=>{
                    this.ruleForm=res.data.message;
                    this.ruleForm.category_id=(this.ruleForm.category_id - 0 )

                })
            }, 
            // 图片上传  传递过来的response赋值给imgList
            imgUpload(response, file, fileList) {
                this.ruleForm.imgList = [response]
            },
            // 文件上传 上传多张 重复
            fileUpload(response, file, fileList) {
                this.ruleForm.fileList.push(response)
            },
            // 把富文本里面的内容写进html里面
            onEditorChange(event) {
                this.ruleForm.content = event.html
            },
            // 根据端口获取数据
            getcastlist() {
                var url = "/admin/category/getlist/goods"
                this.$ajax.get(url).then(res => {
                    this.catelist = res.data.message

                    this.getOldData()
                })
            },
            // 创建表单
            submitForm(formName) {
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        // post方式的ajax传递数据 url 数据
                        this.$ajax.post('/admin/goods/edit/'+this.goodsid, this.ruleForm)
                            .then(res => {
                                if (res.data.status == 1) {
                                    this.$message({
                                        showClose: true,
                                        message: res.data.message,
                                        type: 'error',
                                        duration: 1000
                                    });
                                }else{
                                    this.$router.push({name:'goodslist'})
                                }
                            })
                    } else {
                        console.log('error submit!!');
                        return false;
                    }
                });
            },
            // 初始化表单
            resetForm(formName) {
                this.$refs[formName].resetFields();
            }
        }
    }
</script>
<style scoped>
</style>