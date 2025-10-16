/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = async function(knex) {
  console.log("🚀 Running migration: add_service_to_appointments");
  await knex.schema.table('appointments', function(table) {
    table.string('service');
  });
};
/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = async function(knex) {
console.log("remove 'Service' column...");
await knex.schema.table("appointments", function (table){
  table.string("service");
});

};
