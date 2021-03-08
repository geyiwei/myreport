/**
 *
 *作者：葛以伟
 *时间：11:25 2021-01-29
 *描述：环境变量配置
 *
 **/

//服务器跟路径 : http://ip:port
const root_url = `${window.location.protocol}//${window.location.host}`

//应用路径 : http://ip:port/appname
const root_app_url = root_url + '/ntzw';
const baobiaoIP = "http://192.168.10.62:8099";
window.serverUrls = {
    isShowLogo: true,
    centerDialogVisible:true,
    //生产环境应用路径
    serverProd: root_app_url + '/',

    //生产环境的应用+接口路径，http://ip:port/appname/api/
    serverApiProd: root_app_url + '/api/'

}