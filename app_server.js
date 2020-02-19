// 第三方模块
const express = require('express')

// express包初始化
let server = express();

server.get('/', (req, res) => {
    res.send('OK')

})

server.listen(8080, () => {
    console.log('大人，您的服务器在8080端口启动成功')
})

