const express = require('express')
const app = express()
const port = 3000
const dbconnect = require('./db')
const Message = require('./models/Message')

app.use(express.static('public'))

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/views/index.html')
})

server = app.listen(port, () => {
    console.log(`Listening on port ${port}`)
})

var MongoClient = require('mongodb').MongoClient;
var url = "mongodb+srv://admin:2W2UMMStsYSNZfDB@ez-job-8t0ro.mongodb.net/ez-job?retryWrites=true&w=majority";

const io = require('socket.io')(server)

io.on('connection', (socket) => {
    socket.username = 'Anonymous'
    console.log(`${socket.username} connected`)

    MongoClient.connect(url, function(err, db) {
        if (err) throw err;
        var dbo = db.db("ez-job");
        dbo.collection("message").find({}).toArray(function(err, result) {
            if (err) throw err;
            console.log(result)
            io.sockets.emit('get_messages', result)
            db.close
        })
      });

    socket.on('change_username', (data) => {
        console.log(data.username)
        socket.username = data.username
    })

    socket.on('typing', (data) => {
        socket.broadcast.emit("typing", {
            user: socket.username
        });
    })

    socket.on('new_message', (data) => {
        console.log(socket.username + ":" + data.message)
        io.sockets.emit('new_message', {message : data.message,  username : socket.username})
        dbconnect.then(db => {
            let chatMessage = new Message({ message: data.message, sender: socket.username })
            chatMessage.save()
        })
    })

    socket.on('disconnect', function() {
        console.log(`${socket.username} disconnected`)
    })
})