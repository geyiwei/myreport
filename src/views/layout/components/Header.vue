<!--
作者：葛以伟
时间：10:37 2021-02-02
-->
<template>
  <div>
    <div class="logo">
      <img
          src="../../../assets/logo.png"
          alt=""
      >
      {{title}}
    </div>
<!--    <header-menu :style="{ marginLeft: '20px' }"></header-menu>-->

    <div class="tools">
      <header-notice></header-notice>
      <el-button @click="handleToPortal" type="text" style="color:white;fontSize:14px;position:relative;top:-10px;">
        首页
      </el-button>
      <div class="tools-divider"></div>
      <header-user></header-user>
    </div>
  </div>
</template>

<script>
import HeaderMenu from "./HeaderMenu";
import HeaderUser from "./HeaderUser";
import HeaderNotice from "./HeaderNotice";
export default {
  components: {
    HeaderMenu,
    HeaderUser,
    HeaderNotice
  },
  data() {
    return {
      title: "南通市政务数据共享交换平台"
    };
  },
  methods:{
    //跳转门户网站
    handleToPortal(){
      window.localStorage.removeItem("user");
      window.location.href =  `http://${window.location.hostname}:19090/portal/index.html?checksso=1`;
    }
  }
};
</script>

<style scoped>
.logo{
  cursor: pointer;
}
</style>

