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
  export const schema = process.env.DATABASE_NAME ?? 'alerts';
  export const databasePort = parseInt(process.env.DATABASE_PORT ?? "3306");
  export const databaseHost = process.env.DATABASE_HOSTNAME ?? "";
  export const databaseName = process.env.DATABASE_NAME ?? "";
  export const databasePassword = process.env.DATABASE_PASSWORD ?? "";
  export const databaseUser = process.env.DATABASE_USERNAME ?? "";
}

export namespace Server {
  export const port = Number(process.env.PORT || '3000');
  export const bodyLimit = '100kb';
  export const corsHeaders = ['Link'];
  export const isDev = process.env.NODE_ENV === 'development';
  export const jwtSecret = process.env.JWT_SECRET ?? "";
}

export namespace Rastrac {
  export const baseUrl = process.env.RASTRAC_BASE_URL;
  export const basicAuthToken = process.env.RASTRAC_AUTH_TOKEN;
}

export namespace Knex {
  export const config: BaseKnex.Config = {
    client: 'mysql',
    connection: {
      host: Database.databaseHost,
      database: Database.databaseName,
      user: Database.databaseUser,
      password: Database.databasePassword,
      port: Database.databasePort,
    },
    pool: {
      min: parseInt(process.env.DATABASE_POOL_MIN || "0"),
      max: parseInt(process.env.DATABASE_POOL_MAX || "10")
    },
    migrations: {
      tableName: 'KnexMigrations',
      directory: 'migrations'
    },
  }
}


export default {Database, Server, Knex, Rastrac}