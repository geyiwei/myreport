<!--
作者：葛以伟
时间：10:37 2021-02-02
-->
<template>
  <div class="aside">
    <el-scrollbar ref="menuScrollbar">
      <div class="aside-con">
        <span class="aside-con__title">报表统计</span>
        <i
            class="aside-con__fold"
            :class="[!collapse ? 'el-icon-s-fold' : 'el-icon-s-unfold']"
            @click="handleCollapse"
        ></i>
      </div>
      <el-menu
          unique-opened
          router
          :collapse="collapse"
          :default-active="active"
          ref ="menu"
          @select = "activeEvent"
      >
        <template v-for="menu in menuList">
          <el-submenu
              v-if="menu.children && menu.children.length > 0"
              :key="menu.id"
              :index="menu.url"
          >
            <template slot="title">
              <i :class="menu.icon"></i>
              <span>{{menu.name}}</span>
            </template>
            <el-menu-item
                v-for="submenu in menu.children"
                :key="submenu.id"
                :index="submenu.url"
            >
              <span slot="title">{{submenu.name}}</span>
            </el-menu-item>
          </el-submenu>

          <el-menu-item
              v-else
              :key="menu.id"
              :index="menu.url"
          >
            <i :class="menu.icon"></i>
            <span slot="title">{{menu.name}}</span>
          </el-menu-item>
          <div  v-show="mask" style="position: fixed;top: 0;left: 0;width: 100%;height: 100%;background-color: rgba(0,0,0,0.5);color: red;z-index: 999999 ">
            <h1 style="position: absolute;top: 40%;left: 40%;font-size: 60px;">点击太快了</h1>
          </div>
        </template>
      </el-menu>
    </el-scrollbar>
  </div>
</template>

<script>
import Vue from 'vue'
// import jquery from "jquery";
// Vue.use(jquery);
export default {
  props: {
    collapse: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      // 当前菜单选中项ID
      activeId: "",
      active:'',
      menuList: [],
      isStatic:false,
      firstUrl2:'',
      isClick:true,
      isClickNumber:0,
      isDisabled:false,
      mask:false,
      num:0,
      startTime:'',
      endTime:''
    };
  },

  computed: {


  },
  methods: {
    activeEvent(a,b){
      var that = this;

      localStorage.removeItem(a);
      if( a.indexOf("http") >= 0){
        window.open(a);
        console.log(a);
      }


      if(this.num===0){
        this.startTime=new Date();
        this.endTime=this.startTime;
      }else if(this.num>=1){
        let nextTime=new Date();
        if((nextTime-this.endTime)>=3000 || (nextTime-this.startTime)>=5000){
          console.log('重置');
          this.startTime=nextTime;
          this.endTime=nextTime;
          this.num=0;
        }else{
          this.endTime=nextTime;
        }
        if(this.num===3){
          console.log('success');
          that.$emit('showContainer',this.clickFirst);
        }
      }
      this.num++;
      console.log(this.num);



    },
    handleCollapse() {
      this.$emit("update-collapse", !this.collapse);

    },
    requestMenuList() {
      var that = this;
      // 通过USERID获取菜单
      const id = JSON.parse(window.localStorage.getItem("user"))
          .loginUserProfileDTO.id;


      if(this.isStatic===false){


        this.$axios.get('/ntplatformRunBrief/getReport').then(res=>{
          console.log('reportList==>',res);
          var mymenuList = [{
            id:'-1',
            name:'季度统计报表',
            url:'/report',
            pid:'0',
            level:'1',
            children:[]
          }];
          var firstUrl = false;
          var res2 = res.map(item=>{
            firstUrl = firstUrl || `/reportStatistics?name=${item.name}&url=${item.url}`
            return {
              icon: "iconfont icon-journal",
              id: item.id,
              level: "2",
              menuFlag: "1",
              pid: "-1",
              sortOrder: "2",
              name: item.name,
              url: `/reportStatistics?name=${item.name}&url=${item.url}`
            }
          })
          mymenuList[0].children = res2;

          that.menuList = mymenuList;

          console.log('444',firstUrl);
          that.firstUrl2 = firstUrl

          this.$nextTick(function (){
            console.log('5555',this)
            that.active = this.firstUrl2;
            window.location.hash = this.firstUrl2;
          })

        })

      }else{
        this.$axios
            .get("ntsysmenus/findMenus", {
              params: {
                userId: id,
                actionNew: "2"
              }
            })
            .then(res => {
              let list = [];
              res.forEach(item => {
                item.children.forEach(item => {
                  list.push(item);
                });
              });
              for(let i of list){
                if(i.title == '报表系统'){
                  const href = i.url;
                  i.url = `${location.origin}${location.pathname}#${href}`
                }
              }
              this.menuList = list;

              console.log(this.menuList);
            });
      }

    },
    // 通过角色ID和菜单ID获取权限
    requestMenuOper(menuId) {
      const user = JSON.parse(window.localStorage.getItem("user"))
          .loginUserProfileDTO;

      const getMenu = roleIds => {
        // 请求权限
        this.$axios
            .get("ntsysmenus/findMenuOper", {
              params: {
                roleIds: roleIds.join(","),
                menuId: menuId
              }
            })
            .then(res => {
              const power = {};
              res.forEach(item => {
                power[item.title] = true;
              });

              if (process.env.NODE_ENV === "development") {
                power.新建 = true;
                power.新增 = true;
                power.删除 = true;
                power.修改 = true;
                power.授权 = true;
                power.查询 = true;
                power.重置 = true;
                power.批量 = true;
                power.重置密码 = true;
                power.批量导入 = true;
                power.批量导出 = true;
                power.撤销 = true;
                power.停用 = true;
                power.审核 = true;
              }

              /*   */
              const that = this;
              that.$store.dispatch("menuPower", power);
            });
      };
      console.log(window.roleIds)
      // 先通过用户ID获取角色id
      if (window.roleIds) {
        getMenu(window.roleIds);
      } else {
        this.$axios
            .get("sysuser/findSysUserById", {
              params: {
                id: user.id
              }
            })
            .then(res => {
              const roleIds = (window.roleIds = res.roleIds || []);
              getMenu(roleIds);
            });
      }
    }
  },

  created() {

    this.requestMenuList();

  },
  watch: {
    // 监听菜单选中ID
    activeId(id) {
      window.localStorage.removeItem("conditions");
      this.requestMenuOper(id);
    },
    isClick(val){
      console.log('==========isClick=>',val)
      if(!val){
        window.serverUrls.centerDialogVisible = true
      }
    }
  }
};
</script>

<style>
</style>



