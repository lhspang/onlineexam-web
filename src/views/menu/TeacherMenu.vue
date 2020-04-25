<template>
  <el-menu
    :default-active="this.$route.path"
    class="el-menu-vertical-demo"
    @select="handleSelect">
    <el-menu-item index="/profile/index">
      <i class="el-icon-menu"></i>
      <span slot="title">系统信息</span>
    </el-menu-item>
    <el-submenu index="1">
      <template slot="title">
        <i class="el-icon-location"></i>
        <span>题库管理</span>
      </template>
        <el-menu-item index="/profile/problem/add">添加试题</el-menu-item>
        <el-menu-item index="/profile/problem/all">查询试题</el-menu-item>
    </el-submenu>
    <el-submenu index="2">
      <template slot="title">
        <i class="el-icon-location"></i>
        <span>考试管理</span>
      </template>
      <el-menu-item index="/profile/exam/add">添加考试</el-menu-item>
      <el-menu-item index="/profile/exam/all">查询考试</el-menu-item>
    </el-submenu>
    <el-submenu index="3">
      <template slot="title">
        <i class="el-icon-location"></i>
        <span>成绩管理</span>
      </template>
<!--      <el-menu-item index="/profile/problem/add">添加试题</el-menu-item>-->
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
    name: "TeacherMenu",
    methods: {
      handleSelect(key, keyPath) {
        this.$router.push(key)
      }
    }
  }
</script>

<style scoped>

</style>
