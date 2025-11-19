'use strict';

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = async function(knex) {
  const exists = await knex.schema.hasTable('clients');
  if (!exists) {
    return knex.schema.createTable('clients', (table) => {
      table.increments('id').primary();
      table.string('first_name', 255).notNullable();
      table.string('last_name', 255).notNullable();
      table.string('email', 255).unique().notNullable();
      table.string('phone_number', 20);
      table.string('profile_picture', 255);
      table.timestamps(true, true);
    });
  }
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = async function(knex) {
  const exists = await knex.schema.hasTable('clients');
  if (exists) {
    return knex.schema.dropTable('clients');
  }
};
