<template>
  <div>
    <el-button type="primary" @click="show()">添加</el-button>
    <el-table border :data="list" stripe height="550px">
      <el-table-column label="员工编号" prop="eid"></el-table-column>
      <el-table-column label="姓名" prop="ename"></el-table-column>
      <el-table-column label="电话" prop="ephone"></el-table-column>
      <el-table-column label="账号" prop="account.aname"></el-table-column>
      <el-table-column label="头像路径" prop="headphone"></el-table-column>
      <el-table-column label="角色" prop="role.rname"></el-table-column>

      <el-table-column
        label="禁用/正常">
        <template slot-scope="scope">
          <el-switch
            v-model="scope.row.flag"
            :active-value="0"
            :inactive-value="1"
            active-color="#13ce66"
            inactive-color="#ff4949"
            @change="changeSwitch(scope.row)"/>
        </template>
      </el-table-column>

      <el-table-column label="操作" width="130px">
        <!-- scope：返回当前单元格 -->
        <template slot-scope="scope">
          <el-button type="success" round size="mini" icon="el-icon-edit" @click="show(scope.row)"></el-button>
          <el-button type="warning" round size="mini" icon="el-icon-delete" @click="del(scope.row.eid)"></el-button>
        </template>
      </el-table-column>
    </el-table>

    <el-pagination
      :page-size="2"
      layout="prev, pager, next"
      @current-change="handleCurrentChange"
      :total="pageinfo.total">
    </el-pagination>

    <el-dialog :title="title" :visible.sync="dialogFormVisible">
      <el-form :model="employee" label-width="100px">

        <el-form-item label="姓名">
          <el-input v-model="employee.ename"></el-input>
        </el-form-item>
        <el-form-item label="电话">
          <el-input v-model="employee.ephone"></el-input>
        </el-form-item>
        <el-form-item label="账号">
          <el-select v-model="employee.aid" placeholder="请选择账号">
            <el-option v-for="i in account" :key="i.aid" :value="i.aid" :label="i.aname" :disabled="i.disabled"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="头像">
          <el-input v-model="employee.headphone"></el-input>
        </el-form-item>
        <el-form-item label="角色">
          <el-radio-group v-model="employee.roletid">
            <el-radio :label="1" >超级管理员</el-radio>
            <el-radio :label="2" >普通管理员</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="状态">
          <el-radio-group v-model="employee.flag">
            <el-radio :label="1" >禁用</el-radio>
            <el-radio :label="0" >正常</el-radio>
          </el-radio-group>
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
    name: 'employee',
    data () {
      return {
        dialogFormVisible: false,
        title: '',
        employee:{},
        list:[],
        pageinfo:'',
        account:{},
      }
    },
    created: function () {
      this.$axios.post('http://localhost:8088/springboot/back/selectPage').then(
        response => {
          this.list = response.data.list;
          console.log(this.list)
        }).catch(err => {
        console.info(err)
      })
      this.$axios.post('http://localhost:8088/springboot/account/listAll').then(
        response =>{
          this.account=response.data
        }).catch(err => {
        console.info(err)
      })
    },
    changeSwitch (row) {
      const data = {
        id: row.id,
        flag: row.flag,
      };
      this.$api.accountSwitch(data).then(res => {
        if (res.code === '200' || res.code === 200) {
          // 调用表格数据
          this.getTableData();
        } else {
          this.$message.error(res.msg);
          // 调用表格数据
          this.getTableData();
        }
        this.loading = false;
      }).catch({

      });
    },

    methods: {
      show: function (row) {
        if (row == null) {
          this.title = "添加员工"
          this.dialogFormVisible = true;
          this.employee = {};
        } else {
          this.title = "修改员工"
          this.dialogFormVisible = true
          this.employee = Object.assign({}, row)
        }
      },
      save: function () {
        if (this.title == "添加员工") {
          let row = {"rowone": JSON.stringify(this.employee)}
          this.$axios.post("http://localhost:8088/springboot/back/save", this.$qs.stringify(row))
            .then(response => {
              this.list = response.data;
            }).catch(err => console.info(err))
        } else {
          let row = {"rowone": JSON.stringify(this.employee)}
          this.$axios.post("http://localhost:8088/springboot/back/update", this.$qs.stringify(row))
            .then(response => {
              this.list = response.data.list;
            }).catch(err => console.info(err))
        }
        this.dialogFormVisible = false
      },

      del: function (eid) {
        console.info(eid)
        this.$axios.post("http://localhost:8088/springboot/back/del", this.$qs.stringify({'eid': eid}))
          .then(response => {
            this.list = response.data
          }).catch(err => {
          console.info(err)
        })
      },
      handleCurrentChange:function (val) {
        this.$axios.post("http://localhost:8088/springboot/back/selectPage", this.$qs.stringify({"pageNum":val}))
          .then(response => {
            this.list = response.data.list;
            this.pageinfo=response.data;
          }).catch(err => {
          console.info(err)
        })
      },
    }
  }
</script>

<style scoped>

</style>
