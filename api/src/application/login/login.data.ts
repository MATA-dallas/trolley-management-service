import { Knex } from "knex"
import { DataClient } from "../..//data-providers";
import { User } from "./login.model";

const getUserByName = (users: () => Knex.QueryBuilder<any, any>) => async (username: string) => {
    var user = await users().where({
        user: username
    })
    .first()
    .select();

    return user as User;
}

export interface Data {
    getUserByName: ReturnType<typeof getUserByName>
}

const create = async (data: DataClient): Promise<Data> => {
    const users = () => data.mysql('users');

    return {
        getUserByName: getUserByName(users)
    }
}

export default { create };