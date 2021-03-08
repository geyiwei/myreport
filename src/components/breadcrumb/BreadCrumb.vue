<!--
作者：葛以伟
时间：14:20 2021-02-02
-->
<template>
  <div class="breadcrumb">
    <el-button
        type="text"
        size="medium"
        @click="handleReturnBack"
        class="back"
        v-if="back"
    >
      <i class="iconfont icon-return-back"></i>
    </el-button>
    <el-breadcrumb separator="/">
      <template v-for="(item, index) in data">
        <el-breadcrumb-item
            v-if="item.meta.title"
            :key="item.name"
            :to="index > 0 ? {path: item.path} : {}"
            class="breadcrumb-item"
        >{{item.meta.title}}</el-breadcrumb-item>
      </template>
    </el-breadcrumb>
  </div>
</template>

<script>
export default {
  name: "Breadcrumb",
  props: {
    back: {
      type: Boolean,
      default: true
    },
    dataList:{
      type:Array,
      default:()=>[]
    }
  },
  data() {
    return {
      data: null
    };
  },
  methods: {
    getBreadcrumb() {
      if(this.dataList && this.dataList.length){
        this.data = this.dataList;
      }else{
        this.data = this.$route.matched;
      }

    },
    handleReturnBack() {
      this.$router.back(-1);
    }
  },
  watch: {
    $route() {
      this.getBreadcrumb();
    }
  },
  created() {
    this.getBreadcrumb();


  }
};
</script>

<style lang="scss" type="text/scss">
.breadcrumb {
  margin-bottom: 12px;
  display: flex;
  .back {
    padding: 0;
    display: inline-block;
    width: 32px;
    text-align: left;

    i {
      font-size: 24px;
    }
  }
  .el-breadcrumb {
    display: inline-block;
    line-height: 26px;
    &__item:first-child {
      .el-breadcrumb__inner {
        color: rgba(0, 0, 0, 0.45);
        cursor: text;
      }
    }
    &__item:last-child {
      .el-breadcrumb__inner {
        color: rgba(0, 0, 0, 0.65);
      }
    }
    &__inner {
      font-size: 14px;
      color: rgba(0, 0, 0, 0.45);

      &.is-link {
        font-weight: normal;
      }
    }
  }
}
</style>



