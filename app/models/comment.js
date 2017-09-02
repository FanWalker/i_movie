var mongoose = require('mongoose');
var CommentSchema = require('../schemas/comment'); //引入'../schemas/movie.js'导出的模式模块

// 编译生成movie模型
var Comment = mongoose.model('comment', CommentSchema);

// 将movie模型[构造函数]导出
module.exports = Comment;