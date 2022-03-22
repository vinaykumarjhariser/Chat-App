const express = require('express');
const app = express();
const http = require('http');
const  bodyParser  = require("body-parser");
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server);
const Chat = require('./model/db.js')

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.json())
app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html');
});

io.on('connection', (socket) => {
  console.log('a user connected');
});

app.post('/message', (req, res) => {
  var message = new Chat(req.body);
  message.save((err) =>{
    if(err)
      sendStatus(500);
    io.emit('message', req.body);
    res.sendStatus(200);
  })
})

  app.get('/message', (req, res) => {
    Chat.find({},(err, Chat)=> {
      res.json(Chat);

    })
  })
server.listen(3000, () => {
  console.log('listening on *:3000');
});

