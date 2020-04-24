<template>
  <el-menu
    default-active="examlist"
    class="el-menu-vertical-demo"
    @open="handleOpen"
    @close="handleClose"
    @select="handleSelect">
    <el-menu-item index="examlist">
      <i class="el-icon-menu"></i>
      <span slot="title">选择考试</span>
    </el-menu-item>
    <el-menu-item index="test">
      <i class="el-icon-menu"></i>
      <span slot="title">练习中心</span>
    </el-menu-item>
    <el-menu-item index="score">
      <i class="el-icon-document"></i>
      <span slot="title">我的成绩</span>
    </el-menu-item>
    <el-menu-item index="info">
      <i class="el-icon-setting"></i>
      <span slot="title">个人信息</span>
    </el-menu-item>
  </el-menu>
</template>

<script>
  export default {
    name: "UserMenu",
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
