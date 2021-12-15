import mySqlProvider from "./my-sql.provider";
import {Database} from '../config'
import { Knex } from "knex";

export type MysqlClient = {
    mysql: (tableName: string) => Knex.QueryBuilder<any, any>
}

// append other exported clients to this type
export type DataClient = MysqlClient;

async function create() : Promise<DataClient> {
    const mysqlInstance = await mySqlProvider.create();
    return {
        mysql: (tableName: string) => mysqlInstance.withSchema(Database.schema).table(tableName)
    }
}

export default { create }