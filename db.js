const mysql = require('mysql');
const conn = mysql.createConnection({
    host: '127.0.0.1',
    user: 'root',
    password: 'root',
    database: 'alishow',
    //允许一次性执行多条SQL语句
    multipleStatements: true
})
conn.connect();

module.exports = conn;