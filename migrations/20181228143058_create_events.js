
exports.up = function(knex, Promise) {
  return knex.schema
    .createTable('EVENTS', function(tbl) {
      tbl.increments('event_id').primary();
      tbl.string('event_name', [150]);
      tbl.string('event_place', [150]);
      tbl.string('event_npc');
      tbl.dateTime('event_start').notNullable();
      tbl.dateTime('event_finish').notNullable();
      tbl.integer('event_active', [1]).notNull().defaultTo(1);
      tbl.timestamps();
    });
};

exports.down = function(knex, Promise) {
  return knex.schema
    .dropTable('EVENTS');
};
