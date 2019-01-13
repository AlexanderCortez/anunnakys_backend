const { NODE_ENV } = process.env;
const config = require('./config')[NODE_ENV];

module.exports = {
  development: {
    client: 'mysql',
    connection: config.connection,
    migrations: {
      tableName: 'migrations',
    },
  },
};
