<template>
    <div>
      <!--
             model:绑定表单的数据模型
             rules:绑定表单的校验规则
          -->
      <el-form label-width="100px" label-suffix="：" :model="user" :rules="rules" ref="fm">
        <h2>登 录</h2>

        <!-- prop:校验规则的属性 -->
        <el-form-item label="用户名" prop="tname">
          <el-input v-model="user.tname"></el-input>
        </el-form-item>

        <el-form-item label="密码" prop="tpwd">
          <el-input v-model="user.tpwd" show-password></el-input>
        </el-form-item>

        是否保存密码：<el-switch
          v-model="show.value"
          active-color="#13ce66"
          inactive-color="#ff4949">
        </el-switch>
                                <!--round：圆角显示按钮-->
        <el-button type="primary" round :plain="show.style" @click="login()">登录</el-button>
      </el-form>
    </div>
</template>

<script>
export default {
  name: 'backlogin',
  data: () => {
    return {
      show: {'style': false, 'value': true},
      user: {'tname': JSON.parse(localStorage.getItem('tname')), 'tpwd': JSON.parse(localStorage.getItem('tpwd'))},
      rules: {
        tname: [
          // required:进行校验，非空 message：提示信息 trigger:校验触发的事件,默认是change,blur
          {required: true, message: '用户名不能为空'},
          {min: 2, max: 15, message: '用户名是3-8位', trigger: ['blur', 'change']},
          // {type:'number',message:'请填写数字'},// email/number
          {
            validator: function (rule, value, callback) {
              if (value.indexOf('_') === -1) {
                callback()
              } else {
                callback(new Error('不能包含特殊字符'))
              }
            },
            // 提供事件触发
            trigger: ['blur', 'change']
          }
        ],
        tpwd: [
          {required: true, message: '密码不能为空'}
        ]
      }
    }
  },
  methods: {
    login: function () {
      // 先表单校验，再提交
      this.$refs['fm'].validate(valid => {
        // valid返回true表示校验通过，false校验失败
        if (valid) {
          // 登录/* ${this.user.uname}/${this.user.pwd   , {name: this.user.uname, pwd: this.user.pwd}*/
          this.$axios.post('http://localhost:8088/springboot/backlogin',this.$qs.stringify({"tname":this.user.tname,"tpwd":this.user.tpwd})
          ).then(
            response => {
              console.log(response.data)
              if (response.data === -1) {
                this.show.style = false
                window.localStorage.removeItem('tname')
                window.localStorage.removeItem('tpwd')
                this.open('很抱歉密码错误了！！！');
              } else {
                this.show.style = false
                // 保存用户session
                sessionStorage.setItem('usersession', JSON.stringify(response.data))
                // 判断是否记住密码
                if (this.show.value) {
                  window.localStorage.setItem('tname', JSON.stringify(this.user.tname))
                  window.localStorage.setItem('tpwd', JSON.stringify(this.user.tpwd))
                } else {
                  window.localStorage.removeItem('tname')
                  window.localStorage.removeItem('tpwd')
                }
                this.$router.push({name: 'Home'})
                this.open('欢迎用户登录！！！')
              }
            }).catch(err => {
            this.msg = err
          })
        }
      })
    },
    open (message) {
      this.$message(message)
    }
  }
}
</script>
<style scoped>
  .el-form {
    border: 2px solid lightskyblue;
    width: 30%;
    margin: 100px auto;
    border-radius: 25px;
    box-shadow: 0 0 25px lightskyblue;
    padding: 20px 50px 50px 20px;
    text-align: center;
  }
</style>
