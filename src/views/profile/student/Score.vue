<template>
  <div>
    <el-table
      :data="scoreList"
      border
      stripe
      size="medium "
      style="width: 100%">
      <el-table-column
        type="index">
      </el-table-column>
      <el-table-column
        prop="exam.examName"
        label="考试名称"
        sortable
        width="300">
      </el-table-column>
      <el-table-column
        prop="totalScore"
        label="总分数"
        sortable
        width="100">
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
  import {request, Qs} from "network/request";

  export default {
    name: "Score",
    data(){
      return{
        scoreList:[]
      }
    },
    created() {
      request({
        method: 'get',
        url: '/score/'+this.$store.state.user.userId+"/student",
      }).then(res => {
        if (!res.data.success) {
          this.$message.error('您还没有成绩信息');
        } else {
          this.scoreList = res.data.data;
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
