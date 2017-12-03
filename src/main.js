// 引入vue
import Vue from 'vue';
// 引入APP.vue
import APP from './APP.vue';
// 引入vueRouter 第三方包
import VueRouter from "vue-router";
// 引入elementUI 第三方包
import elementUI from "element-ui";
// 引入 axios 第三方包
import axios from 'axios'
// 引入各组件
import layout from './components/layout.vue';
import login from './components/account/login.vue';
import goodslist from './components/goods/goodslist.vue';
import goodsadd from "./components/goods/goodsadd.vue"
import goodsedit from "./components/goods/goodsedit.vue"

// 加载CSS样式
import '../statics/theme_rms/index.css'
import '../statics/css/site.css'
// 设置axios访问时候的默认url
axios.defaults.baseURL = 'http://127.0.0.1:8899';
// 设置axios访问数据接口的时候 会带着cookie
axios.defaults.withCredentials = true;
// 把axios写到Vue的原型里面
Vue.prototype.$ajax = axios;

// 绑定
Vue.use(VueRouter);
Vue.use(elementUI);

var router=new VueRouter({
    routes:[
        {name:'default',path:"/",redirect:'/admin'},
        {name:'login',path:"/login",component:login,meta:{nologin:true}},
        {name:'layout',path:"/admin",component:layout,
        children:[
            {name:"goodslist",path:"goodslist",component:goodslist},
            {name:"goodsadd",path:"goodsadd",component:goodsadd},
            {name:"goodsedit",path:"goodsedit/:goodsid",component:goodsedit}
        
        ]
    }
    ]
})
// 全局守卫
router.beforeEach((to,from,next)=>{
    if(to.meta.nologin){
        next();
        return
    }
    axios.get('/admin/account/islogin')
    .then(res=>{
        console.log(res.data.code)
        if(res.data.code=='nologin'){
            router.push({name:"login"})    
        }else{
            next()
        }
    })
})
new Vue({
    el:"#app",
    router,
    render:create=>create(APP)
}) 