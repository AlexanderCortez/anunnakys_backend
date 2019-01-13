
exports.up = (knex, Promise) => knex.schema
  .createTable('EVENTS', (tbl) => {
    tbl.increments('event_id').primary();
    tbl.string('event_name', [150]);
    tbl.string('event_type', [150]);
    tbl.string('event_place', [150]);
    tbl.string('event_npc');
    tbl.string('event_time').notNullable();
    tbl.string('event_day').notNullable();
    tbl.integer('event_repeat');
    tbl.string('event_sound').notNullable();
    tbl.integer('event_active', [1]).notNull().defaultTo(1);
    tbl.timestamps();
  });

exports.down = (knex, Promise) => knex.schema
  .dropTable('EVENTS');
