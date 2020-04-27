<template>
  <div class="edit_cont">
    <el-form ref="problemForm" :model="subjectForm" label-width="100px">
      <el-form-item label="科目名称：" prop="subjectName">
        <el-input v-model="subjectForm.subjectName"></el-input>
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
    name: "AddSubject",
    data() {
      return {
        subjectForm: {
          subjectName: ''
        }
      }
    },
    methods: {
      btnClick(formName) {
        let data = {
          subjectName: this.subjectForm.subjectName
        }
        request({
          method: 'post',
          url: '/subject',
          data: Qs.stringify(data)
        }).then(res => {
          if (!res.data.success) {
            this.$message.error(res.data.message);
          } else {
            this.$message({
              message: '添加成功',
              type: 'success'
            });
            this.$refs[formName].resetFields()
          }
        })
      }
    }
  }
</script>

<style scoped>
  .edit_cont {
    width: 300px;
    margin: 0 auto;
    margin-top: 20px;
  }

  .el-form-item {
    margin-top: 20px;
  }
</style>
