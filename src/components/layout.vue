<template>
  <div class="tmpl">
    <el-row>
      <el-col :span="4">
        <img src="../../statics/imgs/logo.png" alt="" class="logo">
        <div class="layout menu">
          <el-menu default-active="1-3" class="el-menu-vertical-demo">
            <el-submenu index="1">
              <template slot="title">
                <i class="el-icon-message"></i>购物商城</template>
              <el-menu-item-group>
                <router-link to="/admin/goodslist">
                <el-menu-item index="1-1">内容管理</el-menu-item></router-link>
                <el-menu-item index="1-2">分类管理</el-menu-item>
                </el-menu-item>
                <el-menu-item index="1-3">评论管理</el-menu-item>
              </el-menu-item-group>
            </el-submenu>
            <el-submenu index="2">
              <template slot="title">
                <i class="el-icon-message"></i>订单详情</template>
              <el-menu-item-group>
                <el-menu-item index="2-1">订单列表</el-menu-item>
                <el-menu-item index="2-2">分类管理</el-menu-item>
                <el-menu-item index="2-3">评论管理</el-menu-item>
              </el-menu-item-group>
            </el-submenu>
          </el-menu>
        </div>
      </el-col>
      <el-col :span="20">
        <el-row>
          <el-col :span="24">
            <div class="topbg">
              <el-row>
                <!-- 图标 -->
                <el-col :span="1">
                  <i class="el-icon-menu"></i>
                </el-col>
                 <!-- 登录信息 -->
                  <el-col :span="23">
                     欢迎2B小姐姐登录
                     <el-dropdown split-button type="primary" >
                        更多菜单
                        <el-dropdown-menu slot="dropdown">
                          <el-dropdown-item>修改密码</el-dropdown-item>
                          <el-dropdown-item><span @click="logout">注销登录</span></el-dropdown-item>
                        </el-dropdown-menu>
                      </el-dropdown>
                  </el-col>
              </el-row>
            </div>
          </el-col>
        </el-row>



        <el-row>
          <el-col :span="24">
              <router-view></router-view>
          </el-col>
        </el-row>
      </el-col>
    </el-row>
  </div>
</template>

<script>
  export default {
      methods:{
        logout(){
          var url ="/admin/account/logout"
          this.$ajax.get(url)
          .then(res=>{
            if(res.data.status==1){
              this1.$message.error(res.data.message)
              return
            }else{
              this.$router.push({name:"login"})
            }
          })
        }
      },
  }
</script>

<style scoped>
</style>