<template>
  <div id="app">
    <el-container>
      <el-header style="height: 61px" >
        <Menu ></Menu>
      </el-header>
      <el-main>
        <router-view/>
      </el-main>
      <el-footer style="height: 100px">
        <Footer></Footer>
      </el-footer>
    </el-container>
  </div>
</template>

<script>
  import Menu from "./views/menu/Menu"
  import Home from "./views/Home";
  import Footer from "./views/footer/Footer";

  export default {
    name: "App",
    components: {
      Menu,
      Home,
      Footer
    },
    mounted() {
     /* const oScript = document.createElement('script');
      oScript.type = 'text/javascript';
      oScript.src = 'http://pv.sohu.com/cityjson?ie=utf-8';
      document.body.appendChild(oScript);
      oScript.src = 'https://ssl.captcha.qq.com/TCaptcha.js';
      document.body.appendChild(oScript);*/
    }
  }
</script>
<style>
  @import "assets/css/base.css";

  .el-container {
    width: 1190px;
    border: 1px solid #eee;
    margin: 0 auto
  }

  .el-header {
    border-bottom: 1px solid #dcdfe6;
    color: #409EFF;
  }

  .el-footer{
    border-top: 1px solid #dcdfe6;
  }
</style>
