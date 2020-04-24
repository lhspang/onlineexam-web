<template>
  <el-row :gutter="20">
    <el-col :span="12" :offset="6">

        <div>在线考试系统</div>
        <div>COPYRIGHT © 2016 – 2020 SEN CO.,LTD. ALL RIGHTS RESERVED</div>

    </el-col>
  </el-row>
</template>

<script>
  export default {
    name: "Footer"
  }
</script>

<style scoped>
  .el-row {
    /*margin-bottom: 20px;*/

  }

  .el-col {
    border-radius: 4px;
    text-align: center;
    height: 50px;
    line-height: 50px;
  }
</style>
