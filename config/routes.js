var Index = require('../app/controllers/index'); //载入mongoose编译后的模型movie
var User = require('../app/controllers/user');
var Movie = require('../app/controllers/movie');

module.exports = function(app){ 
	app.use(function(req, res, next){
		res.locals.user = req.session.user;
		next();
	})

	//index page 首页
	app.get('/',Index.index)

/*User*/
	//弹窗式注册、登录
	app.post('/user/signup',User.signup)
	app.post('/user/signin',User.signin)

	//单独的注册、登录页面
	app.get('/signin',User.showSignin)
	app.get('/signup',User.showSignup)

	//登出
	app.get('/user/logout', User.logout)
	//用户列表
	app.get('/admin/userlist',User.signinRequired, User.adminRequired, User.userlist)


/*电影处理*/
	//detail page 详情页
	app.get('/movie/:id', Movie.detail)
	//admin page 后台录入页
	app.get('/admin/movie', Movie.new)
	//admin update movie 后台更新页
	app.get('/admin/update/:id', Movie.update)
	// admin post movie 后台录入提交
	app.post('/admin/movie/new', Movie.save)
	//list page列表页
	app.get('/admin/list', Movie.movielist)
	// list delete movie data 列表页删除电影
	app.delete('/admin/list', Movie.del)

}