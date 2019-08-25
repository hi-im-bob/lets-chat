import React, { Component } from 'react'
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
  background-color: #dadada;
`

const Scrollable = styled.div`
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

  componentDidMount = () => {
    this.props.registerHandler(this.onMessageReceived);
  }

  componentWillUnmount = () => {
    this.props.unregisterHandler();
  }

  render() {
    return (
      <div>
        <ChatPanel>
          <Scrollable>
            <List dense={true} aria-label='mailbox folders' style={{ paddingTop: 0 }}>
              {this.state.chatHistory.map(({ username, message }) =>
                <React.Fragment>
                  <Divider />
                  <ListItem>
                    <ListItemText 
                      primary={<MessageSender>{ username }</MessageSender>}
                      secondary={<MessageText>{ message }</MessageText>}
                    />
                  </ListItem>
                </React.Fragment>
              )}
            </List>
          </Scrollable>
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
