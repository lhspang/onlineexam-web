<template>
  <div>
    <div class="logo">
      <a href="/">在线考试系统</a>
    </div>
    <div class="menu">
      <el-menu :default-active="activeIndex"
               class="el-menu-demo"
               mode="horizontal"
               text-color="#409EFF"
               @select="handleSelect">
        <el-menu-item index="/">首页</el-menu-item>
        <el-menu-item index="/zhibo">直播</el-menu-item>
        <el-menu-item index="/kecheng">课程</el-menu-item>
        <el-menu-item index="/about">关于我们</el-menu-item>
        <el-menu-item index="/login" v-show="!isShow">登录</el-menu-item>
        <el-menu-item index="/register" v-show="!isShow">注册</el-menu-item>
        <el-menu-item index="/profile/examlist" v-show="isShow">个人中心</el-menu-item>
        <el-menu-item index="/logout" v-show="isShow">退出</el-menu-item>
      </el-menu>
    </div>
  </div>
</template>

<script>
  export default {
    name: "Menu",
    data() {
      return {
        activeIndex: '1',
        activeIndex2: '1',
        isShow: localStorage.getItem("isAuth")
      };
    },
    methods: {
      handleSelect(key, keyPath) {
        if (key === "/logout") {
          localStorage.clear();
          window.location.href = "/"
        } else {
          this.$router.push(key)
        }
      }
    }
  }
</script>

<style scoped>
  .logo {
    float: left;
    height: 61px;
    line-height: 61px;
  }

  .menu {
    float: right;
  }

</style>
