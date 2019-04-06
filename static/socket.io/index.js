const app = require('express')();
const http = require('http').Server(app);
const io = require('socket.io')(http);
// const mysql = require('mysql');

app.get('/', function(req, res) {
    res.sendFile(__dirname + '/index.html');
})

let array = [];
/**
 * 注释sql操作
 */
/*
const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'socket'
})

app.get('/regist', function(req, res) {
    var user = req.query['username'];
    var pass = req.query['password'];
    var result = select(user);
    if (result.name!=user) {
        var result = add(user, pass);
        if (result) {
            res.send({ok:true, msg:"注册成功"});
        } else {
            res.send({ok:false, msg:"注册失败"});
        }
    } else {
        res.send({ok:false, msg:"用户名已注册"});
    }
})
app.get('/login', function(req, res) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    var user = req.query['username'];
    var pass = req.query['password'];
    select(user, pass, res);
    
})

function checkUsername(result, password, res) {
    if (!result) {
        res.send({ok:false, msg:"该用户不存在"});
    } else {
        if (result.password!=password) {
            res.send({ok:false, msg:"密码错误"});
        } else {
            res.send({ok:true, msg:"登陆成功"});
        }
    }
}

*/
io.on('connection', function(socket) {
    console.log('a user connected');
    socket.on('message', function(res) {
        array.push(res);
        let length = array.length;
        io.emit('broadcasting', array[length - 1]);
        console.log(res)
    })
})

/*
function select(username, password, res) {
    connection.connect();
    let sql = `SELECT * FROM history where username = '${username}'`;
    let result, error; 
    connection.query(sql, function(err, res) {
        if (err) {
            console.log('err:' + err.message);
            error = err.message;
        }
        if (res[0]) {
            let string = JSON.stringify(res[0]);
            let object = JSON.parse(string);
            result = object;
        }
        checkUsername(result, password, res)
    })
    connection.end();
}

function add(username, password) {
    connection.connect();
    let sql = `INSERT INTO history(username,password) VALUES(?,?)`;
    let sqlParams = [username, password];
    connection.query(sql, sqlParams, function(err, res) {
        if (err) {
            console.log('err:' + err.message);
            return false;
        }
        return true;
    })
    connection.end();
}
*/

http.listen(8080, function() {
    console.log('project is start in 8080');
})