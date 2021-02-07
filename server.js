//////////////////////
// CONNECT TO DATABASE
const mongoose = require('mongoose')

mongoose.connect(process.env.DB_CONNECTION_STRING, {useNewUrlParser: true, useUnifiedTopology: true})
    .catch((error) => {
        console.log(error)
    })
    
mongoose.set('useCreateIndex', true);

mongoose.connection.once('open', () => {
    console.log('Connected to the database')
})

mongoose.connection.on('error', (error) => {
    console.log(error)
})

////////////////
// SET UP SERVER
const app = require('express')()
const http = require('http').createServer(app);
const io = require('socket.io')(http);
const morgan = require('morgan')
const bodyparser = require('body-parser')

// middleware
app.use(morgan('combined'))
app.use(bodyparser.json())

// register apps
app.use('/api', require('./src/apps/api/api'))

// sockets
io.on('connection', (socket) => {
    console.log('a user connected');

    socket.emit('greet', "WELCOME");

    socket.on('msg', (msg) => {
        console.log("client says", msg);
        socket.disconnect(true);
    })
});


// start server
http.listen(process.env.PORT, () => {
    console.log(`Server up, listening on port ${process.env.PORT}`)
})