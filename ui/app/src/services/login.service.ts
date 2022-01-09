import md5 from "md5";
import md5Hex from "md5-hex";
import { User } from "../store/store.models"
import { Config } from "../util/config";

export type LoginService = {
    tryLogIn: ReturnType<typeof tryLogIn>,
    getAuthToken: ReturnType<typeof getAuthToken>
}

export type LoginResponse = {
    successful: boolean,
    response: string
}

let authToken: string | null = null;

const getAuthToken = () => () => authToken;

const tryLogIn = (config: Config) => (username: string, password: string) => {
    return fetch(`${config.apiBaseUrl}/login`, {
        body: JSON.stringify({
            "username":username,
            "password": md5Hex(username + md5Hex(password))
        }),
        headers: {
            'Content-Type': 'application/json'
        },
        method:'POST'
    })
        .then(async (res) => {
            const data = {
                successful: res.status == 200,
                response: await res.json()
            } as LoginResponse;
            console.log(data);
            return data;
        })
        .catch((err: Error) => {
            const data = {
                successful: false,
                response: err.toString()
            } as LoginResponse;
            console.log(data);
            return data;
        });
}

const create = (config: Config) => {
    return {
        tryLogIn: tryLogIn(config),
        getAuthToken: getAuthToken()
    } as LoginService;
}

export default { create }