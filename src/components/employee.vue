<template>
  <div>
    <el-button type="primary" @click="show()">添加</el-button>
    <el-table border :data="list" stripe height="550px">
      <el-table-column label="学生编号" prop="sid"></el-table-column>
      <el-table-column label="学生名称" prop="sname"></el-table-column>
      <el-table-column label="学生性别" prop="sex" >
        <template slot-scope="scope">
        {{ scope.row.sex==1?'男':'女'}}
        </template>
      </el-table-column>
      <el-table-column label="学生状态" prop="start" >
        <template slot-scope="scope">
        {{ scope.row.start==1?'在校':'离校'}}
        </template>
      </el-table-column>
      <el-table-column label="操作" width="130px">
        <!-- scope：返回当前单元格 -->
        <template slot-scope="scope">
          <el-button type="success" round size="mini" icon="el-icon-edit" @click="show(scope.row)"></el-button>
          <el-button type="warning" round size="mini" icon="el-icon-delete" @click="delteacher(scope.row.sid)"></el-button>
        </template>
      </el-table-column>
    </el-table>
    <div class="block">
      <span class="demonstration">分页查询</span>
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="currentPage4"
        :page-sizes="[5, 10, 20, 50]"
        :page-size="5"
        background
        layout="total, sizes, prev, pager, next, jumper"
        :total="pageInfo.total"
      :hide-on-single-page="value"
      >
      </el-pagination>
    </div>
    <el-dialog :title="title" :visible.sync="dialogFormVisible">
      <el-form :model="student" label-suffix=":" label-width="100px" :rules="rules" ref="fm">
        <el-form-item label="学生编号" v-show="inpshow">
          <el-input v-model="student.sid" readonly="readonly"></el-input>
        </el-form-item>
        <el-form-item label="学生名称" prop="sname">
          <el-input v-model="student.sname"></el-input>
        </el-form-item>
        <el-form-item label="学生性别">
          <el-radio v-model="radio" label="1">男</el-radio>
          <el-radio v-model="radio" label="0">女</el-radio>
        </el-form-item>
        <el-form-item label="学生状态" >
          <el-radio v-model="radio1" label="1">在校</el-radio>
          <el-radio v-model="radio1" label="0">离校</el-radio>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="save()">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
export default {
  name: 'student',
  data: function () {
    return {
      dialogFormVisible: false,
      title: '',
      list: [],
      currentPage4: 1,
      pageInfo: {pagenum: 1, pagesize: 5, total: 0},
      value: false,
      student: {},
      inpshow: true,
      radio: '1',
      radio1: '1',
      rules: {
        sname: [
          // required:进行校验，非空 message：提示信息 trigger:校验触发的事件,默认是change,blur
          {required: true, message: '学生名称不能为空'}
        ]
      }
    }
  },
  created: function () {
    this.handleCurrentChange(1)
  },
  methods: {
    show: function (row) {
      if (row == null) {
        this.dialogFormVisible = true
        // 添加
        this.title = '添加员工'
        this.student = {}
        this.inpshow = false
      } else {
        // 修改
        this.title = '修改员工'
        this.inpshow = true
        this.radio = row.start.toString()
        this.radio1 = row.sex.toString()
        this.dialogFormVisible = true
        // 复制将row复制到目标对象。它将返回目标对象。已经将值给了this.teacher
        this.student = Object.assign({}, row)
      }
    },
    save: function () {
      // 重置from 表单
      this.$refs['fm'].validate(valid => {
        if (valid) {
          this.$set(this.student, 'sex', this.radio)
          this.$set(this.student, 'start', this.radio1)
          if (this.title === '添加员工') {
            this.$axios.post('http://localhost:8090/springboot/student/saveStudent', this.student).then(
              response => {
                if (response.data != null) {
                  this.list = response.data.list
                  this.open1()
                }
              }).catch(err => {
              this.msg = err
            })
          } else {
            this.$axios.post('http://localhost:8090/springboot/student/saveStudent', this.student).then(
              response => {
                if (response.data != null) {
                  this.list = response.data.list
                }
              }).catch(err => {
              this.msg = err
            })
          }
          this.dialogFormVisible = false
        } else {
          this.dialogFormVisible = true
        }
      })
    },
    delteacher: function (sid) {
      this.$axios.post('http://localhost:8090/springboot/student/delStudent', {sid: sid}
      ).then(
        response => {
          if (response.data != null) {
            this.list = response.data.list
          }
        }).catch(err => {
        this.msg = err
      })
    },
    handleSizeChange (val) {
      this.pageInfo.pagesize = val
      this.selstudent()
      console.log(`每页 ${val} 条`)
    },
    handleCurrentChange (val) {
      this.pageInfo.pagenum = val
      this.selstudent()
      console.log(`第 ${val} 页`)
    },
    selstudent: function () {
      this.$axios.post(`http://localhost:8090/springboot/student/pageStudent/${this.pageInfo.pagenum}/${this.pageInfo.pagesize}`).then(
        response => {
          this.list = response.data.list
          this.pageInfo.total = response.data.total
        }).catch(err => {
        this.msg = err
      })
    }

  }
}
</script>

<style scoped>

</style>
