/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = async function(knex) {
  return knex.schema.alterTable('appointments', function(table) {
    table.dropColumn('service'); // remove the old service string column
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = async function(knex) {
  return knex.schema.alterTable('appointments', function(table) {
    table.string('service'); // restore the column if rollback
  });
};
