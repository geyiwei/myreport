/**
 *
 *作者：葛以伟
 *时间：14:36 2021-02-02
 *描述：
 *
 **/
import Datagrid from './src/main.vue'

// 为组件添加 install 方法，用于按需引入
Datagrid.install = function (Vue) {
    Vue.component(Datagrid.name, Datagrid)
}

export default Datagrid