const Bookshelf = require('../../config/bookshelf');

const Event = Bookshelf.Model.extend({
  tableName: 'EVENTS',
  idAttribute: 'event_id',
  hasTimestamps: true,
});

module.exports = Event;
