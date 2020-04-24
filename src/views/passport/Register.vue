<template>
  <div class="main">
    <div class="main_right">
      <div class="main_r_title">
        <div class="title_left">
          <img src="~assets/img/passport/user.png"/>
          <div class="pp">注册</div>
        </div>
        <div class="title_right">
          <div class="title_right_txt">已有账号？<a href="/login"><span class="blue">立即登录</span></a></div>
        </div>
      </div>
      <div class="main_r_content">
        <el-form label-position="right" ref="formLabelAlign" :rules="rules" label-width="80px" :model="formLabelAlign">
          <el-form-item label="手机号" prop="phone">
            <el-input v-model="formLabelAlign.phone"></el-input>
          </el-form-item>
          <el-form-item label="验证码" prop="code">
            <el-input style="width: 100px" v-model="formLabelAlign.code"></el-input>
            <el-button class="sentCode" @click="codeBtnClick" v-show="isDisable" type="primary">发送验证码
            </el-button>
            <el-button class="sentCode" @click="codeBtnClick" v-show="!isDisable" disabled type="primary">{{count}}秒
            </el-button>
          </el-form-item>
          <el-form-item label="用户名" prop="username">
            <el-input v-model="formLabelAlign.username"></el-input>
          </el-form-item>
          <el-form-item label="密码" prop="password">
            <el-input v-model="formLabelAlign.password" show-password></el-input>
          </el-form-item>
          <el-form-item label="重复密码" prop="repass">
            <el-input v-model="formLabelAlign.repass" show-password></el-input>
          </el-form-item>
        </el-form>
        <el-button class="login_btn" @click="registerBtnClick('formLabelAlign')" type="primary">注册</el-button>
      </div>
    </div>
  </div>
</template>

<script>
  import {request,Qs} from "network/request";

  export default {
    name: "Register",
    data() {
      const registerCheckPhone = (rule, value, callback) => {
        request({
          url: '/register/check',
          params: {
            account: this.formLabelAlign.phone
          }
        }).then(res => {
          if (!res.data.success) {
            callback(new Error(res.data.message));
          } else {
            callback();
          }
        })
      };
      const registerCheckName = (rule, value, callback) => {
        request({
          url: '/register/check',
          params: {
            account: this.formLabelAlign.username
          }
        }).then(res => {
          if (!res.data.success) {
            callback(new Error(res.data.message));
          } else {
            callback();
          }
        })
      };
      const validateRePass = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请再次输入密码'));
        } else if (value !== this.formLabelAlign.password) {
          callback(new Error('两次输入密码不一致!'));
        } else {
          callback();
        }
      };
      const validatePhone = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('手机号不能为空'));
        } else if (!(/^1[3456789]\d{9}$/.test(value))) {
          callback(new Error('手机号格式不正确'));
        } else {
          callback();
        }
      };
      return {
        isDisable: true,
        count: 60,
        formLabelAlign: {
          phone: '',
          code: '',
          username: '',
          password: '',
          repass: ''
        },
        rules: {
          phone: [
            {validator: validatePhone, trigger: 'blur'},
            {validator: registerCheckPhone, trigger: 'blur'}
          ],
          code: [
            {required: true, message: '验证码不能为空', trigger: 'blur'}
          ],
          username: [
            {required: true, message: '请输入用户名', trigger: 'blur'},
            {min: 3, max: 10, message: '长度在 3 到 10 个字符', trigger: 'blur'},
            {validator: registerCheckName, trigger: 'blur'}
          ],
          password: [
            {required: true, message: '请输入密码', trigger: 'blur'},
            {min: 8, max: 16, message: '长度在 8 到 16 个字符', trigger: 'blur'}
          ],
          repass: [
            {validator: validateRePass, trigger: 'blur'}
          ]
        }
      }
    },
    methods: {
      codeBtnClick() {
        if (!(/^1[3456789]\d{9}$/.test(this.formLabelAlign.phone))) {
          this.$message.error("手机号格式有误");
        } else {
          request({
            url: "/captcha/sent",
            params: {
              phone: this.formLabelAlign.phone
            }
          }).then(res => {
            if (!res.data.success) {
              this.$message.error(res.data.message);
            } else {
              this.$message({
                message: "发送成功",
                type: 'success'
              });
            }
          });
          let interval = setInterval(() => {
            this.isDisable = false;
            this.count--;
            if (this.count <= 0) {
              this.isDisable = true;
              this.count = 60;
              clearInterval(interval);
            }
          }, 1000)
        }
      },
      registerBtnClick(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            request({
              url: '/captcha/verify',
              params: {
                phone: this.formLabelAlign.phone,
                code: this.formLabelAlign.code
              }
            }).then(res => {
              if (!res.data.success) {
                this.$message.error(res.data.message);
              } else {
                let data = {
                  username: this.formLabelAlign.username,
                  phone: this.formLabelAlign.phone,
                  password: this.formLabelAlign.password
                }
                request({
                  method: 'post',
                  url: '/register',
                  data: Qs.stringify(data)
                }).then(res => {
                  if (!res.data.success) {
                    this.$message.error(res.data.message);
                  } else {
                    this.$message({
                      message:"注册成功",
                      type:'success'
                    });
                    this.$router.push({path:'/login'})
                  }
                })
              }
            })
          } else {
            return false;
          }
        });
      }
    }
  }
</script>

<style scoped>
  .main {
    height: 560px;
    width: 100%;
    background: url(~assets/img/passport/bk-login.png) no-repeat;
    background-size: 100% 100%;
    overflow: hidden;
    margin: 0 auto;
  }

  .main_right {
    width: 456px;
    height: 520px;
    float: right;
    margin-top: 20px;
    margin-right: 36px;
    background-color: rgba(255, 255, 255, .7);
    border-radius: 4px;
    box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
    position: relative;
  }

  .main_r_title {
    height: 74px;
    margin: 0 20px;
    margin-top: 20px;
    border-bottom: 1px solid #cccccc;
  }

  .title_left img {
    float: left;
    height: 68px;
  }

  .title_left .pp {
    float: left;
    height: 70px;
    line-height: 70px;
    font-size: 18px;
    color: #333;
    padding-left: 20px;
    letter-spacing: 9px;
  }

  .title_left {
    float: left;
  }

  .title_right {
    float: right;
    height: 70px;
    font-size: 14px;
    color: #666;
  }

  .title_right_txt {
    margin-top: 50px;
  }

  .main_r_content {
    margin-left: 78px;
    margin-right: 78px;
    margin-top: 30px;
  }

  .sentCode {
    margin-left: 25px;
    width: 92px;
  }

  .el-input {
    /*width: 300px;*/
    border: 1px solid #ccc;
  }

  /*.xieyi {
    clear: both;
    padding-top: 35px;
    font-size: 14px;
    color: #5a5a5a;
    height: 30px;
    line-height: 30px
  }*/

  .login_btn {
    width: 300px;
    height: 40px;
    margin-top: 30px;
  }
</style>
