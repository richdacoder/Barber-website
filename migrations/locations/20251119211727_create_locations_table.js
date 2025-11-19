'use strict';

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = async function(knex) {
  const exists = await knex.schema.hasTable('locations');
  if (!exists) {
    return knex.schema.createTable('locations', (table) => {
      table.increments('id').primary();
      table.string('address', 255).notNullable();
      table.string('type', 50).notNullable();
      table.string('description', 255);
      table.timestamps(true, true); // created_at and updated_at
    });
  }
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = async function(knex) {
  const exists = await knex.schema.hasTable('locations');
  if (exists) {
    return knex.schema.dropTable('locations');
  }
};
