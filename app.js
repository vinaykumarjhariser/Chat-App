const express = require('express');
const app = express();
const http = require('http');
const path = require('path')
const  bodyParser  = require("body-parser");
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server);
const Chat = require('./model/db.js')
const varification = require('./varification/app.js');
const user = require('./varification/model/user.js');
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.json())

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html');

});

app.use(express.static('public')) // grab public directory
const users = {};
io.on('connection', (socket) => {
  console.log('a user connected');
});

io.on('connection', (socket) => {
  Chat.find().then(function(result){
    socket.emit('output-message', result)
  })
  socket.on('new-user', name => {
    users[socket.id] = name
    socket.broadcast.emit('user-connected', name)
  // })

  socket.on('chat message', (msg) => {
    console.log(`${name} : ` + msg);
    io.emit('chat message', msg);
    let Message = new Chat ({
      users:name,
      msg:msg
    })
    Message.save()
  });
})
  socket.on('disconnect', () => {
    socket.broadcast.emit('user-disconnected', users[socket.id])
    delete users[socket.id]
  })
});

server.listen(3000, () => {
  console.log('listening on *:3000');
});

