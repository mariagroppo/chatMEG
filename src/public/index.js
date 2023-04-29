const socket = io({autoConnect:false});
let user;
const chatbox=document.getElementById('chatbox');

Swal.fire({
    title: 'Nombre de usuario',
    input:"text",
    inputValidator: (value)=>{
        return !value && '¡Necesitas identificarte antes de ingresar!'
    },
    allowOutsideClick:false,
    allowEscapeKey:false
}).then(result=>{
    user=result.value;
    /* De esta manera se crea un socket cuando el usuario se registra */
    socket.connect()
    socket.emit('authenticated', user);
})

chatbox.addEventListener('keyup', e=>{
    
    if (e.key==="Enter") {
        // trim borra espacios vacios y se fija que haya algun caracter
        if (chatbox.value.trim().length>0) {
            socket.emit('msg', {user, message:chatbox.value.trim()})
            chatbox.value="";
        }
    }
})

socket.on('logs', data=>{
    const logs = document.getElementById('logs');
    let msg="";
    data.forEach(e => {
        msg+=`${e.user} dice: ${e.message} <br/>`
    });
    logs.innerHTML=msg;
})

socket.on('newUserConnected', data=> {
    if (!user) return;
    Swal.fire({
        toast:true,
        position: 'top-end',
        showConfirmButton: false,
        timer: 2000,
        title: `${data} se unió al chat.`,
        icon: "success",
    })
})