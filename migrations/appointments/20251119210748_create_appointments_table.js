'use strict';

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = async function(knex) {
  const exists = await knex.schema.hasTable('appointments');
  if (!exists) {
    return knex.schema.createTable('appointments', (table) => {
      table.increments('id').primary();
      table.integer('client_id').unsigned().notNullable()
           .references('id').inTable('clients')
           .onDelete('CASCADE');
      table.integer('time_slot_id').unsigned().notNullable()
           .references('id').inTable('time_slots')
           .onDelete('CASCADE');
      table.string('status', 50).defaultTo('pending');
      table.timestamps(true, true);
    });
  }
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = async function(knex) {
  const exists = await knex.schema.hasTable('appointments');
  if (exists) {
    return knex.schema.dropTable('appointments');
  }
};
