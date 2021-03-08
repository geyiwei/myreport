# report

## Project setup
```
npm install
```

### Compiles and hot-reloads for development
```
npm run serve
```

### Compiles and minifies for production
```
npm run build
```

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).

### 环境变量配置方式
* 静态、生产环境：/public/setting.js , 定义到window对象的某个属性上去
* 在/public/index.html中引入public/setting.js
* 在vue上下文环境里的环境变量 : /src/setting.js
