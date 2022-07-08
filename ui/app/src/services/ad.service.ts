import axios from "axios";
import { BehaviorSubject } from "rxjs";
import { Config } from "../util/config";
import { LoginService } from "./login.service";

export type CreateAd = {
    latitude: number,
    longitude: number,
    message: string
}

export type Ad = {
    ID: number,
    latitude: number,
    longitutde: number,
    createdAt: Date,
    message: string
}

const latestAdSubject = new BehaviorSubject<Ad | null>(null);

const getLatestAdSubject = () => latestAdSubject;

const createAd = (adBaseUrl: string, getAuthToken: () => string|null, getLatestAd: ()=> Promise<Ad|null>) => async (request: CreateAd) => {
    let token = getAuthToken();
    if(!token)
        throw new Error(`login token not found. it's required to create an ad`);
    
    let result = await axios.post<number | string>(adBaseUrl, request, {
        headers: {
            'Authorization': token
        }
    });
    if(result.status === 200){
        let newAd = await getLatestAd();
        latestAdSubject.next(newAd);
    }
}

const getLatestAd = (adBaseUrl: string) => async () => {
    let latestAdUrl = adBaseUrl + '/latest';
    const result = await axios.get<Ad>(latestAdUrl);
    if(result.status === 200){
        return result.data;
    }
    return null;
}

export type AdService = {
    createAd: ReturnType<typeof createAd>,
    getLatestAdSubject: typeof getLatestAdSubject
}


const create = (config: Config, loginService: LoginService) => {
    const adBaseUrl = `${config.apiBaseUrl}/ads`;
    const getLatestAdFunction = getLatestAd(adBaseUrl)
    const service: AdService = {
        createAd: createAd(adBaseUrl, loginService.getAuthToken, getLatestAdFunction),
        getLatestAdSubject
    }

    getLatestAdFunction().then(latestAdSubject.next);

    return service;
}

const defaultExport = { create }

export default defaultExport;