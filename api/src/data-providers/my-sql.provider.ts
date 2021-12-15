import Knex from 'knex'
import Config from '../config'

async function create () {
  const knex = Knex(Config.Knex.config);
  if(Config.Server.isDev) {
    knex.on('query', function(queryData) {
        console.log(queryData);
    });
  }

  // Verify the connection before proceeding
  try {
    await knex.raw('SELECT now()')

    return knex
  } catch (error: any) {
    throw new Error('Unable to connect to MySql via Knex. Ensure a valid connection. ' + error?.message);
  }
}

export default { create }