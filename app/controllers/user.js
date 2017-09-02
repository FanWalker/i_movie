//处理用户注册、登录、登出、显示用户列表
var User = require('../models/user');

exports.showSignup = function(req, res){
	res.render('signup',{
		title: '注册页面'
	})
}
exports.showSignin = function(req, res){
	res.render('signin',{
		title: '登录页面'
	})
}
//注册
exports.signup = function(req, res){
		var _user = req.body.user;
		
		User.findOne({name:_user.name},function(err,user){
			if(err){
			  console.log(err);
			}
			if(user){
				return res.redirect('/signin');
			}
			else{
					var user = new User(_user);
					user.save(function(err, user){
						if(err){
							console.log(err);
						}
					//res.redirect('/admin/userlist');
					res.redirect('/signin');
				})
			}
		})
	}

//登录
exports.signin = function(req, res){
		var _user = req.body.user;
		var name = _user.name;
		var password = _user.password;

		User.findOne({name: name}, function(err, user){
			if(err){
				console.log(err);
			}
			if(!user){
				return res.redirect('/signup');
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
					return res.redirect('/signin');
				}
			})
		})

	}

	//登出
exports.logout = function(req, res){
		delete req.session.user;
		res.redirect('/');
	}



exports.userlist = function(req, res){
		User.fetch(function(err, users){
			if (err) {
	            console.log(err);
	        }
	        res.render('userlist', {
	            title: 'users 列表页',
	            users: users
	        });
		})
	}

exports.signinRequired = function(req, res, next){
	var user = req.session.user;

	if(!user){
		return res.redirect('/signin');
	}
	next();
}

exports.adminRequired = function(req, res, next){
	var user = req.session.user;
	if(typeof(user.role) === 'undefined' ||user.role === "" || user.role !== 'admin'){
		console.log("用户权限不够，请重新登录");
		res.redirect('/signin');
	}
	next();
}