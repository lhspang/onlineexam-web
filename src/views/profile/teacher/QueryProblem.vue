<template>
  <div>
    <el-select @change="getProblem" v-model="subjectId" placeholder="请选择科目">
      <el-option
        v-for="item in subjectList"
        :key="item.subjectId"
        :label="item.subjectName"
        :value="item.subjectId">
      </el-option>
    </el-select>
    <el-table
      :data="problemList"
      border
      stripe
      size="medium "
      style="width: 100%">
      <el-table-column
        type="index">
      </el-table-column>
      <el-table-column
        prop="problemDesc"
        label="题目"
        width="300">
      </el-table-column>
      <el-table-column
        prop="problemOption1"
        label="选项1"
        width="100">
      </el-table-column>
      <el-table-column
        prop="problemOption2"
        label="选项2"
        width="100">
      </el-table-column>
      <el-table-column
        prop="problemOption3"
        label="选项3"
        width="100">
      </el-table-column>
      <el-table-column
        prop="problemOption4"
        label="选项4"
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
    name: "QueryProblem",
    data() {
      return {
        subjectList: [],
        subjectId: '',
        problemList: [],
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
      getProblem(value) {
        this.subjectId = value;
        request({
          method: 'get',
          url: '/problem/all',
          params: {
            subjectId: this.subjectId,
            pageNum: this.pageNum
          }
        }).then(res => {
          if (!res.data.success) {
            this.$message.error(res.data.message);
          } else {
            this.problemList = res.data.data.list;
            this.total = res.data.data.total
          }
        }).catch(res => {
            this.$message.error("查询信息失败，请稍后再试");
          }
        )
      },
      currentChange(currentPage) {
        this.pageNum = currentPage
        this.getProblem(this.subjectId)
      }
    }
  }
</script>

<style scoped>

</style>
