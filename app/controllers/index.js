//用来和首页进行交互
var Movie = require('../models/movie'); //载入mongoose编译后的模型movie

//index page 首页
exports.index = function(req,res){
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
	}
