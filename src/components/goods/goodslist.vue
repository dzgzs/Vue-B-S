<template>
    <div class="tmpl">
        <el-row>
            <el-col :span="24">
                <!-- 面包屑组件 -->
                <div class="abread bt-line">
                    <el-breadcrumb separator="/">
                        <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
                        <el-breadcrumb-item>购物商城</el-breadcrumb-item>
                        <el-breadcrumb-item>商品列表</el-breadcrumb-item>
                    </el-breadcrumb>
                </div>
            </el-col>
        </el-row>
        <el-row>
            <!-- 第二部分 -->
            <el-col :span="24">
                <div class="abread bt-line">
                    <el-row>
                        <el-col :span="6">
                            <router-link to="/admin/goodsadd">
                                <el-button size="small">新增</el-button>
                            </router-link>
                            <el-button size="small" @click="delData">删除</el-button>
                            <el-button size="small" @click="selectedAll(list)">全选</el-button>
                        </el-col>

                        <el-col :offset="14" :span="4">
                            <el-input placeholder="请输入搜索内容" icon="search" v-model="searchValue" :on-icon-click="getlist">
                            </el-input>
                        </el-col>
                    </el-row>
                </div>
            </el-col>
        </el-row>
        <el-row>
            <el-col :span="24">
                <el-table ref="multipleTable" :data="list" @select="selected"  border tooltip-effect="dark" style="width: 100%">
                    <el-table-column type="selection" width="55">
                    </el-table-column>
                    <el-table-column label="标题">
                        <template scope="scope">
                            <el-tooltip class="item" effect="dark" placement="right">
                                <div slot="content">
                                    <img height="200" width="200" :src="scope.row.imgurl">
                                </div>
                                <router-link v-bind="{to:'/admin/goodsedit/' + scope.row.id}">
                                {{scope.row.title}}</router-link>
                            </el-tooltip>
                        </template>

                        
                    </el-table-column>
                    <el-table-column prop="categoryname" label="所属属性" width="100">
                    </el-table-column>
                    <el-table-column prop="stock_quantity" label="库存" width="100">
                    </el-table-column>
                    <el-table-column prop="market_price" label="市场价" width="100">
                    </el-table-column>
                    <el-table-column prop="sell_price" label="售货价" width="100">
                    </el-table-column>
                    <el-table-column label="属性" width="120">
                        <template scope="scope">
                            <i v-bind="{class:'el-icon-picture '+(scope.row.is_slide==1?'':'unlight')}"></i>
                            <i v-bind="{class:'el-icon-upload '+(scope.row.is_hot==1?'':'unlight')}"></i>
                        </template>
                    </el-table-column>
                    <el-table-column label="操作" width="120">
                        <template scope="scope">
                            <router-link v-bind="{to:'/admin/goodsedit/' + scope.row.id}">修改</router-link>
                        </template>
                    </el-table-column>
                </el-table>
            </el-col>
        </el-row>
        <el-row>
            <el-col :span="24">
                <el-pagination @size-change="pageSizeChange" @current-change="pageIndexChange" :current-page="pageIndex" :page-sizes="[1, 5, 10, 15]"
                    :page-size="pageSize" layout="total, sizes, prev, pager, next, jumper" :total="totalCount">
                </el-pagination>
            </el-col>
        </el-row>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                pageSize: 10,
                pageIndex: 1,
                totalCount: 0,
                searchValue: "",
                list: [],
                delids:[],
                isSelectAll:false
            }
        },
        methods: {
            selectedAll(rows){
                this.isSelectAll=!this.isSelectAll
                
                if(this.isSelectAll){
                    this.delids.length=0;
                    rows.forEach(row=>{
                        this.$refs.multipleTable.toggleRowSelection(row);
                        this.delids.push(row.id)
                    })
                }else{
                    rows.forEach(row=>{
                        this.$refs.multipleTable.toggleRowSelection(row);
                    })
                    this.delids=[]
                }
            },
            delData(){
                if(this.delids.length<=0){
                    this.$message.error("清选择数据后再尝试");
                    return;
                }
                var ids=this.delids.join(",");
                this.$ajax.get("/admin/goods/del/"+ids)
                .then(res=>{
                    if(res.data.status==1){
                        this.$message.error(res.data.message);
                        return
                    }
                    this.getlist()
                })
            },
            selected(selection,row){
                this.delids.push(row.id)
            },
            pageSizeChange(size) {
                this.pageSize = size
                this.getlist();
            },
            pageIndexChange(currentPage) {
                this.pageIndex = currentPage;
                this.getlist();
            },
            getlist() {
                var url = '/admin/goods/getlist?pageIndex=' + this.pageIndex + '&pageSize=' + this.pageSize + '&searchvalue=' + this.searchValue
                this.$ajax.get(url).then(res => {
                    this.list = res.data.message
                    this.totalCount = res.data.totalcount
                })
            }
        },
        mounted() {
            this.getlist()
        }
    }
</script>
<style scoped>
    .unlight {
        color: rgba(0, 0, 0, .4)
    }
</style>