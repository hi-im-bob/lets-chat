const http = require('http').createServer();
const io = require('socket.io')(http);
const ClientManager = require('./ClientManager');

const clientManager = new ClientManager();

io.on('connection', (client) => {
  console.log(`client connected... ${client.id}`);
  
  client.on('disconnect', () => {
    console.log(`client disconnected... ${client.id}`);
    const username = clientManager.getUsernameByClientId(client.id);
    if(username) {
      clientManager.removeClient(client.id);
      
      // TODO: Need to emit 'userLeave' when user disconnects OR signs out
      io.emit('userEvent', { users: clientManager.getUsernames() });
      io.emit('message', { message: `${username} has left the chat.` });
    }
  });

  client.on('join', (username, cb) => {
    if (clientManager.usernameAvailable(username)) {
      clientManager.registerUser(client.id, username);
      
      io.emit('message', { message: `${username} has joined the chat!` });
      client.broadcast.emit('userEvent', { users: clientManager.getUsernames() });
      
      return cb();
    }
    return cb('Username already taken');
  });

  client.on('requestUsers', () => {
    client.emit('userEvent', { users: clientManager.getUsernames() });
  });

  client.on('message', (message) => {
    const username = clientManager.getUsernameByClientId(client.id);
    io.emit('message', { username, message });
  });
});

const port = 3001;
http.listen(port, function(){
  console.log(`listening on *:${port}`);
});