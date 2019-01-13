const { NODE_ENV } = process.env;
const knex = require('knex');
const config = require('../../config')[NODE_ENV];

const database = knex({
  client: 'mysql',
  connection: config.connection,
  searchPath: ['knex', 'public'],
});

module.exports = database;
