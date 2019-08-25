import React, { Component } from 'react';
import Socket from './Socket'
import 'react-toastify/dist/ReactToastify.css';
import Grid from '@material-ui/core/Grid';
import Chatroom from './components/Chatroom'
import JoinChatroom from './components/JoinChatroom'
import Users from './components/Users'
import './App.css';

class App extends Component {
  state = {
    username: null,
    client: new Socket()
  }

  registerUser = (username, onError) => {
    this.state.client.registerUser(username, (err) => {
      if (err) onError(err)
      else this.setState({ username });
    });
  }

  renderLogin = () => (
    <JoinChatroom register={this.registerUser} />
  )

  renderChat = () => (
    <Grid container>
      <Grid item xs={12} sm={3} style={{ backgroundColor: '#eaeaea', height: '100vh' }}>
        <Users
          registerHandler={this.state.client.registerUserHandler}
          unregisterHandler={this.state.client.unregisterUserHandler}
          requestUsers={this.state.client.requestUsers}
        />
      </Grid>
      <Grid item xs={12} sm={9}>
        <Chatroom
            sendMessage={this.state.client.sendMessage}
            registerHandler={this.state.client.registerMessageHandler}
            unregisterHandler={this.state.client.unregisterMessageHandler}
        />
      </Grid>
    </Grid>
  )

  render() {
    const page = !this.state.username ?
      this.renderLogin() :
      this.renderChat();

    return (
      <div className="App">
        {page}
      </div>
    );
  }
}

export default App;
