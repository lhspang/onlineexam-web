<template>
  <el-container>
    <el-aside width="200px">
      <UserMenu/>
    </el-aside>
    <el-main>
      <router-view></router-view>
    </el-main>
  </el-container>

</template>

<script>
  import UserMenu from "../menu/UserMenu";

  export default {
    name: "Profile",
    components:{
      UserMenu
    }
  }
</script>

<style scoped>

</style>
