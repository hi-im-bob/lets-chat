module.exports = class ClientManager {
  constructor() {
    this.users = new Map();
  }

  usernameAvailable(username) {
    return !Array.from(this.users.values()).includes(username)
  }

  getUsernameByClientId(clientId) {
    return this.users.get(clientId)
  }

  registerUser(clientId, username) {
      this.users.set(clientId, username);
  }

  removeClient(clientId) {
    this.users.delete(clientId)
  }
}