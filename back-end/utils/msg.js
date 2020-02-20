// 核心模块
const fs = require('fs')
const path = require('path')

// 消除魔术数
const MSG = "../database/message.json"
const DATA_FILE = path.join(__dirname, MSG)

// 封装get方法
const get = () => {
    // 读message文件
    let str = fs.readFileSync(DATA_FILE, 'utf8')
    // 将读出来的数据转为DOM结构
    let arr = JSON.parse(str)
    return arr
}

const add = (name, content) => {
    let arr = get();
    // 设置自动增长的ID
    let id = arr.length ? arr[arr.length - 1][id] + 1 : 1;
    // 新增的数据
    let obj = {
        id,
        name,
        content,
        dt: Date.now()
    }
    // 将新增的数据添加到数组中
    arr.push(obj)
    // 将数组转为JSON格式，重新写入message文件
    fs.writeFileSync(DATA_FILE, JSON.stringify(arr))

    return arr
}

module.exports = {
    get,
    add
}
