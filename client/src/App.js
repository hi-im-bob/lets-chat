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
    user: null,
    client: new Socket()
  }

  registerUser = (username, onError) => {
    this.state.client.registerUser(username, (err, name) => {
      if (err) onError(err)
      else this.setState({ user: name });
    });
  }

  getUsers = () => {
    
  }

  renderLogin = () => (
    <JoinChatroom register={this.registerUser} />
  )

  renderChat = () => (
    <Grid container>
      <Grid item xs={12} sm={3} style={{ backgroundColor: '#eaeaea', height: '100vh' }}>
        <Users />
      </Grid>
      <Grid item xs={12} sm={9}>
        <Chatroom
            sendMessage={this.state.client.sendMessage}
            registerHandler={this.state.client.registerHandler}
        />
      </Grid>
    </Grid>
  )

  render() {
    const page = !this.state.user ?
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
