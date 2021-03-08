/**
 *
 *作者：葛以伟
 *时间：14:11 2021-01-29
 *描述：vue环境变量配置
 *
 **/

//本地环境代理服务地址开关，true：要注意vue.config.js中的地址;false：正使用dev_server_addr变量。cas联调时设置设置false,请先打开cas登录页面，提前登录好后，就可以跨域请求接口了.
const proxyEnable = false;

//开发环境后台服务地址，如果未开启proxyEnable，则会以跨域的方式请求指定的服务地址；
const dev_server_addr = 'http://192.168.10.62:9000';

//研发环境: proxy server + 接口路径
const proxyServerDev = '/ntzw/';
const proxyServerApiDev = '/ntzw/api/';

//研发环境 : 跨域,目标应用路径, + 接口路径
const targetServerDev = dev_server_addr + '/ntzw/';
const targetServerApiDev = dev_server_addr + '/ntzw/api/';

export default {
    title: '南通市政务数据共享交换平台',
    serverUrls: {
        casEnv: true,
        proxyEnable:proxyEnable,

        //研发环境: 跨域,目标应用路径, + 接口路径; e.g.: http://ip:port/ntzw/
        serverDev:proxyEnable ? proxyServerDev : targetServerDev,
        serverApiDev:proxyEnable ? proxyServerApiDev : targetServerApiDev,

        //应用中统一使用的路径地址
        server: process.env.NODE_ENV === 'production' ? window.serverUrls.serverProd :(proxyEnable ? proxyServerDev : targetServerDev),
        serverApi: process.env.NODE_ENV === 'production' ? window.serverUrls.serverApiProd : (proxyEnable ? proxyServerApiDev : targetServerApiDev)
    }
}

