import mySqlProvider from "./my-sql.provider";
import {Database} from '../config'
import knex, { Knex } from "knex";
import rastracProvider, { RastracEventEmitter, RastracProvider } from "./rastrac.provider";

export type MysqlClient = {
    mysql: (tableName: string) => Knex.QueryBuilder<any, any>,
    rastrac: RastracProvider
}

// append other exported clients to this type
export type DataClient = MysqlClient;

async function create(emitter: RastracEventEmitter, mysqlInstance: Knex<any, unknown[]>) : Promise<DataClient> {
    return {
        mysql: (tableName: string) => mysqlInstance.withSchema(Database.schema).table(tableName),
        rastrac: rastracProvider.create(emitter)
    }
}

export default { create }