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
        type="index">
      </el-table-column>
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
        label="考试名字"
        width="190">
      </el-table-column>
      <el-table-column
        prop="examLong"
        label="考试时长(分钟)"
        width="80">
      </el-table-column>
      <el-table-column
        prop="subject.subjectName"
        label="考试科目"
        width="80">
      </el-table-column>
      <el-table-column
        prop="examId"
        label="操作"
        width="100">
        <template slot-scope="scope">
          <el-button @click="toExam(scope.$index, scope.row)" type="primary">参与考试</el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>

</template>

<script>
  import {request, Qs} from "network/request";

  export default {
    name: "ProfilrIndex",
    data(){
      return{
        examList :[],
        subjectList: [],
        subjectId: '',
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
      }).catch(res => {
          this.$message.error("查询信息失败，请稍后再试");
        }
      )
    },
    methods:{
      getExam(value) {
        this.subjectId = value;
        request({
          method: 'get',
          url: '/exam/all',
          params:{
            subjectId:value
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
      toExam(index,row){
        this.$confirm('确定参加此次考试吗, 中途不能退出，是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.$router.replace('/exam/'+row.examId)
        }).catch(() => {
        });
      }
    }
  }
</script>

<style scoped>

</style>
