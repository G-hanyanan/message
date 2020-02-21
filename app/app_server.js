
// 第三方模块
const express = require('express');
const bodyParser = require('body-parser')
const multer = require('multer')
const session = require('express-session')

// 第三方模块初始化
// 服务器框架
const server = express()
// form传参，文件处理
const upload = multer({ dest: " ../uploads/" })
// post接口将参数转为对象工具
server.use(bodyParser.urlencoded({ extended: false }))
// session配置
let conf = {
    secret: '123456', //加密字符串
    resave: false, // 强制保存
    saveUninitialized: false // 强制将未初始化的session存储  
};
server.use(session(conf))

// 自定义模块
const msg = require('../back-end/utils/msg');
const user = require('../back-end/utils/users');

// 托管静态资源
server.use(express.static('../public/'))

// 注册用户接口
server.post('/api/addUser', upload.single('cover'), (req, res) => {
    let { userName, psw } = req.body
    // 头像地址
    let coverUrl = req.file.path
    user.add(userName, psw, coverUrl);
    let obj = {
        code: 200,
        msg: '注册成功'
    }
    res.send(obj)
})

// 登录接口
server.get('/api/login', (req, res) => {
    let arr = user.get()
    var { userName, psw } = req.query

    // 判断账号密码是否已注册
    let result = arr.find((item) => item.userName == userName && item.psw == psw)

    if (result) {
        let obj = {
            code: 200,
            msg: '登录成功'
        }
        // 登录成功发钥匙
        req.session.userName = userName
        res.send(obj)
    } else {
        let obj = {
            code: 404,
            msg: '登录失败'
        }
        res.send(obj)
    }
})

// 获取留言接口
server.get('/api/getMsg', (req, res) => {
    let data = msg.get();
    let obj = {
        code: 200,
        data,
        userName: req.session.userName,
        msg: '获取成功'
    }
    res.send(obj)
})

// 添加留言接口
server.post('/api/addMsg', (req, res) => {

    let { name, content } = req.body

    msg.add(name, content);
    let obj = {
        code: 200,
        msg: '添加成功'
    }
    res.send(obj)
})


server.listen(8080, () => {
    console.log('大人，您的服务器在8080端口启动成功')
})

