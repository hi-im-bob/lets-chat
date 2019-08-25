import io from 'socket.io-client'

export default class Socket {
  constructor() {
    this.socket = io.connect('http://localhost:3000')

    this.socket.on('error', function (err) {
      console.log('received socket error:')
      console.log(err)
    })
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

  registerUser = (username, cb) => {
    this.socket.emit('join', username, cb);
  }

  requestUsers = () => {
    this.socket.emit('requestUsers');
  }
}
