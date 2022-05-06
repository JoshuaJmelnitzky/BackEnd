
const handlebars = require('express-handlebars')
const fs =require('fs')
const express = require('express');
const http = require('http');
const { Server } = require('socket.io');
const Chat = require('./Chat');
const app = express();
const server = http.createServer(app);
const io = new Server(server);


app.engine('hbs', handlebars.engine({
    extname: '.hbs',
    defaultLayout: 'index.hbs',
    layoutsDir: __dirname + '/views/layouts',
    partialsDir: __dirname + '/views/partials',
    defaultLayout: 'index',
    extname: 'hbs',
}))


app.set('view engine', 'hbs')
app.set('views', __dirname +'/views')


app.use(express.static('public'))
app.use(express.json())
app.use(express.urlencoded({extended:true}))


let lectura = fs.readFileSync('./productos.txt');
let conversion = JSON.parse(lectura)


const mensajes = new Chat('mensajes.json');

let productos =conversion
app.get('/',  async (req, res) => {   
	let messages = await mensajes.getAll();
    res.render('main', {productos, messages}, );
});



app.post('/productos',(req,res)=>{
    productos.push(req.body)                   
    res.render('main', {productos});
})
  
io.on('connection', socket => {
	console.log('New conection', socket.id);

	socket.on('disconnect', () => {
		console.log(socket.id, 'disconnected');
	});
	socket.on('message', async message => {
		const data = {
			email: message.email,
			message: message.message,
			date: new Date().toLocaleString(),
		};
		await mensajes.save(data);
		io.emit('message', data);
	});
});


app.use((err, req, res, next) => {
	console.log(err);
	res.status(500).json({ err, message: 'Something went wrong, sorry' });
});


const PORT = process.env.PORT || 8080;

server.listen(PORT, () => {
	console.log(`Servidor:${PORT}`);
});

server.on('error', err => {
	console.log(`Algo salio mal: ${err}`);
});