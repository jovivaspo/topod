require('dotenv').config()
require('./database')
const { Server } = require('socket.io')
const jwt = require('jsonwebtoken')
const Users = require('./models/Users')

const http = require('http')

const app = require('./app')

const server = http.createServer(app)

//SOCKETS

const io = new Server(server, {
    cors: {
        origin: "http://localhost:3000",
        methods: ["GET", "POST"]
    }
})

io.use((socket, next) => {
    console.log(socket.handshake.auth.token)
    const token = socket.handshake.auth.token;
    if (token) {
        jwt.verify(token, process.env.KEY_SECRET, function (err, decoded) {
            if (err) {
                console.log('token incorrecto, Error:', err)
                return next(new Error('Token Incorrecto'))
            }
            socket.decoded = decoded;
            console.log('Token correcto')
            next();
        })
    } else {
        console.log('No existe token')
        next(new Error('Error de autenticación'));
    }


})

io.use(async (socket, next) => {
    const duration = socket.handshake.query.duration
    console.log(duration)
    const { id } = socket.decoded
    const user = await Users.findById(id).populate('podcastsList')
    console.log(user)
    const list = user.podcastsList
    let totalTime = parseInt(duration)
    list.forEach(el => {
        totalTime += parseInt(el.duration)
        console.log(totalTime)
    })
    if (totalTime > process.env.LIMIT_TIME) {
        console.log('Espacio insuficiente', totalTime)
        next(new Error('Espacio insuficiente, borre algún podcast'))

    } else {
        console.log('Espacio ocupado:', totalTime)
        next()
    }
})



    .on("connection", socket => {
        console.log('connected to socket.io user,: ', socket.decoded)

        socket.emit("message_converting", "Convirtiendo video...")

        socket.on("sending_infovideo", (video) => {
            console.log(video)


        })




    })


//Arrancamos el servidor
server.listen(app.get('port'), () => {
    console.log('Server on port', app.get('port'));
})