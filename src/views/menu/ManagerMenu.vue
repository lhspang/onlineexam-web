<template>
  <el-menu
    :default-active="this.$route.path"
    class="el-menu-vertical-demo"
    @select="handleSelect">
    <el-menu-item index="/profile/index">
      <i class="el-icon-menu"></i>
      <span slot="title">欢迎页</span>
    </el-menu-item>
    <el-submenu index="1">
      <template slot="title">
        <i class="el-icon-location"></i>
        <span>科目管理</span>
      </template>
      <el-menu-item index="/profile/subject/add">添加科目</el-menu-item>
      <el-menu-item index="/profile/subject/all">查询科目</el-menu-item>
    </el-submenu>
    <el-submenu index="2">
      <template slot="title">
        <i class="el-icon-location"></i>
        <span>人员管理</span>
      </template>
<!--      <el-menu-item index="/profile/user/add">添加人员</el-menu-item>-->
      <el-menu-item index="/profile/user/all">查询人员</el-menu-item>
    </el-submenu>
    <el-submenu index="3">
      <template slot="title">
        <i class="el-icon-location"></i>
        <span>成绩管理</span>
      </template>
      <el-menu-item index="/profile/score/all">查询成绩</el-menu-item>
    </el-submenu>

    <el-menu-item index="/profile/info">
      <i class="el-icon-setting"></i>
      <span slot="title">个人信息</span>
    </el-menu-item>
  </el-menu>
</template>

<script>
  export default {
    name: "ManagerMenu",
    methods: {
      handleOpen(key, keyPath) {
        console.log(key, keyPath);
      },
      handleClose(key, keyPath) {
        console.log(key, keyPath);
      },
      handleSelect(key, keyPath) {
        this.$router.push(key)
      }
    }
  }
</script>

<style scoped>

</style>
