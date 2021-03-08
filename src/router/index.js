import Vue from 'vue'
import VueRouter from 'vue-router'
import reportStatistics from './reportStatistics'
const home = resolve => require(['../views/layout/Index.vue'], resolve);

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'home',
    component: home,
    redirect: 'reportStatistics',
    children: [
      reportStatistics
    ]
  }
]

const router = new VueRouter({
  mode:'hash',
  base:process.env.BASE_URL,
  routes
})

//路由拦截
router.beforeEach((to, from, next)=>{
  window.scrollTo(0,0);
  var user = window.localStorage.getItem("user");//根据具体项目定
  console.log('user===>',user)
  //忽略验证路由,如果是被忽略的路由，则不拦截
  const ignore = ['/login','/updatePassword'];
  if(ignore.includes(to.path)){
    next();
    return ;
  }
  //前端应该写一个logo逻辑，判断是否是第一次登陆，②、检测是否登陆，未登录即跳转至登陆
  if(user&&user!=='undefined'){
    const isFirst = JSON.parse(user).loginUserProfileDTO.loginState;//根据项目实际情况
    if(isFirst === '1'){
      next({
        path:'/updatePassword'
      })
    }else {
      if(to.fullPath.split('http')[1]){
        next(false)
      }else {
        next()
      }
    }
  }else {
    //这里应该是跳转到登陆页面或获取用户信息
    Vue.prototype.$axios
        .get("sysuser/getCurrentUserInfo")
        .then(res => {
          console.log(res);
          // 保存后台返回值
          window.localStorage.setItem("user", JSON.stringify(res));
          window.roleIds = null;
          console.log("$router.push:/dashboard")
          next({
            path: "/reportStatistics"
          });
          console.log("$router.push:/dashboard.ok")
          // next();
        })
        .catch(err => {
          console.log("route.js:",err);
          Vue.prototype.$message.error(err.message);
        });
  }

})







export default router
