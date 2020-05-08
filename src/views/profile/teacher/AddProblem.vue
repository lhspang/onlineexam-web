<template>
  <div class="edit_cont">
    <el-form ref="problemForm" :model="problemForm" label-width="80px">
      <el-form-item label="科目：" prop="subjectId">
        <el-select v-model="problemForm.subjectId" placeholder="请选择">
          <el-option
            v-for="item in subjectList"
            :key="item.subjectId"
            :label="item.subjectName"
            :value="item.subjectId">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="题型：" prop="protypeId">
        <el-select @change="protypeChange" v-model="problemForm.protypeId" placeholder="请选择">
          <el-option
            v-for="item in protypeList"
            :key="item.protypeId"
            :label="item.protypeName"
            :value="item.protypeId">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="题干：" prop="problemDesc">
        <el-input type="textarea" v-model="problemForm.problemDesc"></el-input>
      </el-form-item>
      <el-form-item label="A：" prop="problemOption1">
        <el-input type="textarea" v-model.trim="problemForm.problemOption1"></el-input>
      </el-form-item>
      <el-form-item label="B：" prop="problemOption2">
        <el-input type="textarea" v-model.trim="problemForm.problemOption2"></el-input>
      </el-form-item>
      <el-form-item  v-show="isShow" label="C：" prop="problemOption3">
        <el-input type="textarea" v-model.trim="problemForm.problemOption3"></el-input>
      </el-form-item>
      <el-form-item v-show="isShow" label="D：" prop="problemOption4">
        <el-input type="textarea" v-model.trim="problemForm.problemOption4"></el-input>
      </el-form-item>
      <el-form-item label="正确答案" prop="rightList">
        <el-checkbox-group v-model="rightList">
          <el-checkbox label="A"></el-checkbox>
          <el-checkbox label="B"></el-checkbox>
          <el-checkbox v-show="isShow" label="C"></el-checkbox>
          <el-checkbox v-show="isShow" label="D"></el-checkbox>
        </el-checkbox-group>
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
    name: "AddProblem",
    data() {
      return {
        problemForm: {
          subjectId: '',
          protypeId: '',
          problemDesc: '',
          problemRight: '',
          problemOption1: '',
          problemOption2: '',
          problemOption3: '',
          problemOption4: '',
        },
        protypeList: [],
        subjectList: [],
        // checkList: [],
        rightList: [],
        isShow: false,
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
      })
      request({
        method: 'get',
        url: '/protype/all'
      }).then(res => {
        if (!res.data.success) {
          this.$message.error(res.data.message);
        } else {
          this.protypeList = res.data.data;
        }
      })
    },
    methods: {
      protypeChange(value) {
        this.isShow = value === 1 || value === 2;
        this.rightList = [];
      },
      btnClick(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            let data = {};
            if (this.isShow) {
              data = {
                subjectId: this.problemForm.subjectId,
                protypeId: this.problemForm.protypeId,
                problemDesc: this.problemForm.problemDesc,
                problemRight: this.rightList.toString(),
                problemCount: this.rightList.length,
                problemOption1: this.problemForm.problemOption1,
                problemOption2: this.problemForm.problemOption2,
                problemOption3: this.problemForm.problemOption3,
                problemOption4: this.problemForm.problemOption4,
              }
            } else {
              data = {
                subjectId: this.problemForm.subjectId,
                protypeId: this.problemForm.protypeId,
                problemDesc: this.problemForm.problemDesc,
                problemRight: this.rightList.toString(),
                problemCount: this.rightList.length,
                problemOption1: this.problemForm.problemOption1,
                problemOption2: this.problemForm.problemOption2,
              }
            }
            request({
              method: 'post',
              url: '/problem',
              data: Qs.stringify(data)
            }).then(res => {
              if (!res.data.success) {
                this.$message.error(res.data.message);
              } else {
                this.$message({
                  message:'添加成功',
                  type:'success'
                });
                this.rightList = [];
                this.$refs[formName].resetFields()
              }
            })
          } else {
            return false;
          }
        });
      }
    }
  }
</script>

<style scoped>
  .edit_cont {
    width: 330px;
    margin: 0 auto;
    margin-top: 20px;
  }

  .el-form-item {
    margin-top: 20px;
  }
</style>
