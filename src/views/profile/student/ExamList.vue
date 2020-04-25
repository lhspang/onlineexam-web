<template>
  <el-table
    :data="examList"
    border
    stripe
    size="medium "
    style="width: 100%">
    <el-table-column
      prop="examSdate"
      label="开始日期"
      width="180">
    </el-table-column>
    <el-table-column
      prop="examName"
      label="考试名字"
      width="200">
    </el-table-column>
    <el-table-column
      prop="examLong"
      label="考试时长(分钟)"
      width="120">
    </el-table-column>
    <el-table-column
      prop="subject.subjectName"
      label="考试科目"
      width="100">
    </el-table-column>
  </el-table>
</template>

<script>
  import {request, Qs} from "network/request";

  export default {
    name: "ProfilrIndex",
    data(){
      return{
        examList :[],
      }
    },
    created() {
      request({
        method: 'get',
        url: '/exam/all',
        params:{
          subjectId:1
        }
      }).then(res => {
        if (!res.data.success) {
          this.$message.error(res.data.message);
        } else {
          this.examList = res.data.data.list;
          console.log(this.examList);
        }
      }).catch(res => {
          this.$message.error("查询信息失败，请稍后再试");
        }
      )
    }
  }
</script>

<style scoped>

</style>
