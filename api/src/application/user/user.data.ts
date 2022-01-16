import { Knex } from 'knex';
import { DataClient } from '../../data-providers';
import { allKeysOfUser, User } from './user.model';

export type Data = {
    get: ReturnType<typeof get>
}

export const get = (users: () => Knex.QueryBuilder<any, any>) => async (id: number) => {
    return (await users().select(allKeysOfUser).select<any, User>().where({ ID: id }) as User[])[0];
};

const create = (dataClient: DataClient) => {
    const users = () => dataClient.mysql('users')
    const data: Data = {
        get: get(users)
    };
    return data;
}

export default { create }