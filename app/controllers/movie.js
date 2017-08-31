//后台电影处理
var Movie = require('../models/movie'); //载入mongoose编译后的模型movie
var _ = require('underscore'); //_.extend用新对象里的字段替换来的字段

//detail page 详情页
exports.detail = function(req,res){
		var id = req.params.id;
		Movie.findById(id,function(err,movie){
			res.render('detail',{
				title: movie.title,
				movie: movie
			})
		})
	}

	//admin page 后台录入页
exports.new =function(req,res){
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
	}

	//admin update movie 后台更新页
exports.update = function(req,res){
		var id = req.params.id;
		if(id){
			Movie.findById(id, function(err,movie){
				res.render('admin',{
					title: 'imovie 后台更新页',
	                movie: movie
				})
			})
		}
	}

	// admin post movie 后台录入提交
exports.save = function(req, res){
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
	}

	//list page列表页
exports.movielist = function(req, res){
		Movie.fetch(function(err, movies){
			if (err) {
	            console.log(err);
	        }
	        res.render('list', {
	            title: 'i_movie 列表页',
	            movies: movies
	        });
		})
	}

	// list delete movie data 列表页删除电影
exports.del = function (req, res) {
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
	}