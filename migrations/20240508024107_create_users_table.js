/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
    // Código para criar tabelas
    return knex.schema.createTable('users', function(table) {
        table.increments('id');
        table.string('name').notNullable();
        table.string('email').notNullable().unique();
        table.string('password').notNullable();
    });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
    return knex.schema.dropTable('users');
};
