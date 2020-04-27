<template>
  <el-table
    :data="subjectList"
    border
    stripe
    size="medium "
    style="width: 100%">
    <el-table-column
      type="index">
    </el-table-column>
    <el-table-column
      prop="subjectName"
      label="科目名称"
      width="180">
    </el-table-column>

    </el-table-column>
  </el-table>
</template>

<script>
  import {request, Qs} from "network/request";

  export default {
    name: "QuerySubject",
    data(){
      return{
        subjectList: [],
      }
    },
    created() {
      request({
        method: 'get',
        url: '/subject/all'
      }).then(res => {
        if (!res.data.success) {
          this.$message.error(res.data.message);
        } else {
          this.subjectList = res.data.data;
        }
      }).catch(res => {
          this.$message.error("查询信息失败，请稍后再试");
        }
      )
    }
  }
</script>

<style scoped>

</style>
