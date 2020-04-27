<template>
  <div>
    <el-select @change="getScore" v-model="subjectId" placeholder="请选择科目">
      <el-option
        v-for="item in subjectList"
        :key="item.subjectId"
        :label="item.subjectName"
        :value="item.subjectId">
      </el-option>
    </el-select>
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
      <el-table-column
        prop="user.userName"
        label="用户名"
        width="100">
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
    name: "QueryScore",
    data() {
      return {
        subjectList: [],
        subjectId: '',
        scoreList: [],
        total: 0,
        pageNum: 1,
      }
    },
    created() {
      request({
        method: 'get',
        url: '/subject/all'
      }).then(res => {
        if (!res.data.success) {
          this.$message.error(res.data.message);
        } else {
          this.subjectList = res.data.data;
        }
      })
    },
    methods: {
      getScore(value) {
        this.subjectId = value;
        request({
          method: 'get',
          url: '/score/all',
          params: {
            subjectId: this.subjectId,
            pageNum: this.pageNum
          }
        }).then(res => {
          if (!res.data.success) {
            this.$message.error(res.data.message);
          } else {
            this.scoreList = res.data.data.list;
            this.total = res.data.data.total;
          }
        }).catch(res => {
            this.$message.error("查询信息失败，请稍后再试");
          }
        )
      },
      currentChange(currentPage) {
        this.pageNum = currentPage;
        this.getScore(this.subjectId);
      }

    }
  }
</script>

<style scoped>

</style>
