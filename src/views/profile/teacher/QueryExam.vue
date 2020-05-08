<template>
  <div>
    <el-select @change="getExam" v-model="subjectId" placeholder="请选择科目">
      <el-option
        v-for="item in subjectList"
        :key="item.subjectId"
        :label="item.subjectName"
        :value="item.subjectId">
      </el-option>
    </el-select>
    <el-table
      :data="examList"
      border
      stripe
      size="medium "
      style="width: 100%">
      <el-table-column
        prop="examSdate"
        label="开始日期"
        width="170">
      </el-table-column>
      <el-table-column
        prop="examEdate"
        label="结束日期"
        width="170">
      </el-table-column>
      <el-table-column
        prop="examName"
        label="考试名称"
        width="150">
      </el-table-column>
      <el-table-column
        prop="examLong"
        label="考试时长(分钟)"
        width="80">
      </el-table-column>
      <el-table-column
        prop="examTotalnum"
        label="总题目数"
        width="80">
      </el-table-column>
      <el-table-column
        prop="examTotalscore"
        label="总分数"
        width="70">
      </el-table-column>
      <el-table-column
        prop="subject.subjectName"
        label="考试科目"
        width="70">
      </el-table-column>
      <el-table-column
        label="操作"
        width="100">
        <template slot-scope="scope">
          <el-button @click="handleClick(scope.row)" type="primary">查询题目</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
      background
      layout="prev, pager, next"
      :total="total"
      @current-change="currentChange"
      style="margin-top: 20px">
    </el-pagination>
  </div>
</template>

<script>
  import {request, Qs} from "network/request";

  export default {
    name: "QueryExam",
    data() {
      return {
        subjectList: [],
        subjectId: '',
        examList: [],
        total: 0,
        pageNum: 1,
      }
    },
    created() {
      request({
        method: 'get',
        url: '/user/'+this.$store.state.user.userId+'/subject'
      }).then(res => {
        if (!res.data.success) {
          this.$message.error(res.data.message);
        } else {
          this.subjectList = res.data.data;
        }
      }).catch(res => {
          this.$message.error("查询信息失败，请稍后再试");
        }
      )
    },
    methods: {
      getExam(value) {
        this.subjectId = value;
        request({
          method: 'get',
          url: '/exam/all',
          params: {
            subjectId: this.subjectId
          }
        }).then(res => {
          if (!res.data.success) {
            this.$message.error(res.data.message);
          } else {
            this.examList = res.data.data.list;
          }
        }).catch(res => {
            this.$message.error("查询信息失败，请稍后再试");
          }
        )
      },
      handleClick(row){
        this.$router.push('/profile/exam/'+row.examId);
      },
      currentChange(currentPage) {
        this.pageNum = currentPage;
        this.getExam(this.subjectId);
      }
    }
  }
</script>

<style scoped>

</style>
