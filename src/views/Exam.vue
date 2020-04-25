<template>
  <el-container>
    <el-main>
      <h2>main</h2>
    </el-main>
    <el-aside width="300px">
      <h2>aside</h2>
    </el-aside>
  </el-container>
</template>

<script>
  export default {
    name: "Exam",
    data(){
      return{
        examId:0
      }
    },
    created() {
      console.log(this.$route.params.id);
    }
  }
</script>

<style scoped>

</style>
