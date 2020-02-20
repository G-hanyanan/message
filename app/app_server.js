// 第三方模块
const express = require('express')
const bodyParser = require('body-parser')
const multer = require('multer')

// express包初始化
let server = express();
// form传参，文件处理
const upload = multer({ dest: " uploads/" })
// post接口将参数转为对象工具
server.use(bodyParser.urlencoded({ extended: false }))

// 自定义模块
const user = require('../back-end/utils/users');

// 托管静态资源
server.use(express.static('../public/'))

server.get('/', (req, res) => {
    res.send('OK')

})

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


server.listen(8080, () => {
    console.log('大人，您的服务器在8080端口启动成功')
})

