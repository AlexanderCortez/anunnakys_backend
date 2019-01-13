
exports.up = (knex, Promise) => knex.schema
  .createTable('USERS', (tbl) => {
    tbl.increments('user_id').primary();
    tbl.string('user_name', [150]);
    tbl.string('user_username', [150]).unique();
    tbl.string('user_password');
    tbl.integer('user_isAdmin', [1]);
    tbl.integer('user_active', [1]).notNull().defaultTo(1);
    tbl.timestamps();
  });

exports.down = (knex, Promise) => knex.schema
  .dropTable('USERS');
