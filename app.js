/* Desafio N04 */
import express from 'express';
import router from './src/routes/chat.js';
import __dirname from './utils.js';

const app=express();
const PORT=8080;

app.use(express.urlencoded({extended:true}));
app.use(express.static(__dirname + '/src/public'));
app.use('/api/chat', router);

/* CONFIGURACION DE HANDLEBARS ------------------------------------------------------------------ */
import { engine } from 'express-handlebars';
app.set('view engine', 'hbs');
app.engine('hbs',engine( {
    extname: '.hbs', // Extensión a utilizar
    defaultLayout: 'index.hbs', // Plantilla principal
    layoutsDir: './src/views/layouts', // Ruta de la plantilla principal
    partialsDir: './src/views/partials' // Ruta de las plantillas parciales
} ));

/* SOCKETS ----------------------------------------------------------------------------------------- */
import { Server } from 'socket.io';
import socketFunction from "./src/sockets/sockets.js";

const server = app.listen(PORT, () => {
    console.log(`Servidor http escuchando en el puerto ${server.address().port} usando express`);
})

server.on("error", e=> console.log(`Error en el servidor ${e}`));
const socketServer = new Server(server); // socketServer sera un servidor para trabajar con sockets.

socketFunction(socketServer);
