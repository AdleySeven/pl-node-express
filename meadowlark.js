//非常精简的express的服务器

var express = require('express');

var app = express();

//引入模板引擎
//这段代码创建了一个视图引擎， 并对 Express 进行了配置， 将其作为默认的视图引擎。
//接下来创建 views 目录， 在其中创建一个子目录 layouts。

var handlebars = require('express3-handlebars')
                .create({ 
                     defaultLayout:'main',
                    extname: '.handlebars'
                });
app.engine('handlebars', handlebars.engine);
app.set('view engine', 'handlebars');

app.set('port',process.env.PORT || 3000); //设置服务监听的端口


//引入public静态资源
app.use(express.static(__dirname + '/public'));



//路由
//app.get 是我们添加路由的方法。这个方法有两个参数： 一个路径和一个函数
//路由就是由这个路径定义的。 
//app.VERB 帮我们做了很多工作： 它默认忽略了大小写或反斜杠， 并且在进行匹配时也不考虑查询字符串。 
//所以针对关于页面的路由对于 /about、/About、 /about/、 /about?foo=bar、 /about/?foo=bar 等路径都适用。


//旧的路由 -> 新的路由
app.get('/',function(req,res){
    // res.type('text/plain');
    // res.send('meadowlark travel!');
    res.render('home');
});

app.get('/index',function(req,res){
    // res.type('text/plain');
    // res.send('meadowlark travel!');
    res.render('home');
});

var fortunes = [
                "Conquer your fears or they will conquer you.",
                "Rivers need springs.",
                "Do not fear what you don't know.",
                "You will have a pleasant surprise.",
                "Whenever possible, keep it simple."
            ];

app.get('/about',function(req,res){
    // res.type('text/plain');
    // res.send('about meadowlark travel~');
    var randomFortune = fortunes[Math.floor(Math.random()*fortunes.length)];
    res.render('about',{aaa : randomFortune});
});

 
//定制404页面 表示：页面不存在
//注意， 我们对定制的 404 和 500 页面的处理与对普通页面的处理应有所区别： 用的不是app.get， 而是 app.use。 
//app.use 是 Express 添加中间件 的一种方法。
//如果我们把404 处理器放在所有路由上面， 那首页和关于页面就不能用了， 访问这些 URL 得到的都是 404。

app.use(function(req,res,next){
    // res.type('text/plain');
    // res.status(404);
    // res.send('404 - Not Found!');
    res.status(404);
    res.render('404');
});

//定制500页面
app.use(function(err,req,res,next){
    // res.type('text/plain');
    // res.status(500);
    // res.send('500 - Server Error!');
    console.error(err.stack);
    res.status(500);
    res.render('500');
});

app.listen(app.get('port'),function(){
    console.log('Express starded on http://127.0.0.1'+app.get('port')+';press Ctrl-c to terminate!');
});

//*****************“ 模型 - 视图 - 控制器” 模式
//视图在web中指的是html 呈现给用户的
//Express 比较偏好的视图引擎是 Jade（ 因为它也是 TJ Holowaychuk 开发的） 。 Jade 所采用的方式非常精简： 你写的根本
//不像是 HTML， 因为没有尖括号和结束标签， 这样可以少敲好多次键盘。 然后， Jade引擎会将其转换成 HTML。

//我推荐使用另外一个抽象程度较低的模板框架 Handlebars。 Handlebars（ 基于与语言无关的流行模板语言
//Mustache） 不会试图对 HTML 进行抽象： 你编写的是带特殊标签的 HTML， Handlebars 可以借此插入内容

//npm install --save express3-handlebars


//***************布局*****************
/*
在开发网站时， 每个页面上肯定有一定数量的 HTML 是相同的， 或者非常相近。 在每个页面上重复写这些代码不仅
非常繁琐， 还会导致潜在的维护困境： 如果你想在每个页面上做一些修改， 那就要修改所
有文件。 布局可以解决这个问题， 它为网站上的所有页面提供了一个通用的框架
*/

