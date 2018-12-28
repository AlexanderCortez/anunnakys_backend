const config = require('./config');

module.exports = {
  development: {
    client: 'mysql',
    connection: config.connection,
    migrations: {
      tableName: 'migrations',
    },
  },
};
