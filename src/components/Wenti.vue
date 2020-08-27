<template>
  <div>
    <el-table border :data="inf" stripe height="550px">
      <el-table-column label="文章编号" prop="inform_issue"></el-table-column>
      <el-table-column label="被举报人" prop="user.uname"></el-table-column>
      <el-table-column label="标题" prop="issue.headline"></el-table-column>
      <el-table-column label="内容" prop="issue.content"></el-table-column>
      <el-table-column label="状态" prop="issue.flagss" :formatter="formatFlag"></el-table-column>
      <el-table-column label="状态数字" prop="issue.flagss" ></el-table-column>
      <el-table-column label="解封/封禁">
           <template slot-scope="scope" >
             <el-switch v-model="scope.row.issue.flagss"
                        @click.native="updflag(scope.row)"
                        :active-value="0"
                        :inactive-value="1"
                    inactive-text="禁用"
             active-text="正常"
                        active-color="#13ce66" inactive-color="#ff4949">
             </el-switch>
           </template>
        </el-table-column>

    </el-table>
  </div>
</template>

<script>
  export default {
    name: 'Wenti',
    data() {
      return {
        inf: []
      }
    },
    created:function(){
      return this.cha();
    },methods: {//查询方法
      cha: function () {
        this.$axios.post('http://localhost:8088/springboot/informquery')
          .then(response => {

            this.inf = response.data
            console.log(inf)
          })
      },
      formatFlag: function (row, column, cellValue) {
        if (cellValue == "1"){
          return '禁用';
        }else if (cellValue == "0"){
          return '正常';
        }
      },updflag:function (row) {
        console.log(row.inform_issue);
        this.$axios.post('http://localhost:8088/springboot/updinfor?aid='+row.issue.aid+'&flagss='+row.issue.flagss).then(res=>{
          this.cha();
        })
      }
    }
  }
</script>

<style scoped>
  .demo .el-switch__label {
      position: absolute;
     display: none;
     color: #fff;
     }

  demo .el-switch__label--right {
       z-index: 1;
      right: -3px;
       }

  .demo .el-switch__label--left {
        z-index: 1;
        left: 19px;
      }

 .demo .el-switch__label.is-active {
        display: block;
       }
.demo.el-switch .el-switch__core,
 .el-switch .el-switch__label {
        width: 50px !important;
    }
</style>
