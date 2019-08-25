import React, { Component } from 'react'
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Divider from '@material-ui/core/Divider';

export class Users extends Component {
  state = {
    users: []
  }

  onUserEvent = ({ users }) => {
    this.setState({ users: users.sort() });
  }

  componentDidMount = () => {
    this.props.registerHandler(this.onUserEvent);
    this.props.requestUsers();
  }
    
  componentWillUnmount = () => {
    this.props.unregisterHandler();
  }


  render() {
    return (
      <div>
        <List dense={true} aria-label='mailbox folders'>
          {this.state.users.map((user) =>
            <React.Fragment>
              <ListItem>
                <ListItemText 
                  primary={ user }
                />
              </ListItem>
              <Divider />
            </React.Fragment>
          )}
        </List>
      </div>
    )
  }
}

export default Users
