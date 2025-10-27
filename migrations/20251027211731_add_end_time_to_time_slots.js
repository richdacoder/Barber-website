/**
 * @param {import('knex').Knex} knex
 */
exports.up = async function(knex) {
  return knex.schema.alterTable('time_slots', table => {
    table.time('end_time'); // Adds a new column of type TIME
  });
};

/**
 * @param {import('knex').Knex} knex
 */
exports.down = async function(knex) {
  return knex.schema.alterTable('time_slots', table => {
    table.dropColumn('end_time'); // Undo if rollback
  });
};
