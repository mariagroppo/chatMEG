export default function socketProducts(socketServer){
    /* ON es el escuchador de eventos */
    const messages=[];
    const users=[];
    socketServer.on('connection', async socket => {
        console.log('Un cliente se ha conectado || ' + new Date().toLocaleString());
        
        socket.emit ('logs', messages);

        socket.on('msg', data=>{
            messages.push(data);
            socketServer.emit('logs', messages)
        })

        socket.on('authenticated', data=> {
            /* Notifico a todos menos a mi */
            socket.broadcast.emit('newUserConnected', data);
            /* users.push(data);
            console.log(users);
            socket.emit('users', users); */
        })
    })
}