<!--
作者：葛以伟
时间：10:37 2021-02-02
-->
<template>
  <el-popover class="tools-item" placement="right" width="520" :visible-arrow="true" >

    <div class="menu" style="display:inline-block; width:520px">
      <div v-for="menu in menuList" :key="menu.id" class="menu-item">
        <p class="menu-item__title" style="color:rgb(0, 127, 234)">
          <img
              style="width:30px;height:30px; margin-bottom: -9px;"
              src="../../../assets/msg.png"
              alt
          />
          {{ menu.title }}
        </p>

        <div style="width:143px;height:2px;border:1px solid #DCDFE6;margin-bottom:10px"></div>
        <!-- <hr style="wisth:150px"/> -->

        <div class="submenu" style="text-align:center;width:143px" >
          <div
              v-for="child in menu.children"
              :key="child.id"
              class="submenu-item"
              @click="handleClick(menu, child)"
          >
            <p>{{ child.title }}</p>
          </div>
        </div>
      </div>
    </div>
    <span slot="reference" :style="{ display: 'block', lineHeight: '64px', padding: '0 12px' }">
      产品和服务
      <i class="el-icon-caret-bottom" style="margin-left:5px"></i>
    </span>
  </el-popover>
</template>

<script>
export default {
  data() {
    return {
      drawer: false,
      menuList: []
    };
  },
  methods: {
    handleOpen() {
      this.drawer = true;
    },
    requestMenuList() {
      // 通过USERID获取菜单
      const id = JSON.parse(window.localStorage.getItem("user"))
          .loginUserProfileDTO.id;

      // this.menuList = require("../menu.json");

      this.$axios
          .get("ntsysmenus/findMenus", {
            params: {
              userId: id,
              actionNew: "2"
            }
          })
          .then(res => {
            //console.log(res);

            this.menuList = res;
            console.log(this.menuList);
          });
    },

    handleClick(pre, cur) {
      console.log(this.$router);
      this.$store.dispatch("menuList", [cur]);
      if(cur.children.length>0){
        console.log('76行=》',cur.children[0].url)
        if(cur.children[0].url == '/specification/dictionary'){
          cur.children[0].url = '/specification/standard';
          this.$router.push(cur.children[0].url);
        }else {
          this.$router.push(cur.children[0].url);
        }
      }else{
        this.$router.push(cur.url);
      }
      this.drawer = false;
    }
  },
  created() {
    this.requestMenuList();
  }
};
</script>


<style lang="scss" scoped>
.menu-item__title {
  width: 130px;
  height: 100px;
  padding: 10px;
}
.el-popover {
  position: absolute !important;
  top: 54px;
  left: 281px !important;
  transform-origin: center  !important;
  z-index: 2001;
}
.menu {
  width: 480px !important;
  column-count: 3;
  column-gap: 2em;
  padding: 0 24px;

  &-item {
    break-inside: avoid;
    vertical-align: top;
    margin-bottom: 24px;

    &__title {
      height: 40px;
      line-height: 40px;
      padding: 0 10px;
      font-size: 16px;
      font-weight: 700;
      color: #111;
    }

    .submenu-item {
      display: block;
      height: 30px;
      line-height: 30px;
      padding: 0 10px;
      font-size: 14px;
      text-decoration: none;
      color: #555;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
      cursor: pointer;

      &:hover {
        background-color: rgba(0, 0, 0, 0.06);
      }
    }
  }
}
.menu-item__title{
  width:180px;
  text-align: left
}
.menu-item{
  width:180px;
  margin-right: 50px;

}
.menu{
  display: flex;
  justify-content: space-between
}
</style>


