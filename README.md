# i_movie
nodejs+mongoDB建站

网站拥有功能：

1、用户注册登录

2、评论

3、电影分类

4、电影搜索

5、列表分页

6、同步上传

7、豆瓣同步

8、访客统计

9、单元测试、grunt集成

### 运行与使用

1、 安装Node.js：项目使用的是window下的8.4.0版本

2、 安装MongoDB

3、 启动MongoDB服务：mongod

4、 安装bower依赖：bower install

5、 安装npm依赖：npm install

6、 启动项目入口文件：node app.js

### 项目页面

#### 豆瓣电影首页: localhost:3000/

用户注册页面: localhost:3000/signup

用户登陆页面: localhost:3000/signin

用户详情列表页: localhost:3000/admin/user/list

详情页:localhost:3000/movie/:id

后台录入页:localhost:3000/admin/movie/new

电影列表页:localhost:3000/admin/movie/list

分类录入页:localhost:3000/admin/category/new

分类页:localhost:3000/admin/category/list

### 项目目录结构

        ├── app.js               项目入口文件
        ├── app                  Node后端MVC文件目录
        │   ├── controllers      控制器目录
        │   │   ├── category.js  
        │   │   ├── comment.js     
        |   |   ├── index.js
        |   |   ├── movie.js
        │   │   └── user.js
        │   ├── models        模型目录
        |   |   ├── category.js
        │   │   ├── comment.js      
        |   |   ├── movie.js
        │   │   └── user.js
        │   ├── schemas       模式目录,定义数据库中所需表的结构
        |   |   ├── category.js
        │   │   ├── comment.js      
        |   |   ├── movie.js
        │   │   └── user.js
        │   └── views         视图文件目录
        │       ├── includes
        │       └── pages
        ├── node_modules      node模块目录
        ├── public            静态文件目录
        │   ├── css           css文件目录
        │   ├── img           公共图片目录
        │   ├── js            js文件目录
        │   ├── libs          经过gulp处理后文件所在目录
        │   │   ├── bootstrap
        │   │   └── jquery
        │   └── upload        用户自定义上传图片存储目录
        ├── config            路由目录
        │   └── router.js
        ├── gruntfile.js      gruntfile文件
        └── package.json
