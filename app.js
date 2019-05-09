const express = require('express');
const app = express();
app.listen(8888, () => {
    console.log('Alishow-server running at http://127.0.0.1:8888');
})

//加载并配置模板引擎
app.engine('html', require('express-art-template'));

//托管静态资源
app.use('/assets', express.static('./view/assets'));
app.use('/uploads', express.static('./view/uploads'));
app.use('/upload', express.static('./upload'));

//加载body-parser模块并注册为中间件
const bp = require('body-parser');
app.use(bp.urlencoded({extended:false}));

//将app.js文件所在的目录（alishow目录）挂在到全局变量上
global.rootPath = __dirname;

//加载 express-session 模块，并注册为中间件
//该中间件能够在 req 对象上挂载一个 session对象
//req.session
const session = require('express-session');
app.use(session({
    secret: 'a327fg3fggtg',
    resave: false,
    saveUninitialized: false
}))

app.use(checksession);


//加载路由模块并注册为中间件
const router_cate = require('./router/router_cate.js');
app.use(router_cate);

//加载user路由模块
const router_user = require('./router/router_user.js');
app.use(router_user);

//加载center路由模块
const router_center = require('./router/router_center.js');
app.use(router_center);

//加载post路由模块
const router_post = require('./router/router_post.js');
app.use(router_post);

const router_test = require('./router/router_test.js');
app.use(router_test);

const router_other = require('./router/router_other.js');
app.use(router_other);

//加载api.js模块并注册为中间件
const api = require('./api.js');
app.use(api);

const url = require('url');
//定义检测session 的中间件
function checksession (req, res, next) {
    const allow_url = ['/admin/login', '/api/login/checkLogin', '/index', '/list', '/detail'];

    //使用url模块拆解url地址
    const urlObj = url.parse(req.url);
    // urlObj = {pathname: '', query:''}
    // /admin/login
    // /admin/cate/cate
    if (!allow_url.includes(urlObj.pathname)) {
        //如果 isLogin=false代表未登录
        if (!req.session.isLogin) {
            //未登录则跳转回登录页 /admin/login
            return res.redirect('/admin/login');
        }
    }
    next();
}