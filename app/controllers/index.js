//用来和首页进行交互
var Movie = require('../models/movie'); //载入mongoose编译后的模型movie
var Category = require('../models/category'); //载入mongoose编译后的模型movie

//index page 首页
exports.index = function(req,res){
	Category
		.find({})
		.populate({
			path: 'movies',
			select: 'title poster'
		})
		.exec(function(err, categories){
			if(err){
				console.log(err);
			}
			res.render('index',{
				title: 'i_movie 首页',
				categories: categories
			})
		})
	}


exports.search = function(req,res){
	var catId= req.query.cat;
	var page = parseInt(req.query.p,10) || 0;
	var q = req.query.q;
	var count = 2
	var index = page * count;

	if(catId){
		Category
			.find({_id: catId})
			.populate({
				path: 'movies',
				select: 'title poster'
				/*options: {limit: count, skip: index} //限制查询个数为2，以及从index位置开始查*/
			})
			.exec(function(err, categories){
				if(err){
					console.log(err);
				}
				var category = categories[0] || {};
				var movies = category.movies || [];
				var results = movies.slice(index,index + count);

				res.render('results',{
					title: 'i_movie '+ category.name,
					keyword: category.name,
					query: 'cat='+catId,
					currentPage: (page + 1),
					totalPage: Math.ceil(movies.length / count),
					movies: results
				})
			})
		}
		else{
			Movie
				.find({title: new RegExp(q + '.*', 'i')})
				.exec(function(err, movies){
					if(err){
						console.log(err);
					}
					var results = movies.slice(index, index+count);

					res.render('results',{
						title: '搜索结果',
						keyword: q,
						currentPage: (page+1),
						query: 'q=' + q,
						totalPage: Math.ceil(movies.length/count),
						movies: results
					})
				})
		}
	}
	