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

const button = document.getElementById('sendButton');

button.addEventListener("click", (event) => {
    if (chatbox.value.trim().length>0) {
        socket.emit('msg', {user, message:chatbox.value.trim()})
        chatbox.value="";
    }
    
    
  });

socket.on('logs', data=>{
    const logs = document.getElementById('logs');
    let msg="";
    data.forEach(e => {
        msg+=`
        <p class="fw-bold">${e.user}:&nbsp</p><p class="fst-italic">${e.message} </p><br/>`
    });
    logs.innerHTML=msg;
})

socket.on('newUserConnected', data=> {
    if (!user) return;
    Swal.fire({
        toast:true,
        position: 'top-end',
        showConfirmButton: false,
        timer: 4000,
        title: `${data} se unió al chat.`,
        icon: "success",
    })
})

/* socket.on('users', data => {
    let users="";
    const usersBox = document.getElementById('connectedPeople');
    data.forEach(e => {
        users+=`${e} <br/>`
    });
    usersBox.innerHTML=users;
}) */