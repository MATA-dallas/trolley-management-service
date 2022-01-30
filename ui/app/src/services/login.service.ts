import md5Hex from "md5-hex";
import { Config } from "../util/config";
import axios from "axios";
import { BehaviorSubject, RetryConfig } from "rxjs";
import {reactLocalStorage} from 'reactjs-localstorage';

export type LoginService = {
    tryLogIn: ReturnType<typeof tryLogIn>,
    getAuthToken: ReturnType<typeof getAuthToken>,
    getAuthSubject: ReturnType<typeof getAuthSubject>,
    logOut: ReturnType<typeof logOut>
}

export type LoginResponse = {
    successful: boolean,
    statusCode: number | null,
    response: string
}
const loginTokenSymbol = 'login-token';

const currentLoginSubject = new BehaviorSubject<string|null>(reactLocalStorage.get(loginTokenSymbol));

const getAuthSubject = () => () => currentLoginSubject;

const getAuthToken = () => () => currentLoginSubject.getValue();

const logOut = () => () => {
    reactLocalStorage.remove(loginTokenSymbol);
    currentLoginSubject.next(null);
}

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

            if(data.successful){
                const loginToken = `Bearer ${data.response}`;
                reactLocalStorage.set(loginTokenSymbol, loginToken);
                currentLoginSubject.next(loginToken);
            }

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
        getAuthSubject: getAuthSubject(),
        logOut: logOut()
    };
    if(loginService.getAuthToken() == null)
        return loginService;
    
        axios.get(`${config.apiBaseUrl}/users/authenticated-user`, {
            headers: {
                'Authorization': loginService.getAuthToken()!
            }
        })
            .then(x=>{
                if(x.status != 200) {
                    loginService.logOut();
                }
            })

    return loginService;
}

export default { create }

