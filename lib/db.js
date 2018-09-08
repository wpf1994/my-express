var pg = require('pg')
var conString = "postgres://postgres:123@localhost/my-express";
var client = new pg.Client(conString);
client.connect()

module.exports = client


