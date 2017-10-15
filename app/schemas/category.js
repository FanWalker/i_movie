var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var ObjectId = Schema.Types.ObjectId;

var categorySchema = new Schema({
  name: String,
  movies: [
    {type: ObjectId, ref: 'movie'}
  ],
  // meta 更新或录入数据的时间记录
  meta: {
      createAt: {
          type: Date,
          default: Date.now()
      },
      updateAt: {
          type: Date,
          default: Date.now()
      },
  }
});

// categorySchema.pre 表示每次存储数据之前都先调用这个方法
categorySchema.pre('save', function (next) {
    if (this.isNew) {
        this.meta.createAt = this.meta.updateAt = Date.now();
    } else {
        this.meta.updateAt = Date.now();
    }
    next();
});

// categorySchema 模式的静态方法
categorySchema.statics = {
    fetch: function (cb) {    //取出数据库中的所有数据
        return this
            .find({})
            .sort('meta.updateAt')
            .exec(cb)
    },
    findById: function (id, cb) {       //查询单条数据
        return this
            .findOne({_id: id})
            .exec(cb)
    }
}

// 导出categorySchema模式
module.exports = categorySchema;