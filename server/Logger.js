const mongodb = require('mongodb');

const MongoClient = mongodb.MongoClient;
const connectionUrl = 'mongodb://mongo_service:27017';
const databaseName = 'chat-logs';
const events = 'events';
const messages = 'messages';

module.exports = class Logger {
  constructor() {
    MongoClient.connect(connectionUrl, { useNewUrlParser: true }, (err, client) => {
      if(err) throw 'Unable to connect to MongoDB';      
      this.db = client.db(databaseName);
    });
  }

  storeEvent({ clientId, username, event }) {
    this.db.collection(events).insertOne({
      clientId,
      username,
      event,
      timestamp: new Date().toISOString()
    });
  }

  storeMessage({ clientId, username, message }) {
    this.db.collection(messages).insertOne({
      clientId,
      username,
      message,
      timestamp: new Date().toISOString()
    });
  }
};
