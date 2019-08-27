import io from 'socket.io-client'

export default class Socket {
  constructor(onRemoved) {
    this.socket = io.connect('http://localhost:3001')

    this.socket.on('error', (err) => {
      console.log('received socket error:');
      console.log(err);
    });
    
    this.socket.on('removed', onRemoved);
  }

  registerUserHandler = (onUserEvent) => {
    this.socket.on('userEvent', onUserEvent);
  }
  
  unregisterUserHandler = (onUserEvent) => {
    this.socket.off('userEvent', onUserEvent);
  }

  registerMessageHandler = (onMessageReceived) => {
    this.socket.on('message', onMessageReceived);
  }

  unregisterMessageHandler = () => {
    this.socket.off('message')
  }

  sendMessage = (message) => {
    this.socket.emit('message', message);
  }

  leaveChatroom = () => {
    this.socket.emit('leave');
  }

  registerUser = (username, cb) => {
    this.socket.emit('join', username, cb);
  }

  requestUsers = () => {
    this.socket.emit('requestUsers');
  }
}
