import axios, { AxiosResponse } from "axios"
import { BehaviorSubject } from "rxjs"
import { Config } from "../util/config"
import { Car, CarData, CarDataItem, CarState, Position } from "./service-models"

export type CarDataService = {
    getCarDataSubject: ReturnType<typeof getCarDataSubject>,
    getCarData: ReturnType<typeof getCarData>
}

const getCarDataSubject = () => () => carDataSubject;

const carDataSubject = new BehaviorSubject<CarData>(null!)

function tryGetValues<T>(apiCall:Promise<AxiosResponse<T>>) {
    return apiCall
        .then(x=>{
            if(x.status == 200)
                return x.data;
            throw new Error(`endpoint failed with status code ${x.status}`);
        });
}

const getCarData = (config: Config) => async () => {
    const [cars, carStates, carPositions] = await Promise.all([
        tryGetValues(axios.get<Car[]>(`${config.apiBaseUrl}/cars`)),
        tryGetValues(axios.get<CarState[]>(`${config.apiBaseUrl}/car-states`)),
        tryGetValues(axios.get<Position[]>(`${config.apiBaseUrl}/positions`))
    ]);
    const carData = cars.map(car=>{
        const carDataItem: CarDataItem = {
            car,
            carPosition: carPositions.find(x=>x.car == car.car) ?? null,
            carState: carStates.find(x=>x.ID == car.IMEI.toString()) ?? null
        }
        return carDataItem;
    });
    carDataSubject.next({
        cars: carData
    });

    return carData;
}

const create = (config: Config) => {
    const dataService: CarDataService = {
        getCarDataSubject: getCarDataSubject(),
        getCarData: getCarData(config)
    }

    dataService.getCarData();
    setInterval(dataService.getCarData, 5000);

    return dataService;
}

export default { create }