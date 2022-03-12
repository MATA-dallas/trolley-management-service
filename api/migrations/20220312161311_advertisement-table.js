exports.up = function (knex) {
    return knex.schema.createTable('advertisements', (table) => {
        table.increments('ID')
        table.float('latitude', 14, 10).notNullable();
        table.float('longitude', 14, 10).notNullable();
        table.timestamp('createdAt').defaultTo(knex.fn.now());
        table.string('message').notNullable();
    })
};

exports.down = function (knex) {
    return knex.dropTable('advertisements');
};