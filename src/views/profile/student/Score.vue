<template>
  <h2>user score</h2>
</template>

<script>
  import {request, Qs} from "network/request";

  export default {
    name: "Score",
    data(){
      return{
        scoreList:[]
      }
    },
    created() {
      request({
        method: 'get',
        url: '/score/'+this.$store.state.user.userId+"/student",
      }).then(res => {
        if (!res.data.success) {
          this.$message.error('您还没有成绩信息');
        } else {
          this.scoreList = res.data.data;
          console.log(this.scoreList);
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
