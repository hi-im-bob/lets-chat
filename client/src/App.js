import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from "react-router-dom";
import Socket from './Socket'
import 'react-toastify/dist/ReactToastify.css';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import Chatroom from './components/Chatroom'
import JoinChatroom from './components/JoinChatroom'
import Users from './components/Users'
import './App.css';

class App extends Component {
  state = {
    username: null,
    client: new Socket((message) => this.setState({ username: null }))
  }

  registerUser = (username, onError) => {
    this.state.client.registerUser(username, (err) => {
      if (err) onError(err)
      else this.setState({ username });
    })
  }

  onLeaveChat = (e) => {
    e.preventDefault();
    this.state.client.leaveChatroom();
    this.setState({ username: null });
  }

  renderLogin = () => (
    <JoinChatroom authenticated={!!this.state.username} register={this.registerUser} />
  )

  renderChat = () => (
    <Grid container>
      <Grid item xs={12} sm={3} style={{ backgroundColor: '#eaeaea', height: '100vh' }}>
        <Button
          size='small'
          variant="outlined"
          color="secondary"
          onClick={this.onLeaveChat}
          style={{ marginTop: '20px' }}
        >
          Leave Chatroom
        </Button>
        <Users
          registerHandler={this.state.client.registerUserHandler}
          unregisterHandler={this.state.client.unregisterUserHandler}
          requestUsers={this.state.client.requestUsers}
        />
      </Grid>
      <Grid item xs={12} sm={9}>
        <Chatroom
            activeUsername={this.state.username}
            sendMessage={this.state.client.sendMessage}
            registerHandler={this.state.client.registerMessageHandler}
            unregisterHandler={this.state.client.unregisterMessageHandler}
        />
      </Grid>
    </Grid>
  )

  render() {
    return (
      <Router>
        <div className="App">
          <Route path="/" exact render={this.renderChat} />
          <Route path="/join" exact render={this.renderLogin} />
        </div>
      </Router>
    );
  }
}

export default App;
