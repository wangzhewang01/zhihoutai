<template>
  <div style="margin-top: -60px">
    <el-container>
      <el-header>
        <el-dropdown trigger="click" @command="hanleCommand">
                    <span class="el-dropdown-link">
                        <i class="el-icon-user-solid"></i>
                          {{emp.name}}
                        <i class="el-icon-arrow-down el-icon--right"></i>
                    </span>
          <el-dropdown-menu>
            <el-dropdown-item command="Usercenter">个人中心</el-dropdown-item>
            <el-dropdown-item command="Upd">修改密码</el-dropdown-item>
            <el-dropdown-item command="Tui">退出</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </el-header>
      <el-container>
        <el-aside>
          <!-- router:启用路由规则 -->
          <el-menu :router="true">
            <el-submenu index="1" >
              <template slot="title">
                <i class="el-icon-light-rain"></i>
                <span>员工管理</span>
              </template>
              <el-menu-item index="1-1" :route="{name:'Emp'}">
                <i class="el-icon-apple"></i>
                <span>员工</span>
              </el-menu-item>
            </el-submenu>

            <el-submenu index="2">
              <template slot="title">
                <i class="el-icon-light-rain"></i>
                <span>内容管理</span>
              </template>
              <el-menu-item index="2-1" route="emp">
                <i class="el-icon-apple"></i>
                <span>文章</span>
              </el-menu-item>
              <el-menu-item index="2-2">
                <i class="el-icon-brush"></i>
                <span>问题</span>
              </el-menu-item>
            </el-submenu>

            <el-submenu index="3">
              <template slot="title">
                <i class="el-icon-light-rain"></i>
                <span>用户管理</span>
              </template>
            </el-submenu>

            <el-menu-item index="4" :route="{name:'Emp'}">
              <i class="el-icon-ship"></i>
              <span>后台登陆管理</span>
            </el-menu-item>

          </el-menu>
        </el-aside>
        <el-main>
          <router-view></router-view>
        </el-main>
      </el-container>
      <el-footer height="30px">
        版权
      </el-footer>
    </el-container>
  </div>
</template>

<script>
  export default {
    name: 'Home',
    data(){ return {emp: {name:"张三"}}},
    methods: {
      hanleCommand: function (command) {
        // 访问路径：使用path必须写全路径，使用name直接写name值
        this.$router.push({name: command})
        // this.$router.push({path:'/home/personal'});
        // this.$router.push('personal');
      }
    }
  }
</script>
<style scoped>
  .el-header, .el-footer {
    background-color: lavender;
    padding: 10px 50px;
    vertical-align:top;
  }

  .el-aside {
    height: 600px;
  }

  .el-main {
    background-color: lightgreen;
  }

  .el-dropdown-link {
    cursor: pointer;
    color: #409EFF;
  }

  .el-dropdown{
    float: right;
  }
</style>
