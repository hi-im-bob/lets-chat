import React, { Component } from 'react'
import { Redirect } from "react-router-dom";
import TextField from '@material-ui/core/TextField';
import Fab from '@material-ui/core/Fab';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Divider from '@material-ui/core/Divider';
import SendIcon from '@material-ui/icons/Send';
import styled from 'styled-components'
import { isFalseyOrWhiteSpace } from './../utils'

const ChatPanel = styled.div`
  position: relative;
  display: inline-flex;
  flex-direction: column;
  justify-content: flex-end;
  height: 100vh;
  width: 100%;
  box-sizing: border-box;
  z-index: 1;
`

const InputPanel = styled.div`
  display: flex;
  align-items: center;
  padding: 20px;
  padding-right: 40px;
  padding-left: 30px;
  align-self: left;
`

const MessagePanel = styled.div`
  height: 100%;
  overflow: auto;
`

const MessageSender = styled.div`
  white-space: normal !important;
  word-break: break-all !important;
  overflow: initial !important;
  width: 100%;
  height: auto !important;
  color: #696969 !important;
`

const MessageText = styled.div`
  white-space: normal !important;
  word-break: break-all !important;
  overflow: initial !important;
  width: 100%;
  height: auto !important;
  color: #000000 !important;
`

export class Chatroom extends Component {
  state = {
    input: '',
    chatHistory: [],
    users: []
  }

  onInput = (e) => this.setState({ input: e.target.value })

  onSendMessage = (e) => {
    e.preventDefault();
    if (isFalseyOrWhiteSpace(this.state.input))
      return

    this.props.sendMessage(this.state.input);
    this.setState({ input: '' });
  }

  onMessageReceived = (entry) => {
    this.setState({ chatHistory: this.state.chatHistory.concat(entry) });
  }

  scrollChatToBottom = () => {
    this.messagesEnd.scrollIntoView();
  }

  componentDidMount = () => {
    this.props.registerHandler(this.onMessageReceived);
  }

  componentDidUpdate = () => {
    this.scrollChatToBottom()
  }

  componentWillUnmount = () => {
    this.props.unregisterHandler();
  }

  render() {
    if (!this.props.authenticated) return <Redirect to={{ pathname: '/join' }} />

    return (
      <div>
        <ChatPanel>
          <MessagePanel>
            <List dense={true} aria-label='mailbox folders' style={{ paddingTop: 0 }}>
              {this.state.chatHistory.map(({ username, message }, i) =>
                <React.Fragment>
                  <Divider />
                  <ListItem key={i}>
                    <ListItemText 
                      primary={<MessageSender>{ username }</MessageSender>}
                      secondary={<MessageText>{ message }</MessageText>}
                    />
                  </ListItem>
                </React.Fragment>
              )}
              <div style={{ float:"left", clear: "both" }}
                ref={(el) => { this.messagesEnd = el; }}>
              </div>
            </List>
          </MessagePanel>
          <InputPanel>
            <TextField
              autoFocus
              multiline
              rowsMax={2}
              variant='outlined'
              margin='dense'
              placeholder='Type a message'
              fullWidth
              value={this.state.input}
              onChange={this.onInput}
              onKeyPress={e => (e.key === 'Enter' ? this.onSendMessage(e) : null)}
            />
            <Fab
              size='small'
              onClick={this.onSendMessage}
              style={{ marginLeft: 20 }}
            >
              <SendIcon />
            </Fab>
          </InputPanel>
        </ChatPanel>
      </div>
    )
  }
}

export default Chatroom
