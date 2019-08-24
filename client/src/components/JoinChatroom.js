import React, { Component } from 'react'
import { ToastContainer, toast } from 'react-toastify';
import styled from 'styled-components';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';

const usernameRegExp = new RegExp('^[A-Za-z0-9_-]{3,16}$');

const DialogContainer = styled.div`
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  background-color: rgba(0, 0, 0, 0.8);
  display: flex;
  justify-content:center;
  align-items: center;
`;

const Dialog = styled.div`
  width: 500px;
  background-color: white;
  display: flex;
  align-items:  center;
`;

export class JoinChatroom extends Component {
  state = {
    username: ''
  }

  onChange = (e) => this.setState({ [e.target.name]: e.target.value })

  onSubmit = (e) => {
    e.preventDefault();
    const username = this.state.username;

    if (this.validUsername(username)) {
      this.props.register(username, this.notifyError);
    } else {
      this.notifyError('Username must be 3 to 16 characters long and may include "_" and "–"');
    }
  }

  notifyError = (err) => {
    toast.error(err, { 
      autoClose: 7000,
      position: toast.POSITION.TOP_LEFT 
    });
  };

  validUsername = (username) => {
    usernameRegExp.test(username);
    return username && usernameRegExp.test(username);
  }

  render() {
    return (
      <div>
        <DialogContainer>
          <Dialog>
            <form className="dialog-form" onSubmit={this.onSubmit}>
              <TextField
                id="username"
                autoFocus
                type="text"
                name="username"
                value={this.state.username}
                onChange={this.onChange}
                placeholder="Enter your username"
              />
              <Button 
                type="submit"
                color="primary"  
              > 
                Enter chat
              </Button>
            </form>
          </Dialog>
        </DialogContainer>
        <ToastContainer />
      </div>
    )
  }
}

export default JoinChatroom
