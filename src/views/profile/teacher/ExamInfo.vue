<template>
  <div>
    <el-page-header @back="goBack" content="查看考试题目">
    </el-page-header>
    <div class="exam_title">{{examName}}</div>
    <el-table
      :data="examItem"
      border
      stripe
      size="medium "
      style="width: 100%;margin-top: 30px">
      <el-table-column
        type="index">
      </el-table-column>
      <el-table-column
        prop="problem.problemDesc"
        label="题目"
        width="300">
      </el-table-column>
      <el-table-column
        prop="problem.problemOption1"
        label="选项1"
        width="130">
      </el-table-column>
      <el-table-column
        prop="problem.problemOption2"
        label="选项2"
        width="130">
      </el-table-column>
      <el-table-column
        prop="problem.problemOption3"
        label="选项3"
        width="130">
      </el-table-column>
      <el-table-column
        prop="problem.problemOption4"
        label="选项4"
        width="130">
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
  import {request, Qs} from "network/request";

  export default {
    name: "ExamInfo",
    data() {
      return {
        examId: this.$route.params.id,
        examName: '',
        examItem: [],
      }
    },
    created() {
      request({
        method: 'get',
        url: '/exam/' + this.examId + "/teacher",
      }).then(res => {
        if (!res.data.success) {
          this.$message.error(res.data.message);
        } else {
          console.log(res.data.data);
          this.examName = res.data.data.exam.examName;
          this.examItem = res.data.data.item;
        }
      }).catch(res => {
          this.$message.error("查询信息失败，请稍后再试");
        }
      )
    },
    methods: {
      goBack() {
        this.$router.go(-1);
      }
    }
  }
</script>

<style scoped>
  .exam_title {
    width: 200px;
    text-align: center;
    margin: 0 auto;
    margin-top: 30px;
    font-size: 20px;
  }
</style>
