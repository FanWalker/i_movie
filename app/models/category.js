var mongoose = require('mongoose');
var categorySchema = require('../schemas/category'); 

// 编译生成category模型
var category = mongoose.model('category', categorySchema);

// 将category模型[构造函数]导出
module.exports = category;