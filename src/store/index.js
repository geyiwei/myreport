import Vue from 'vue'
import Vuex from 'vuex'
import setting from "@/setting";

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    // 用户头像
    userAvatar: "",
    // 菜单列表
    menuList: [],
    // 菜单权限
    menuPower: [],
    // 资源注册
    register: null,
    // 我订阅的数据详情
    subscribe: null,
    //交换任务详情值
    taskRow: {},
    //平台角色
    platformRole: "sysadm",
    serverUrls: setting.serverUrls || {},
    //资源编码名称
    queryTerms:{},
    //订阅信息
    subscribeInfo:{},
  },
  mutations: {
    userAvatar(state, data) {
      state.userAvatar = data;
    },
    menuList(state, data) {
      state.menuList = data;
    },
    menuPower(state, data) {
      state.menuPower = data;
    },
    register(state, data) {
      state.register = data;
    },
    subscribe(state, data) {
      state.subscribe = data;
    },
    subscribeInfo(state, data) {
      state.subscribeInfo = data;
    },
    taskRow(state, data) {
      state.taskRow = data;
    },
    queryTerms(state, data) {
      state.queryTerms = data;
    },
  },
  actions: {
    userAvatar(context, data) {
      context.commit('userAvatar', data)
    },
    menuPower(context, data) {
      context.commit('menuPower', data)
    },
    menuList(context, data) {
      context.commit('menuList', data)
    },
    register(context, data) {
      context.commit('register', data)
    },
    subscribe(context, data) {
      context.commit('subscribe', data)
    },
  },
  modules: {
  }
})
