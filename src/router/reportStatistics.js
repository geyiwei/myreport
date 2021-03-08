/**
 *
 *作者：葛以伟
 *时间：11:00 2021-02-02
 *描述：
 *
 **/

const reportStatistics = {
    path: "/reportStatistics",
    meta: {
        title: "季度统计报表"
    },
    component: resolve => require(['../views/reportStatistics/Index.vue'], resolve),
}
export default reportStatistics
