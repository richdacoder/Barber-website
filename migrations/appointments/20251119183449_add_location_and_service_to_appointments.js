/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = async function(knex) {
  return knex.schema.alterTable('appointments', function(table) {
    // Foreign key to locations table
    table.integer('location_id').unsigned().references('id').inTable('locations').onDelete('SET NULL');

    // Custom address if user wants to enter their own
    table.string('custom_address', 255);

    // Optional description or note
    table.string('custom_description', 255);

    // Type of appointment: "shop" (barber shop) or "mobile" (truck/barber at home)
    table.string('appointment_type', 50);

    // Foreign key to services table
    table.integer('service_id').unsigned().references('id').inTable('services').onDelete('SET NULL');
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = async function(knex) {
  return knex.schema.alterTable('appointments', function(table) {
    table.dropColumn('location_id');
    table.dropColumn('custom_address');
    table.dropColumn('custom_description');
    table.dropColumn('appointment_type');
    table.dropColumn('service_id');
  });
};
