import md5Hex from "md5-hex";
import { Config } from "../util/config";
import axios from "axios";
import { BehaviorSubject, RetryConfig } from "rxjs";
import {reactLocalStorage} from 'reactjs-localstorage';

export type LoginService = {
    tryLogIn: ReturnType<typeof tryLogIn>,
    getAuthToken: ReturnType<typeof getAuthToken>,
    getAuthSubject: ReturnType<typeof getAuthSubject>
}

export type LoginResponse = {
    successful: boolean,
    statusCode: number | null,
    response: string
}
const loginTokenSymbol = 'login-token';

const currentUserSubject = new BehaviorSubject<string>(reactLocalStorage.get(loginTokenSymbol));

const getAuthSubject = () => () => currentUserSubject;

const getAuthToken = () => () => currentUserSubject.getValue();

const tryLogIn = (config: Config) => (username: string, password: string) => {
    return axios.post<string>(`${config.apiBaseUrl}/login`, {
        username,
        password: md5Hex(username + md5Hex(password))
    })
        .then(async (res) => {
            const data = {
                successful: res.status == 200,
                response: await res.data,
                statusCode: res.status
            } as LoginResponse;

            if(data.successful)
                currentUserSubject.next(data.response);

            return data;
        })
        .catch((err: Error) => {
            const data = {
                successful: false,
                response: err.toString(),
                statusCode: null
            } as LoginResponse;
            
            return data;
        });
}

const create = (config: Config) => {
    const loginService: LoginService = {
        tryLogIn: tryLogIn(config),
        getAuthToken: getAuthToken(),
        getAuthSubject: getAuthSubject()
    };

    return loginService;
}

export default { create }

