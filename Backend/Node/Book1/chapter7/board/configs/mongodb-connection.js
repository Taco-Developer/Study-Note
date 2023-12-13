require('dotenv').config();
const { MongoClient } = require('mongodb');

const DB_ID = process.env.DB_ID;
const DB_PASSWORD = process.env.DB_PASSWORD;
const uri = `mongodb+srv://${DB_ID}:${DB_PASSWORD}@node.5fusz1w.mongodb.net/board?retryWrites=true&w=majority`;

module.exports = function (callback) {
  return MongoClient.connect(uri, callback);
};
