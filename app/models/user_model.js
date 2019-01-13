const Bookshelf = require('../../config/bookshelf');

Bookshelf.plugin('visibility');

const User = Bookshelf.Model.extend({
  tableName: 'USERS',
  idAttribute: 'user_id',
  hidden: ['user_password'],
  hasTimestamps: true,
});

module.exports = User;
