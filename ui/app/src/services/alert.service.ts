import axios, { AxiosResponse } from "axios";
import { BehaviorSubject } from "rxjs"
import { Config } from "../util/config";
import loginService, { LoginService } from "./login.service";
import { Alert } from "./service-models";

const alertSubject = new BehaviorSubject<Alert[]>([]);

function tryGetValues<T>(apiCall:Promise<AxiosResponse<T>>) {
    return apiCall
        .then(x=>{
            if(x.status == 200)
                return x.data;
            throw new Error(`endpoint failed with status code ${x.status}`);
        });
}

export type AlertDataService = {
    getAlertData : ReturnType<typeof getAlertData>,
    getAlertDataSubject : ReturnType<typeof getAlertDataSubject>,
    refresh : ReturnType<typeof refresh>,
    createAlert: ReturnType<typeof createAlert>
}

const getAlertData = () => async () => {
    return alertSubject.getValue();
}

const getAlertDataSubject = () => () => {
    return alertSubject;
}

const refresh = (config: Config) => async () => {
    const alertData = await tryGetValues(axios.get<Alert[]>(`${config.apiBaseUrl}/alerts`))
    alertSubject.next(alertData);
}

const createAlert = (config: Config, loginService: LoginService) => async (message: string) => {
    const response = await axios.post<Alert>(`${config.apiBaseUrl}/alerts`, {
        alertText: message
    },{
        headers: {
            Authorization: loginService.getAuthToken()!
        }
    });
    await refresh(config)();
}

const create = (config: Config, loginService: LoginService) => {
    const service: AlertDataService =  {
        getAlertData: getAlertData(),
        getAlertDataSubject: getAlertDataSubject(),
        refresh: refresh(config),
        createAlert: createAlert(config, loginService)
    };

    return service;
}


export default { create }