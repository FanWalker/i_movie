var express = require('express');
var path = require('path');
var app = express();
var _ = require('underscore'); //_.extend用新对象里的字段替换来的字段
var port = process.env.PORT || 3000;
var cookieParser = require('cookie-parser');
var session = require('express-session');
var bodyParser = require('body-parser'); //做文件解析，格式化表单数据

var mongoStore = require('connect-mongo')(session);
var mongoose = require('mongoose');
var Movie = require('./models/movie'); //载入mongoose编译后的模型movie
var User = require('./models/user');
var dbUrl = 'mongodb://localhost:27017/imovie';

app.listen(port);
console.log('start on'+ port);

mongoose.Promise = global.Promise;
mongoose.connect(dbUrl,{useMongoClient: true});
console.log('MongoDB connect success!');

app.locals.moment = require('moment'); //格式化日期
app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static('public'));  //配置静态文件，页面所需要的文件都放在public文件夹下


app.set('views','./views/pages');
app.set('view engine','pug');

app.use(cookieParser);
app.use(session({
	secret: 'imooc',
	store: new mongoStore({
		url: dbUrl,
		db: 'sessions'
	}),
	resave: false,
	saveUninitialized: true
}))


//index page 首页
app.get('/',function(req,res){
	console.log('user in session: ');
	console.log(req.session.user);

	Movie.fetch(function(err,movies){
		if(err){
			console.log(err);
		}
		res.render('index',{
			title: 'i_movie 首页',
			movies: movies
		})
	})
})

app.post('/user/signup',function(req, res){
	var _user = req.body.user;
	
	User.findOne({name:_user.name},function(err,user){
		if(err){
		  console.log(err);
		}
		if(user){
			return res.redirect('/user/signin');
		}
		else{
				var user = new User(_user);
				user.save(function(err, user){
					if(err){
						console.log(err);
					}
				res.redirect('/admin/userlist');
			})
		}
	})
})
app.post('/user/signin',function(req, res){
	var _user = req.body.user;
	var name = _user.name;
	var password = _user.password;

	User.findOne({name: name}, function(err, user){
		if(err){
			console.log(err);
		}
		if(!user){
			return res.redirect('/user/signup');
		}
		user.comparePassword(password, function(err, isMatch){
			if(err){
				console.log(err);
			}
			if(isMatch){

				req.session.user = user;
				res.redirect('/');
			}
			else{
				return res.redirect('user/signin')
			}
		})
	})

})




app.get('/admin/userlist', function(req, res){
	User.fetch(function(err, users){
		if (err) {
            console.log(err);
        }
        res.render('userlist', {
            title: 'users 列表页',
            users: users
        });
	})
})

//detail page 详情页
app.get('/movie/:id', function(req,res){
	var id = req.params.id;
	Movie.findById(id,function(err,movie){
		res.render('detail',{
			//title: 'i_movie'+ movie.title,
			movie: movie
		})
	})
})

//admin page 后台录入页
app.get('/admin/movie',function(req,res){
	res.render('admin',{
		title: 'i_movie 后台录入页',
		movie: {
			title: '',
			doctor: '',
			country: '',
			year: '',
			poster: '',
			flash: '',
			summary: '',
			language: ''
		}
	})
})

//admin update movie 后台更新页
app.get('/admin/update/:id', function(req,res){
	var id = req.params.id;
	if(id){
		Movie.findById(id, function(err,movie){
			res.render('admin',{
				title: 'imovie 后台更新页',
                movie: movie
			})
		})
	}
})

// admin post movie 后台录入提交
app.post('/admin/movie/new', function(req, res){
	var id = req.body.movie._Id;
	var movieObj = req.body.movie;
	var _movie
	if(typeof(id) !== 'undefined'){
		Movie.findById(id, function(err, movie){
			if(err){
				console.log(err);
			}

			_movie = _.extend(movie, movieObj);
			console.log(_movie);
			_movie.save(function(err,movie){
				if (err) {
					console.log(err);
				}
				res.redirect('/movie/' + movie._id);
			});
		})
	}
	else{
		_movie = new Movie({
			doctor: movieObj.doctor,
			title: movieObj.title,
            country: movieObj.country,
            language: movieObj.language,
            year: movieObj.year,
            poster: movieObj.poster,
            summary: movieObj.summary,
            flash: movieObj.flash
		});
		_movie.save(function(err,movie){
			if (err) {
                console.log(err);
            }
            console.log(movie._id)
            res.redirect('/movie/' + movie._id);
		})
	}
})

//list page列表页
app.get('/admin/list', function(req, res){
	Movie.fetch(function(err, movies){
		if (err) {
            console.log(err);
        }
        res.render('list', {
            title: 'i_movie 列表页',
            movies: movies
        });
	})
})

// list delete movie data 列表页删除电影
app.delete('/admin/list', function (req, res) {
    var id = req.query.id;
    if (id) {
        Movie.remove({_id: id}, function (err, movie) {
            if (err) {
                console.log(err);
            } else {
                res.json({success: 1});
            }
        });
    }
});