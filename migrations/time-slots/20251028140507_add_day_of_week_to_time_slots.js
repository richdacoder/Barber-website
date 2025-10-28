exports.up = function(knex) {
  return knex.schema.table('time_slots', function(table) {
    table.string('day_of_week').nullable();
  });
};

exports.down = function(knex) {
  return knex.schema.table('time_slots', function(table) {
    table.dropColumn('day_of_week');
  });
};
