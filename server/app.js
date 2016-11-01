var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);

//设置跨域访问
app.all('*', function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "X-Requested-With");
    res.header("Access-Control-Allow-Methods","PUT,POST,GET,DELETE,OPTIONS");
    res.header("X-Powered-By",' 3.2.1')
    res.header("Content-Type", "application/json;charset=utf-8");
    next();
});

/**
 * 路由配置
 */
//服务器根目录
app.get('/', function (req, res) {
    res.send('<h1>Welcome Realtime Server</h1>');
});
//demo子目录
app.get('/demo', function (req, res) {
    res.send('<h1>Welcome Realtime Server - demo</h1>');
});

//在线用户
var onlineUsers = [];
//当前在线人数
var onlineCount = 0;

/**
 * 建立socket链接
 */
io.on('connection', function (socket) {
    console.log('a user connected');

    /**
     * 监听新用户加入
     */
    socket.on('login', function (obj) {
        //将新加入用户的唯一标识当作socket的名称，后面退出的时候会用到
        socket.name = obj.userId;
        //检查在线列表，如果不在里面就加入
        if (!onlineUsers.hasOwnProperty(obj)) {
            onlineUsers.push(obj)
            onlineCount++;//在线人数+1
        }
        //向所有客户端广播用户加入
        io.emit('login', {
            onlineUsers: onlineUsers,
            onlineCount: onlineCount,
            user: obj
        });
        console.log(socket.handshake);// 打印握手信息
        console.log(obj.userName + ' 登录');
    });

    /**
     * 监听用户退出
     */
    socket.on('disconnect', function () {
        console.log('[Leo]socket name => ', socket.name)
        //将退出的用户从在线列表中删除
        for (let i = 0, len = onlineUsers.length; i < len; i++) {
            let user = onlineUsers[i]
            if (user.userId == socket.name) {
                let tempUser = user
                onlineUsers.splice(i, 1)
                onlineCount--
                io.emit('logout', {
                    onlineUsers,
                    onlineCount,
                    user: tempUser
                })
                console.log(user.userName + ' 退出登录', JSON.stringify(tempUser))
                break
            }
        }
        console.log('剩余在线用户 => ', JSON.stringify(onlineUsers))
    });

    /**
     * 监听用户发布聊天内容
     */
    socket.on('message', function (obj) {
        //obj数据结构例子
        let testObj = {
            "from": {
                "userId": "123",
                "userName": "123"
            },
            "to": {
                "userId": "456",
                "userName": "456"
            },
            content: "聊天内容",
            sendtime: "2016年10月9日 11:25:05"
        }
        //向所有客户端广播发布的消息
        //io.emit('message', obj);
        io.emit(obj.to.userId, obj)
        console.log(
            obj.from.userName + " 对 "
            + obj.to.userName + " 说 "
            + obj.content
        )
    });

});

http.listen(3000, function () {
    console.log('listening on *:3000');
});







