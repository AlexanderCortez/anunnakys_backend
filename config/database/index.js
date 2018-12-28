const knex = require('knex');
const config = require('../../config');

const database = knex({
  client: 'pg',
  connection: config.connection,
  searchPath: ['knex', 'public'],
});

module.exports = database;
