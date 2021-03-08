<!--
作者：葛以伟
时间：10:38 2021-02-02
-->
<template>
  <el-dropdown
      class="tools-item"
      placement="bottom-start"
      size="medium"
      @command="handleCommand"
      trigger="hover"
  >
    <div>
      <span class="avatar">
        <user-avatar></user-avatar>
      </span>
      <span class="name">{{user.loginName}}</span>
      <i class="el-icon-arrow-down" :style="{ marginLeft: '6px' }"></i>
    </div>
    <el-dropdown-menu slot="dropdown" class="user-dropdown" :style="{ width: '128px' }">
      <!-- <el-dropdown-item command="personal">账号信息</el-dropdown-item>
      <el-dropdown-item command="security">安全设置</el-dropdown-item>-->
      <el-dropdown-item command="logout">退出</el-dropdown-item>
    </el-dropdown-menu>
  </el-dropdown>
</template>

<script>
export default {
  data() {
    return {};
  },

  computed: {
    user() {
      const user = window.localStorage.getItem("user");

      if (!user) {
        return "--";
      }
      return JSON.parse(user).loginUserProfileDTO;
    },
    serverUrl () {
      // console.log(this.$store.state.serverUrl)
      return this.$store.state.serverUrl
    }
  },

  methods: {
    handleCommand(command) {
      command === "personal"
          ? this.handlePersonal()
          : command === "security"
          ? this.handleSecurity()
          : this.handleLogout();
    },
    //  个人中心
    handlePersonal() {
      this.$router.push("/personal/account");
    },
    handleSecurity() {
      this.$router.push("/personal/security");
    },
    setCookie(cname, cvalue, exdays){
      var d = new Date();
      d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
      var expires = "expires=" + d.toUTCString();
      document.cookie = cname + "=" + cvalue + "; " + expires;
    },
    //  退出
    handleLogout(e) {
      //  this.$axios
      //     .post("/login/logout")
      //     .then(res => {
      //         window.localStorage.removeItem("user");
      //         this.$router.push("/login");
      //     })
      //     .catch(err => {});
      this.setCookie("current_user", "",-1);
      window.localStorage.removeItem("user");
      var server_logout = this.$axios.staticResURL + "/logout/cas";
      if (process.env.NODE_ENV != "production") {
        server_logout = this.serverUrl.targetServerDev + "/logout/cas";
      }
      console.log("server_logout",server_logout)
      window.location.href = server_logout;
    }
  },
  mounted(){
    console.log(this.setCookie);
  },
  created() {
  }
};
</script>

<style lang="scss" scoped>
.avatar {
  display: inline-block;
  vertical-align: middle;
  width: 32px;
  height: 32px;
  line-height: 26px;
  margin-right: 6px;

  img {
    width: 100%;
    height: 100%;
    display: block;
    border-radius: 50%;
  }
}
</style>


