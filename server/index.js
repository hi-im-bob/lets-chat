const http = require('http').createServer();
const io = require('socket.io')(http);
const ClientManager = require('./ClientManager');

const clientManager = new ClientManager();

io.on('connection', (client) => {
  console.log('a user connected');
  
  client.on('disconnect', () => {
    const user = clientManager.getUsernameByClientId(client.id);
    clientManager.removeClient(client.id);
    client.broadcast.emit('message', `${user} has left the chat.`)
  });

  client.on('join', (username, cb) => {
    if (clientManager.usernameAvailable(username)) {
      clientManager.registerUser(client.id, username);
      io.emit('message', `${username} has joined the chat!`);
      
      return cb(null, username);
    }
    return cb("Username already taken")
  });

  client.on('message', (message) => {
    const user = clientManager.getUsernameByClientId(client.id);
    io.emit('message', `${user}: ${message}`);
  });
});

const port = 3000
http.listen(port, function(){
  console.log(`listening on *:${port}`);
});