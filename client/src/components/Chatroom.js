import React, { Component } from 'react'
import TextField from '@material-ui/core/TextField';
import Fab from '@material-ui/core/Fab';
import SendIcon from '@material-ui/icons/Send';
import styled from 'styled-components'

const InputPanel = styled.div`
  display: flex;
  align-items: center;
  padding: 20px;
  align-self: center;
  border-top: 1px solid #fafafa;
`

export class Chatroom extends Component {
  state = {
    input: '',
    chatHistory: []
  }
  
  onInput = (e) => this.setState({ input: e.target.value })

  onSendMessage = (e) => {
    if (!this.state.input)
      return

    this.props.sendMessage(this.state.input);
    this.setState({ input: '' });
  }

  componentDidMount = () => {
    this.props.registerHandler(this.onMessageReceived);
  }

  componentWillUnmount = () => {
    this.props.unregisterHandler();
  }

  onMessageReceived = (entry) => {
    this.setState({ chatHistory: this.state.chatHistory.concat(entry) });
  }

  render() {
    return (
      <div>
        <InputPanel>
          <TextField
            placeholder="Type a message"
            value={this.state.input}
            onChange={this.onInput}
            onKeyPress={e => (e.key === 'Enter' ? this.onSendMessage() : null)}
          />
          <Fab
            size="small"
            onClick={this.onSendMessage}
            style={{ marginLeft: 20 }}
          >
            <SendIcon />
          </Fab>
        </InputPanel>
        {this.state.chatHistory.map(msg => <p>{msg}</p>)}
      </div>
    )
  }
}

export default Chatroom
