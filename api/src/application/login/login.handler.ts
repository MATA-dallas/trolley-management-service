import { Data } from "./login.data";



const getAuthenticatedUser = (data: Data) => async (username: string, passwordHash: string) => {
    const user = await data.getUserByName(username);
    if(user == null || user.password != passwordHash)
        return null
    return user;
}

export interface Handler {
    getAuthenticatedUser: ReturnType<typeof getAuthenticatedUser>
}

const create = (data: Data): Handler => {
    return {
        getAuthenticatedUser: getAuthenticatedUser(data)
    }
}

export default { create };