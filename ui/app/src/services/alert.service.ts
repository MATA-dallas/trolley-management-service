import axios, { AxiosResponse } from "axios";
import { BehaviorSubject } from "rxjs"
import { Config } from "../util/config";
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
    refresh : ReturnType<typeof refresh>
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

const create = (config: Config) => {
    const service: AlertDataService =  {
        getAlertData: getAlertData(),
        getAlertDataSubject: getAlertDataSubject(),
        refresh: refresh(config)
    };

    return service;
}


export default { create }