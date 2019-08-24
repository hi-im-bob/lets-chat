import React, { Component } from 'react'
import { ToastContainer, toast } from 'react-toastify';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

const usernameRegExp = new RegExp('^[A-Za-z0-9_-]{3,16}$');

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
      this.notifyError('Invalid username');
    }
  }

  notifyError = (err) => toast.error(err, { position: toast.POSITION.TOP_LEFT });

  validUsername = (username) => username && usernameRegExp.test(username);

  render() {
    return (
      <div>
        <Dialog open={true} aria-labelledby="form-dialog-title">
          <DialogTitle id="form-dialog-title">Select a username</DialogTitle>
          <form onSubmit={this.onSubmit}>
            <DialogContent>
              <DialogContentText>
                The username must be 3 to 16 characters long and may contain
                letters, numbers, underscores and hyphens.
              </DialogContentText>
              <TextField
                autoFocus
                fullWidth
                id="username"
                name="username"
                label="Username"
                type="text"
                onChange={this.onChange}
              />
            </DialogContent>
            <DialogActions>
              <Button type="submit" color="primary">
                Enter chat
              </Button>
            </DialogActions>
          </form>
        </Dialog>
        <ToastContainer />
      </div>
    )
  }
}

export default JoinChatroom
