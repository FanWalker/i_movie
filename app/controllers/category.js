//后台电影处理
var Category = require('../models/category'); //载入mongoose编译后的模型movie


  //admin page 后台分类录入页
exports.new =function(req,res){
    res.render('category_admin',{
      title: 'i_movie 后台分类录入页',
      category: {}
    })
  }



  // admin post category 后台录入提交
exports.save = function(req, res){
    var _category = req.body.category;
    var category = new Category(_category);
      category.save(function(err, category){
        if (err) {
                  console.log(err);
              }
        res.redirect('/admin/category/list');
      })
    }

  //category list page列表页
exports.list = function(req, res){
    Category.fetch(function(err, categories){
      if (err) {
              console.log(err);
          }
          res.render('categorylist', {
              title: 'i_movie 分类列表页',
              categories: categories
          });
    })
  }