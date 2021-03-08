<!--
 * @Author: your name
 * @Date: 2020-12-10 10:24:49
 * @LastEditTime: 2021-01-22 17:14:19
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \dssp-ntzw-manager-pt-frontend\src\views\labelSystem\labelManage\index.vue
-->
<template>
  <div class="reportStatistics">
    <breadcrumb :dataList="dataList" class="page-breadcrumb" :back="false" />
    <el-card shadow="never" class="page-content">
      <iframe   @load="onLoad" id="report" style="width:100%;height:100%" frameborder="0" :src="url"></iframe>
    </el-card>

  </div>
</template>
<script>
import $ from "jquery"
export default {
  props:{

  },
  data() {
    return {
    };
  },
  computed: {
    url(){
      return baobiaoIP + this.$route.query.url;
    },
    dataList(){
      var data = [{
        meta:{
          title:'季度统计报表'
        },
        name:'季度统计报表',
        path:''
      },{
        meta:{
          title:this.$route.query.name,
        },
        name:this.$route.query.name,
        path:this.url,
      }]
      console.log(data)
      return data
    }
    // 菜单权限
  },
  methods: {
    onLoad(){
      setTimeout(()=>{
        let conxt = document.getElementById("report").contentWindow;
        console.log("conetxt",conxt)

      },500)
    }
  },

  created() {
    console.log("url",this.$route.query.url);
    this.$nextTick(()=>{
      let style= `
                <style>
                    .copyrightInfo-div{
                        display:none
                    }
                </style>
            `
      $($("#report").contents().context).find("head").append(style);

    })
  },


};
</script>
<style lang="scss">
.reportStatistics {
  .el-card{
    height:calc(100% - 50px)
  }
  .el-card__body {
    height:100%
  }

}
.copyrightInfo-div{
  display: none;
}
</style>
