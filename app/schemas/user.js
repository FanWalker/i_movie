var mongoose = require('mongoose');
var bcrypt = require('bcryptjs')  //密码加密 生成随机盐
var SALT_WORK_FACTOR = 10	//计算强度

var userSchema = new mongoose.Schema({
	name: {
		unique: true,
		type: String
	},
	password: String,
    role: {
        type: String,
        default: 'user'
    },  //role可以是user，admin
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

// userSchema.pre 表示每次存储数据之前都先调用这个方法
userSchema.pre('save', function (next) {
	var user = this
    if (this.isNew) {
        this.meta.createAt = this.meta.updateAt = Date.now();
    } else {
        this.meta.updateAt = Date.now();
    }
	
	bcrypt.genSalt(SALT_WORK_FACTOR, function(err,salt){
			if(err) return next(err)
				
			bcrypt.hash(user.password, salt, function(err, hash){
				if(err) return next(err)
					
				user.password = hash
				next()
			})
		})
})

userSchema.methods = {
    comparePassword: function(_password,cb){
        bcrypt.compare(_password, this.password, function(err, isMatch){
            if(err) return cb(err);

            cb(null, isMatch);
        })
    }
}

// userSchema 模式的静态方法
userSchema.statics = {
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
module.exports = userSchema;