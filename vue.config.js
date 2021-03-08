/**
 *
 *作者：葛以伟
 *时间：14:18 2021-01-29
 *描述：详细配置： https://cli.vuejs.org/config/#vue-config-js
 *
 **/
// 详细配置： https://cli.vuejs.org/config/#vue-config-js

//    打包后显示版本号
var data = new Date()
var y = data.getFullYear();
var m = data.getMonth()+1;
var r = data.getDate();
var h = data.getHours();
var mon = data.getMinutes();
const Version = y+'_'+m+'_'+r+'_'+h+'_'+mon;

//引入webpack
const webpack = require('webpack')
module.exports = {
    publicPath:process.env.NODE_ENV === 'production'?'./':'/',
    devServer:{
        proxy: "http://192.168.10.62:9000",
    },
    productionSourceMap: false,
    configureWebpack: {
        plugins: [
            new webpack.ProvidePlugin({
                $: "jquery",
                jquery: "jquery",
                "windows.jquery": "jquery"
            })
        ]
    },
    chainWebpack:config =>{
        if(process.env.NODE_ENV === 'production'){
            config.output.filename('js/[name].[chunkhash].' + Version + '.js').end();
            config.output.chunkFilename('js/[name].[chunkhash].' + Version + '.js').end();
            config.plugin('extract-css').tap(args => [{
                filename: `css/[name].[chunkhash].${Version}.css`,
                chunkFilename: `css/[name].[chunkhash].${Version}.css`
            }])
        }
    }
}
