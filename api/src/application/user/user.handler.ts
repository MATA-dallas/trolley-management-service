import { Data } from './user.data';

const getUserById = (data: Data) => (id: number) => {
    return data.get(id);
};

export type Handler = {
    getUserById: ReturnType<typeof getUserById>
};

const create = (data: Data) => {
    const handler: Handler = {
        getUserById: getUserById(data)
    };
    return handler;
}

export default { create }