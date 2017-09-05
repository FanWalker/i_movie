//后台电影处理
var Movie = require('../models/movie'); //载入mongoose编译后的模型movie
var _ = require('underscore'); //_.extend用新对象里的字段替换来的字段
var Comment = require('../models/comment');
var Category = require('../models/category');
var fs = require('fs');
var path = require('path');

//detail page 详情页
exports.detail = function(req,res){
		var id = req.params.id;

		Movie.findById(id,function(err,movie){
			//console.log(Comment)
			Comment.find({movie: id})
							.populate('from','name')
							.populate('reply.from reply.to','name')
							.exec(function(err, comments){
								//console.log(comments);
								res.render('detail',{
									title: movie.title,
									movie: movie,
									comments: comments
							})
						})
				})
	}

	//admin page 后台录入页
exports.new =function(req,res){
	Category.find({},function(err, categories){
		res.render('admin',{
			title: 'i_movie 后台录入页',
			categories: categories,
			movie: {}
		})
	})
}
	//admin update movie 后台更新页
exports.update = function(req,res){
		var id = req.params.id;
		if(id){
			Movie.findById(id, function(err,movie){
				Category.find({},function(err, categories){
					res.render('admin',{
					title: 'imovie 后台更新页',
	        movie: movie,
	        categories
					})
				})
			})
		}
	}

/*//admin poster
exports.savePoster = function(req, res,next){
	var posterData = req.files.uploadPoster
	var filePath = posterData.path
	var originalFilename = posterData.originalFilename //文件原始名字

	if(originalFilename){   //有文件名字，判断文件上传
		fs.readFile(filePath, function(err, data){
			var timestamp = Date.now()
			var type = posterData.type.split('/')[1]
			var poster = timestamp + '.' + type
			var newPath = path.join(_dirname,'../../','/public/upload'+poster)

			fs.writeFile(newPath,data,function(err){
				req.poster = poster
				next()
			})
		})
	}
	else{
		next()
	}
}
*/
	// admin post movie 后台录入提交
exports.save = function(req, res){
		var id = req.body.movie._id
		var movieObj = req.body.movie;
		var _movie

		if(req.poster){
			movieObj.poster = req.poster
		}

		if(id){
			Movie.findById(id, function(err, movie) {
	      if (err) {
	        console.log(err)
	      }

	      _movie = _.extend(movie, movieObj)
	      _movie.save(function(err, movie) {
	        if (err) {
	          console.log(err)
	        }

	        res.redirect('/movie/' + movie._id)
	      })
    	})
		}
		else{
			_movie = new Movie(movieObj);
			console.log
			var categoryId = movieObj.category;
			var categoryName = movieObj.categoryName;

			_movie.save(function(err,movie){
				if (err) {
	          console.log(err);
	        }
	      if(categoryId){
	      	Category.findById(categoryId, function(err, category){
	      		category.movies.push(movie._id);
	      		category.save(function(err, category){
	      			res.redirect('/movie/' + movie._id);

	      		})
	      	})
      	}
	      else if(categoryName){      //mark一：这里做优化判断，如果该分类名已存在就不用重新创建
	      	var category = new Category({
	      		name: categoryName,
	      		movies: [movie._id]
	      	})

	      	category.save(function(err, category){
	      		movie.category = category._id;
	      		movie.save(function(err, movie){
	      			res.redirect('/movie/'+ movie._id);
	      		})
	      	})
	      }
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