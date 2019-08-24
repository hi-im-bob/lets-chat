import React, { Component } from 'react'

export class Chatroom extends Component {
  state = {
    message: '',
    chatHistory: []
  }
  
  onChange = (e) => this.setState({ [e.target.name]: e.target.value })

  onSubmit = (e) => {
    e.preventDefault();
    this.props.sendMessage(this.state.message);
    this.setState({ message: '' });
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
        <form onSubmit={this.onSubmit} style={{ display: 'flex' }}>
          <input
            type='text'
            name='message'
            placeholder='Say something nice...'
            style={{ flex: '10', padding: '5px' }}
            value={this.state.message}
            onChange={this.onChange}
          />
          <input
            type='submit'
            value='Submit'
            className='btn'
            style={{ flex: '1' }}
          />
        </form>

        {this.state.chatHistory.map(msg => <p>{msg}</p>)}
      </div>
    )
  }
}

export default Chatroom
