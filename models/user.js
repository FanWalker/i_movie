var mongoose = require('mongoose');
var userSchema = require('../schemas/user'); //引入'../schemas/movie.js'导出的模式模块

// 编译生成movie模型
var user = mongoose.model('user', userSchema);

// 将movie模型[构造函数]导出
module.exports = user;