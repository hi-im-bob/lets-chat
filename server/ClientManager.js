const timeoutInMillis = 30000

module.exports = class ClientManager {
  constructor() {
    this.users = new Map();
  }

  usernameAvailable(username) {
    return !Array.from(this.users.values())
      .map(user => user.username.toLowerCase())
      .includes(username.toLowerCase());
  }

  getUsernameByClientId(clientId) {
    const client = this.users.get(clientId);
    if (client) return client.username;
    else return null;
  }

  getUsernames() {
    return Array.from(this.users.values())
      .map(user => user.username);
  }

  resetAfkTimeout(clientId, onTimeout) {
    clearTimeout(this.users.get(clientId).afkTimeout);
    this.users.get(clientId).afkTimeout = setTimeout(onTimeout, timeoutInMillis);
  }

  registerUser(clientId, username, onTimeout) {
    this.users.set(clientId, {
      username,
      afkTimeout: setTimeout(onTimeout, timeoutInMillis)
    });
  }

  removeClient(clientId) {
    this.users.delete(clientId)
  }
}