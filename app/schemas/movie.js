var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var ObjectId = Schema.Types.ObjectId;

var movieSchema = new Schema({
    title: String,
    doctor: String,
    language: String,
    country: String,
    summary: String,
    flash: String,
    poster: String,
    year: Number,
    pv: {
        type: Number,
        default: 0
    },
    category: {
        type: ObjectId,
        ref: 'category'
    },
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

// movieSchema.pre 表示每次存储数据之前都先调用这个方法
movieSchema.pre('save', function (next) {
    if (this.isNew) {
        this.meta.createAt = this.meta.updateAt = Date.now();
    } else {
        this.meta.updateAt = Date.now();
    }
    next();
});

// movieSchema 模式的静态方法
movieSchema.statics = {
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

// 导出movieSchema模式
module.exports = movieSchema;