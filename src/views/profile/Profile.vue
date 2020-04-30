<template>
  <el-container style="height: 700px">
    <el-aside width="200px">
      <StudentMenu v-show="roleName==='学生'"></StudentMenu>
      <TeacherMenu v-show="roleName==='老师'"></TeacherMenu>
      <ManagerMenu v-show="roleName==='管理员'"></ManagerMenu>
    </el-aside>
    <el-main >
      <router-view></router-view>
    </el-main>
  </el-container>

</template>

<script>
  import StudentMenu from "views/menu/StudentMenu";
  import TeacherMenu from "views/menu/TeacherMenu";
  import ManagerMenu from "views/menu/ManagerMenu";
  import {request, Qs} from "network/request";

  export default {
    name: "Profile",
    data() {
      return {
        roleName: this.$store.state.user.roleName,
        isLogin: this.$store.state.user.isLogin
      }
    },
    created() {
      if (!this.isLogin) {
        window.location.href = "/login"
      } else {
        request({
          method: 'get',
          url: '/user/' + this.$store.state.user.userId,
        }).then(res => {
          if (!res.data.success) {
            this.$message.error(res.data.message);
          } else {
            this.$store.commit("getUserInfo", res.data.data)
          }
        }).catch(res => {
            this.$message.error("查询信息失败，请稍后再试");
          }
        )
      }
    },
    components: {
      StudentMenu,
      TeacherMenu,
      ManagerMenu
    }
  }
</script>

<style scoped>

</style>
