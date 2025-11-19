'use strict';

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = async function(knex) {
  return knex.schema.createTable('services', (table) => {
    table.increments('id').primary();       // Auto-incrementing primary key
    table.string('name').notNullable();     // Name of the service (e.g., haircut type)
    table.timestamps(true, true);           // created_at and updated_at timestamps
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = async function(knex) {
  return knex.schema.dropTableIfExists('services');
};
