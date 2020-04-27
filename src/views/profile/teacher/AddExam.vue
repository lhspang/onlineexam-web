<template>
  <div class="edit_cont">
    <el-form ref="problemForm" :model="examForm" label-width="100px">
      <el-form-item label="科目：" prop="subjectId">
        <el-select v-model="examForm.subjectId" placeholder="请选择">
          <el-option
            v-for="item in subjectList"
            :key="item.subjectId"
            :label="item.subjectName"
            :value="item.subjectId">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="考试名称：" prop="examName">
        <el-input v-model="examForm.examName"></el-input>
      </el-form-item>
      <el-form-item label="开始时间：" prop="examSdate">
        <el-date-picker
          v-model="examForm.examSdate"
          type="date"
          placeholder="选择日期">
        </el-date-picker>
      </el-form-item>
      <el-form-item label="结束时间：" prop="examEdate">
        <el-date-picker
          v-model="examForm.examEdate"
          type="date"
          placeholder="选择日期">
        </el-date-picker>
      </el-form-item>
      <el-form-item label="总时长：" prop="examLong">
        <el-input v-model="examForm.examLong"></el-input>
      </el-form-item>
      <el-form-item label="总分数：" prop="examTotalscore">
        <el-input v-model="examForm.examTotalscore"></el-input>
      </el-form-item>
      <el-form-item label="判断题：" prop="problemList">
        <el-popover
          placement="top"
          width="800"
          trigger="click">
          <el-table
            :data="problemList"
            border
            stripe
            size="medium "
            @select="selectPro"
            style="width: 100%">
            <el-table-column
              type="selection">
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
          <el-button slot="reference" @click="getProblem(3)" type="primary">添加判断题</el-button>
        </el-popover>
      </el-form-item>
      <el-form-item label="单选题：" prop="problemList">
        <el-popover
          placement="top"
          width="800"
          trigger="click">
          <el-table
            :data="problemList"
            border
            stripe
            size="medium "
            @select="selectPro"
            style="width: 100%">
            <el-table-column
              type="selection">
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
          <el-button slot="reference" @click="getProblem(1)" type="primary">添加单选题</el-button>
        </el-popover>
      </el-form-item>
      <el-form-item label="多选题：" prop="problemList">
        <el-popover
          placement="top"
          width="800"
          trigger="click">
          <el-table
            :data="problemList"
            border
            stripe
            size="medium "
            @select="selectPro"
            style="width: 100%">
            <el-table-column
              type="selection">
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
          <el-button slot="reference" @click="getProblem(2)" type="primary">添加多选题</el-button>
        </el-popover>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="btnClick('problemForm')">添加</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
  import {request, Qs} from "network/request";

  export default {
    name: "AddExam",
    data() {
      return {
        examForm: {
          examName: '',
          examSdate: '',
          examEdate: '',
          examLong: '',
          examTotalscore: '',
          subjectId: '',
          userId: this.$store.state.user.userId,
        },
        problemList: [],
        subjectList: [],
        total: 0,
        pageNum: 1,
        protypeId: 0,
        itemPro: [],
        itemScore: [],
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
      getProblem(protypeId) {
        this.protypeId = protypeId;
        this.problemList = [];
        request({
          method: 'get',
          url: '/problem/all',
          params: {
            subjectId: this.subjectId,
            pageNum: this.pageNum,
            protypeId: protypeId,
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
      selectPro(selection, row) {
        for (let pro of selection) {
          if (this.itemPro.indexOf(pro.problemId) === -1) {
            this.itemPro.push(pro.problemId);
            this.itemScore.push(5)
          }
        }
      },
      btnClick(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            let data = {
              examName: this.examForm.examName,
              examSdateStr: this.examForm.examSdate,
              examEdateStr: this.examForm.examEdate,
              examLong: this.examForm.examLong,
              examTotalscore: this.examForm.examTotalscore,
              subjectId: this.examForm.subjectId,
              userId: this.examForm.userId,
              itemPro:this.itemPro.toString(),
              itemScore:this.itemScore.toString()
            }
            request({
              method: 'post',
              url: '/exam',
              data: Qs.stringify(data),
            }).then(res => {
              if (!res.data.success) {
                this.$message.error(res.data.message);
              } else {
                this.$message({
                  message:'添加成功',
                  type:'success'
                });
                this.$refs[formName].resetFields()
              }
            })
          } else {
            return false;
          }
        });
      },
      currentChange(currentPage) {
        this.pageNum = currentPage
        this.getProblem(this.protypeId)
      }
    }
  }
</script>

<style scoped>
  .edit_cont {
    width: 500px;
    margin: 0 auto;
    margin-top: 20px;
  }

  .el-form-item {
    margin-top: 20px;
  }
</style>
