import React, { Component } from 'react';
import 'react-toastify/dist/ReactToastify.css';

import './App.css';
import Socket from './Socket'
import Chatroom from './components/Chatroom'
import JoinChatroom from './components/JoinChatroom'

class App extends Component {
  state = {
    user: null,
    client: new Socket()
  }

  registerUser = (username, onError) => {
    this.state.client.registerUser(username, (err, name) => {
      if (err) onError(err)
      else this.setState({ user: username });
    });
  }

  render() {
    const page = !this.state.user ?
      <JoinChatroom
        register={this.registerUser}
      /> :
      <Chatroom
        sendMessage={this.state.client.sendMessage}
        registerHandler={this.state.client.registerHandler}
      />

    return (
      <div className="App">
        {page}
      </div>
    );
  }
}

export default App;
