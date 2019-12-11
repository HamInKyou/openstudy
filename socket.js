const SocketIO = require('socket.io');
const {Chatlog, Tag} = require('./models');
module.exports = (server, app) => {
    const io = SocketIO(server, { path : '/socket.io'});
    app.set('io', io);
    
    io.on('connection', (socket) => {
        const req = socket.request;
        const { headers : { referer } } = req;
        const roomId = String(referer
            .split('/')[referer.split('/').length-1]);
        socket.join(roomId);
        
        socket.on('chat', async (data) => {
            console.log("read :" + data);
            socket.emit('broad', data);
            socket.to(roomId).emit('broad', data);
            
            const tag = await Tag.findOne({ where : { postId : roomId}});
            await Chatlog.create({
                userId : data.userId,
                content : data.msg,
                tagId : tag.id,
                nick : data.nick
            });
        });
        
        socket.on('disconnect', () => {
            console.log('chat disconnect');
            socket.leave(roomId);
        });
    });
};
