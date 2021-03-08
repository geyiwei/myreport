<!--
作者：葛以伟
时间：10:38 2021-02-02
-->
<template>
  <div class="tools-item">
    <el-popover
        placement="bottom-end"
        width="336"
        v-model="visible"
        trigger="click"
    >
      <data-grid
          :data='annList'
          :pagination='false'
          :rownumbers='false'
      >
        <el-table-column
            label="公告通知"
            prop="name"
            align="left"
            show-overflow-tooltip
        >
          <template slot-scope="scope">
            <el-button type="text" @click.native.prevent="handleDetails(scope.row)">{{scope.row.name}}</el-button>
          </template>
        </el-table-column>
      </data-grid>
      <el-button type="text" style="float:right" @click="jumpToAnnouncement">
        更多<i class="el-icon-d-arrow-right"></i>
      </el-button>
      <div
          slot="reference"
          class="notice"
      >
        <el-badge
            :is-dot="hasNotice"
            class="badge"
        >
          <i class="iconfont icon-notice" @click="getAnnouncement"></i>
        </el-badge>
      </div>
    </el-popover>
  </div>
</template>

<script>
export default {
  name: "HeaderNotice",
  data() {
    return {
      hasNotice: true,
      activeName: "first",
      //公告列表
      annList:[],
      visible:false,
    };
  },
  methods: {
    handleClick(tab, event) {},
    jumpToAnnouncement(){
      // this.$router.push("/website/announcement").catch(err => {console.log(err)})
      this.$router.push("/website/announcement")
      this.visible = false;
    },
    getAnnouncement(){
      this.$axios
          .get("ntresNotice/findResNoticeByPageInfo")
          .then(res => {
            if(res.content.length == 0){
              this.hasNotice = false;
            }
            this.annList = res.content.splice(0,5);
          });
    },
    // 查看详情
    handleDetails(row) {
      if(window.location.hash == "#/website/announcement"){
        this.$router.push({
          path: "/website/announcement/details",
          query: {
            id: row.id
          }
        })
        this.visible = false;
      }else{
        this.$router.push("/website/announcement")
            .then(res=>{
              this.$router.push({
                path: "/website/announcement/details",
                query: {
                  id: row.id
                }
              })
              this.visible = false;
            })
      }
    },

  },
  created() {
    this.getAnnouncement();
  }
};
</script>

<style lang="scss" scoped>
.notice {
  padding: 0 12px;

  i.iconfont {
    font-size: 22px;
  }

  .badge {
    line-height: 1;
  }
}
</style>

