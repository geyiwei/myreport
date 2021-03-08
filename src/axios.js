/**
 *
 *作者：葛以伟
 *时间：14:54 2021-01-29
 *描述：设置请求拦截
 *
 **/
import Vue from 'vue'
import axios from 'axios'
import setting from "@/setting";

const config = {
    baseURL: setting.serverUrls.serverApi,
    withCredentials: true,
    responseType: "json"
}

const _axios = axios.create(config);

_axios.interceptors.request.use(
    config =>{
        config.headers['X-Cas-ajax'] = true;
        return config;
    },
    error =>{
        return Promise.reject(error);
    }
)

_axios.interceptors.response.use(
    response => {
        const result = response.data;

        //服务器相应的数据类型，目前项目中使用的就两种：json、blob
        const responseType = response.config.responseType;

        //正常增删改查
        if(responseType === 'json'){
            if(result.code === '0' && result.success){
                return Promise.resolve(result.data);
            }
            if(result.code === '403' && !result.success && !window.loginHasCookie){
                return Promise.reject(result);
            }
            return Promise.reject(result)
        }

        //下载文件
        if(responseType === 'blob'){
            const type = result.type;
            if(type === 'application/json'){
                return new Promise((resolve, reject) => {
                    const file = new FileReader();
                    file.readAsText(result, ["utf-8"]);
                    file.onloadend = () => {
                        const ret = JSON.parse(file.result);
                        if (ret.code === "0" && ret.success) {
                            resolve(ret);
                        } else {
                            Vue.prototype.$message.error(ret.message);
                            reject(ret);
                        }
                    }
                })
            }else {
                Vue.prototype.downLoadFile(response);
            }
        }

    },
    error => {

        //---------接口认证处理逻辑.start---------
        //cas返回的验证，和跳转处理，需要处理一下后台的应用名  ntzw。

        var casServer = error.response ? error.response.headers['x-cas-server'] : null;
        var status = error.response ? error.response.status : null;

        if(process.env.NODE_ENV === 'production'){
            if (status == '401' && casServer) {
                //vue 本地启动时，请求cas_index页面返回的重定向，
                var server_cas_url = settings.serverUrls.server + "cas_index?currentPath=" + window.location.href;
                window.location.href = server_cas_url;
            }
        }else {
            if (!error.response || (status == '401' && casserver)) {
                //cas的跳转，无法使用proxy功能.
                if (settings.serverUrls.proxyEnable) {
                    console.log('本地环境：配置开启了代理，不支持cas的代理跳转.');
                } else {
                    var server_cas_url = settings.serverUrls.targetServerDev + "cas_index?currentPath=" + window.location.href;
                    window.open(server_cas_url);
                }
                return;
            }
        }

        //---------接口认证处理逻辑.end---------

        if(error.code === "ECONNABORTED" && error.message.indexOf('timeout') !== -1){
            Vue.prototype.$notify.error({
                title:'消息',
                message:'请求超时'
            })
        }

        const msg = {
            400: "请求错误",
            401: "未授权，请登录",
            403: "拒绝访问",
            404: `${error.response.config.url}请求地址出错`,
            405: `${error.response.config.url}不允许使用该方法`,
            408: "请求超时",
            500: "服务器内部错误",
            501: "服务未实现",
            502: "网关错误",
            503: "服务不可用",
            504: "网关超时",
            505: "HTTP版本不受支持"
        }

        if(error.response){
            if(error.response.status == 401){
                return
            }else {
                Vue.prototype.$notify.error({
                    title: "消息",
                    message: msg[error.response.status]
                });
            }
        }

        return Promise.reject(error);
    }
)

//配置项目的后台地址
_axios.staticResURL = process.env.NODE_ENV === "production" ? window.serverUrls.serverProd : setting.serverUrls.serverDev;

Vue.prototype.$axios = _axios;