/**
 *
 *作者：葛以伟
 *时间：14:04 2021-02-02
 *描述：
 *
 **/
import Vue from 'vue'
import BreadCrumb from './breadcrumb/index'
import UserAvatar from './user-avatar/index'
import dataGrid from './datagrid/index'
const components = [
    BreadCrumb,
    UserAvatar,
    dataGrid
];

components.forEach(component => {
    Vue.component(component.name, component)
})