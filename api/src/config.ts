var parseDbUrl =require('parse-database-url')
import dotenv from 'dotenv'
import { Knex as BaseKnex } from 'knex';

console.log(process.env.DEVELOPMENT);
if(process.env.DEVELOPMENT) {
  console.log("reading environment variables from .dev.env");
  dotenv.config({path:'./.dev.env'});
}
else {
  console.log("reading environment variables from .env");
  dotenv.config();
}

export namespace Database {
  export const schema = 'alerts'
}

export namespace Server {
  export const port = Number(process.env.PORT || '3000')
  export const bodyLimit = '100kb'
  export const corsHeaders = ['Link']
  export const isDev = process.env.NODE_ENV === 'development'
}

export namespace Knex {
  export const config: BaseKnex.Config = {
    client: 'mysql',
    connection: {
      host: process.env.DATABASE_HOSTNAME,
      database: process.env.DATABASE_NAME,
      user: process.env.DATABASE_USERNAME,
      password: process.env.DATABASE_PASSWORD,
      port: parseInt(process.env.DATABASE_PORT || "3306"),
    },
    pool: {
      min: parseInt(process.env.DATABASE_POOL_MIN || "0"),
      max: parseInt(process.env.DATABASE_POOL_MAX || "10")
    },
    migrations: {
      tableName: 'KnexMigrations',
      directory: '../Migrations'
    },
  }
}


export default {Database, Server, Knex}