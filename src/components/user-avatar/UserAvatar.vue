<!--
作者：葛以伟
时间：14:03 2021-02-02
-->
<template>
  <img
      :src="src"
      ref="avatar"
      alt=""
  >
</template>

<script>
export default {
  name: "UserAvatar",
  data() {
    return {
      src: require("@/assets/user_default.png")
    };
  },

  computed: {
    userAvatar() {
      return this.$store.state.userAvatar;
    }
  },

  watch: {
    userAvatar(userAvatar) {
      this.onLoadSuccess(userAvatar);
    }
  },

  methods: {
    // 请求用户信息
    requestUser() {
      // 获取用户ID
      const userID = JSON.parse(window.localStorage.getItem("user"))
          .loginUserProfileDTO.id;

      this.$axios
          .get("sysuser/findSysUserById", {
            params: {
              id: userID
            }
          })
          .then(res => {
            this.onLoadSuccess(res.headPortrait);
          })
          .catch(err => {});
    },
    // 成功回调
    onLoadSuccess(src) {
      if (!src) return;
      const newImage = new Image();
      const img = this.$refs.avatar;
      const isPath = src.indexOf("http") > -1;
      if (process.env.NODE_ENV === "production") {
        newImage.src = src;
      } else {
        newImage.src = isPath
            ? src
            : "http://192.168.10.72:9000/ntzw/" + src;
      }
      newImage.onload = () => {
        img.src = newImage.src;
        this.$store.dispatch("userAvatar", newImage.src);
      };
      newImage.onerror = () => {
        this.src = require("@/assets/user_default.png");
      };
    }
  },
  created() {
    this.requestUser();
  }
};
</script>

<style>
</style>


