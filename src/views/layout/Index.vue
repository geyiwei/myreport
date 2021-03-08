<!--
作者：葛以伟
时间：10:35 2021-02-02
-->
<template>
  <div>
    <el-container :style="{ height: '100%' }">
      <el-header
          class="navbar"
          height="64px"
      >
        <header-page></header-page>
      </el-header>
      <el-container :style="{ overflow: 'hidden' }">
        <el-aside
            class="sidebar"
            ref="menu"
            id="menu"
            :class="collapse ? 'sidebar--collapse' : ''"
            :width="collapse ? '64px' : '256px'"
        >
          <aside-page v-on:update-collapse="updateCollapse" :collapse="collapse"></aside-page>
        </el-aside>
        <el-main class="app-main">
          <transition
              mode="out-in"
              name="fade"
          >
            <router-view class="app-main-content"></router-view>
          </transition>
          <footer-page class="app-main-footer"></footer-page>
        </el-main>
      </el-container>

    </el-container>

  </div>


</template>

<script>
import Vue from 'vue'
import AsidePage from "./components/Aside";
import HeaderPage from "./components/Header";
import FooterPage from "./components/Footer";
export default {
  components: {
    AsidePage,
    HeaderPage,
    FooterPage
  },
  data() {
    return {
      collapse: !true
    };
  },
  methods:{
    updateCollapse(data){
      this.collapse = data;
      setTimeout(()=>{
        console.log($("#menu")[0].clientWidth)
        window.updateCollapse(true);
      },200)
    }
  },
  created() {

    if (window.innerWidth < 1400) {
      this.collapse = true;

    }

  }
};
</script>

<style lang="scss">
@import "./style.scss";
.outMast{
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0,0,0,0.3);

}
</style>


