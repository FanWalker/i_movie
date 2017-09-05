var express = require('express');
var path = require('path');
var port = process.env.PORT || 3000;
var cookieParser = require('cookie-parser');
var session = require('express-session');
var bodyParser = require('body-parser'); 	//做文件解析，格式化表单数据
var mongoStore = require('connect-mongo')(session);
var mongoose = require('mongoose');
var logger = require('morgan');
var serverStatic = require('serve-static');
var dbUrl = 'mongodb://localhost:27017/imovie';
var app = express();


app.locals.moment = require('moment'); //格式化日期
mongoose.Promise = global.Promise;
mongoose.connect(dbUrl,{useMongoClient: true});
console.log('MongoDB connect success!');
app.use(session({
	secret: 'imooc',
	store: new mongoStore({
		url: dbUrl,
		db: 'sessions'
	}),
	resave: false,
	saveUninitialized: true
}))

var env = process.env.NODE_ENV ||'development';
if('development' === env){
	app.set('showStackError',true);
	app.use(logger(':method :url :status'));
	app.locals.pretty = true;
	mongoose.set('debug',true);
}

app.listen(port, function(){
	console.log('server start on ' + port);
});
app.use(bodyParser.urlencoded({extended:true}));
app.use(serverStatic(path.join(__dirname,'public')));  //配置静态文件，页面所需要的文件都放在public文件夹下

app.set('views','./app/views/pages');
app.set('view engine','pug');




require('./config/routes')(app);