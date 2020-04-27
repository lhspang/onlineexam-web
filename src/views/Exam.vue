<template>
  <el-container>
    <el-header>
      <div style="margin: 0 auto;width: 300px;">
        <h1 style="text-align: center;margin-top: 20px">{{exam.examName}}</h1>
        <h2 style="text-align: center;margin-top: 20px">倒计时： {{minutes}} 分 {{second}} 秒</h2>
      </div>
    </el-header>
    <el-main>
      <div class="pan">
        <div class="title">一、判断题(共 {{panList.length}} 道)</div>
        <div class="exam_item" v-for="(item,index) in panList">
          <div class="item_desc">
            {{index+1}}.{{item.problem.problemDesc}}
          </div>
          <div class="item_option">
            <el-radio-group v-model="panAndDanOptions[item.problem.problemId]">
              <el-radio :label="1">{{item.problem.problemOption1}}</el-radio>
              <el-radio :label="2">{{item.problem.problemOption2}}</el-radio>
            </el-radio-group>
          </div>
        </div>
      </div>
      <div class="dan">
        <div class="title">二、单选题(共 {{danList.length}} 道)</div>
        <div class="exam_item" v-for="(item,index) in danList">
          <div class="item_desc">
            {{index+1}}.{{item.problem.problemDesc}}
          </div>
          <div class="item_option">
            <el-radio-group v-model="panAndDanOptions[item.problem.problemId]">
              <el-radio :label="1">{{item.problem.problemOption1}}</el-radio>
              <el-radio :label="2">{{item.problem.problemOption2}}</el-radio>
              <el-radio :label="3">{{item.problem.problemOption3}}</el-radio>
              <el-radio :label="4">{{item.problem.problemOption4}}</el-radio>
            </el-radio-group>
          </div>
        </div>
      </div>
      <div class="duo">
        <div class="title">三、多选题(共 {{duoList.length}} 道)</div>
        <div class="exam_item" v-for="(item,index) in duoList">
          <div class="item_desc">
            {{index+1}}.{{item.problem.problemDesc}}
          </div>
          <div class="item_option">
            <el-checkbox-group v-model="duoOptions[item.problem.problemId]">
              <el-checkbox :label="item.problem.problemOption1"></el-checkbox>
              <el-checkbox :label="item.problem.problemOption2"></el-checkbox>
              <el-checkbox :label="item.problem.problemOption3"></el-checkbox>
              <el-checkbox :label="item.problem.problemOption4"></el-checkbox>
            </el-checkbox-group>
          </div>
        </div>
      </div>
      <div style="margin-top: 40px">
        <el-button type="primary" @click="btnClick">提交试卷</el-button>
      </div>

    </el-main>
  </el-container>
</template>

<script>
  import {request, Qs} from "network/request";

  export default {
    name: "Exam",
    data() {
      return {
        exam: '',
        panList: [],
        danList: [],
        duoList: [],
        userId: this.$store.state.user.userId,
        examId: this.$route.params.id,
        minutes: 0, //分
        seconds: 0, //秒
        panAndDanOptions: {},
        duoOptions: {},
      }
    },
    created() {
      request({
        method: 'get',
        url: '/exam/' + this.examId + "/student",
      }).then(res => {
        if (!res.data.success) {
          this.$message.error(res.data.message);
        } else {
          this.exam = res.data.data.exam;
          this.panList = res.data.data.item.filter((obj) => obj.problem.protype.protypeName === '判断');
          this.danList = res.data.data.item.filter((obj) => obj.problem.protype.protypeName === '单选');
          this.duoList = res.data.data.item.filter((obj) => obj.problem.protype.protypeName === '多选');
          this.minutes = res.data.data.exam.examLong;
          for (let obj of this.panList) {
            this.$set(this.panAndDanOptions, obj.problem.problemId, '');
          }
          for (let obj of this.danList) {
            this.$set(this.panAndDanOptions, obj.problem.problemId, '');
          }
          for (let obj of this.duoList) {
            this.$set(this.duoOptions, obj.problem.problemId, []);
          }
        }
      }).catch(res => {
          this.$message.error("查询信息失败，请稍后再试");
        }
      )
    },
    methods: {
      num(n) {
        // 倒计时结束重新刷新页面
        if (this.minutes === 15 && this.seconds === 0) {
          this.$message.warning('考试还剩15分钟结束!请抓紧时间!');
        }
        if (this.minutes === 0 && this.seconds === 30) {
          this.$message.error("30秒后将自动提交试卷");
        }
        if (this.minutes === 0 && this.seconds === 1) {
          this.btnClick();
        }
        return n < 10 ? '0' + n : '' + n;
      },
      // 倒计时
      timer() {
        const _this = this;
        const time = window.setInterval(function () {
          if (_this.seconds === 0 && _this.minutes !== 0) {
            _this.seconds = 59;
            _this.minutes -= 1;
          } else if (_this.minutes === 0 && _this.seconds === 0) {
            _this.seconds = 0;
            window.clearInterval(time);
          } else {
            _this.seconds -= 1;
          }
        }, 1000);
      },
      btnClick() {
        let data = {
          userId: this.userId,
          examId: this.examId,
          panAndDanOptions: Qs.stringify(this.panAndDanOptions),
          duoOptions: JSON.stringify(this.duoOptions),
        }
        request({
          method: 'post',
          url: '/score',
          data: Qs.stringify(data),
        }).then(res => {
          if (!res.data.success) {
            this.$message.error(res.data.message);
          } else {
            this.$message({
              message:'提交成功，请到成绩查询页面查询成绩',
              type:'success'
            });
            this.$router.push("/profile/index")
          }
        })
      }
    },
    mounted() {
      // 倒计时
      this.timer();
    },
    watch: {
      // 倒计时
      second: {
        handler(newVal) {
          this.num(newVal);
        },
      },
      // 倒计时
      minute: {
        handler(newVal) {
          this.num(newVal);
        },
      },
    },
    computed: {
      // 倒计时
      second: function () {
        return this.num(this.seconds);
      },
      minute: function () {
        return this.num(this.minutes);
      },
    }
  }
</script>

<style scoped>
  .el-container {
    width: 800px;
    margin: 0 auto;
  }

  .el-main {
    margin: 0 auto;
    margin-top: 20px;
    width: 500px;
  }

  .pan {
    margin-top: 20px;
  }

  .dan {
    margin-top: 20px;
  }

  .duo {
    margin-top: 20px;
  }

  .title {
    font-size: 20px;
  }

  .exam_item {
    margin-top: 30px;
  }

  .item_desc {
    font-size: 15px;
  }

  .item_option {
    font-size: 10px;
    margin-top: 20px;
  }
</style>
