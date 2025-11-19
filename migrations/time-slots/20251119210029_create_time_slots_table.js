'use strict';

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = async function(knex) {
  const exists = await knex.schema.hasTable('time_slots');
  if (!exists) {
    return knex.schema.createTable('time_slots', (table) => {
      table.increments('id').primary();
      table.integer('barber_id').unsigned().notNullable()
           .references('id').inTable('barbers')
           .onDelete('CASCADE');
      table.date('slot_date').notNullable();
      table.time('slot_time').notNullable();
      table.boolean('is_available').defaultTo(true);
      table.timestamps(true, true);
    });
  }
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = async function(knex) {
  const exists = await knex.schema.hasTable('time_slots');
  if (exists) {
    return knex.schema.dropTable('time_slots');
  }
};
