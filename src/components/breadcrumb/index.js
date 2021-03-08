/**
 *
 *作者：葛以伟
 *时间：14:21 2021-02-02
 *描述：
 *
 **/

import Breadcrumb from './BreadCrumb.vue';

Breadcrumb.install = Vue => {
    Vue.component(Breadcrumb.name, Breadcrumb);
}

export default Breadcrumb;
