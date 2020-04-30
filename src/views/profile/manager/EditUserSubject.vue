<template>
  <div>
    <el-page-header @back="goBack" content="修改所授科目">
    </el-page-header>
    <div class="edit">
      <div class="title">用户名：{{username}}</div>
      <el-transfer
        v-model="newSubjectList"
        :props="{
      key: 'subjectId',
      label: 'subjectName'
      }"
        :titles="['所有科目', '已选科目']"
        :button-texts="['删除科目', '添加科目']"
        :data="subjectList">
      </el-transfer>
      <div style="margin-top: 30px;text-align: center">
        <el-button type="primary" @click="btnClick">修 改</el-button>
        <el-button @click="goBack">返 回</el-button>
      </div>
    </div>

  </div>
</template>

<script>
  import {request, Qs} from "network/request";

  export default {
    name: "EditUserSubject",
    data() {
      return {
        subjectList: [],
        userId: this.$route.params.id,
        username: '',
        oldSubjectList:[],
        newSubjectList: [],
      }
    },
    created() {
      request({
        method: 'get',
        url: '/user/' + this.userId,
      }).then(res => {
        if (!res.data.success) {
          this.$message.error(res.data.message);
        } else {
          this.username = res.data.data.user.userName;
        }
      }).catch(res => {
          this.$message.error("查询信息失败，请稍后再试");
        }
      )

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

      request({
        method: 'get',
        url: '/user/' + this.userId + '/subject',
      }).then(res => {
        if (res.data.data !== null) {
          for (let sub of res.data.data) {
            this.newSubjectList.push(sub.subjectId)
            this.oldSubjectList.push(sub.subjectId)
          }
        }
      })
    },
    methods: {
      goBack() {
        this.$router.go(-1);
      },
      btnClick() {
        let data = {
          newSubjectId: this.newSubjectList.toString(),
          oldSubjectId: this.oldSubjectList.toString()
        }
        request({
          method: 'put',
          url: '/user/subject/' + this.userId,
          data: Qs.stringify(data),
        }).then(res => {
          if (!res.data.success) {
            this.$message.error(res.data.message);
          } else {
            this.$message({
              message:'修改成功!',
              type:'success'
            })
          }
        }).catch(res => {
            this.$message.error("修改失败，请稍后再试");
          }
        )
      }
    }
  }
</script>

<style scoped>
  .edit {
    margin: 0 auto;
    margin-top: 20px;
    width: 700px;
  }

  .title {
    margin-top: 30px;
    text-align: center;
    font-size: 20px;
    margin-bottom: 30px;
  }
</style>
