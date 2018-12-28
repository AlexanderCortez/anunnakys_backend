
exports.up = function(knex, Promise) {
  return knex.schema
    .createTable('USERS', function (tbl) {
      tbl.increments('user_id').primary();
      tbl.string('user_name', [150]);
      tbl.string('user_username', [150]);
      tbl.string('user_password');
      tbl.string('user_isAdmin');
      tbl.integer('user_active', [1]).notNull().defaultTo(1);
      tbl.timestamps();
  });
};

exports.down = function(knex, Promise) {
  return knex.schema
    .dropTable('USERS');
};
