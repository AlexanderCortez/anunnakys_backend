const Bookshelf = require('../../config/bookshelf');

const User = Bookshelf.Model.extend({
  tableName: 'USERS',
  idAttribute: 'user_id',
  hasTimestamps: true,
});

module.exports = User;
