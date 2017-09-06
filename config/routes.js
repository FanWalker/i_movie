var Index = require('../app/controllers/index'); //载入mongoose编译后的模型movie
var User = require('../app/controllers/user');
var Movie = require('../app/controllers/movie');
var Comment = require('../app/controllers/comment');
var Category = require('../app/controllers/category');
var multer = require('multer');
var upload = multer({dest: 'public/upload/'})

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
	app.get('/admin/user/list',User.signinRequired, User.adminRequired, User.userlist)


/*电影处理*/
	//detail page 详情页
	app.get('/movie/:id', Movie.detail)
	//admin page 后台录入页
	app.get('/admin/movie', Movie.new)
	//admin update movie 后台更新页
	app.get('/admin/movie/update/:id',User.signinRequired, User.adminRequired, Movie.update)
	// admin post movie 后台录入提交
	app.post('/admin/movie/new',User.signinRequired, User.adminRequired,upload.single('uploadPoster'), Movie.savePoster, Movie.save)
	//list page列表页
	app.get('/admin/movie/list',User.signinRequired, User.adminRequired, Movie.movielist)
	// list delete movie data 列表页删除电影
	app.delete('/admin/movie/list',User.signinRequired, User.adminRequired, Movie.del)

/*评论*/
	app.post('/user/comment',User.signinRequired, Comment.save)

/*电影分类录入*/
	app.get('/admin/category/new',User.signinRequired, User.adminRequired, Category.new);
	app.post('/admin/category', User.signinRequired, User.adminRequired, Category.save);
	app.get('/admin/category/list',User.signinRequired, User.adminRequired, Category.list);

/*分页*/
	app.get('/results',Index.search)
}