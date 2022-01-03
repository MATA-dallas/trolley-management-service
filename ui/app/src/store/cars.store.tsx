import { BehaviorSubject } from "rxjs";
import config from "../util/config";

export type Car = {
    ID: string,
    car: number,
    IMEI: number
}

export const cars$ = new BehaviorSubject<Car[]>([]);

fetch(`${config.trolleyManagementApiUrl}/cars`)
    .then(res=> res.json())
    .then(data => cars$.next(data));