import axios, { AxiosResponse } from "axios"
import { BehaviorSubject, config } from "rxjs"
import { Config } from "../util/config"
import { LoginService } from "./login.service"
import { Car, CarData, CarDataItem, CarState, Position } from "./service-models"

export type CarDataService = {
    getCarDataSubject: ReturnType<typeof getCarDataSubject>,
    getCarData: ReturnType<typeof getCarData>,
    toggleCarPosition: ReturnType<typeof toggleCarPosition>
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

const toggleCarPosition = (config: Config, loginService: LoginService) => async (carNumber: number) => {
    const car = carDataSubject.getValue().cars.find(x=>x.car.car == carNumber);
    if(car == null)
        throw new Error(`car ${carNumber} not found in subject`);

    const response = await axios.post<Position>(`${config.apiBaseUrl}/positions/${carNumber}/set-manual-status`, {
        manualStatus: car?.carPosition?.manualStatus == "OFF" ? "" : "OFF"
    },{
        headers: {
            Authorization: loginService.getAuthToken()!
        }
    });

    if(response.status == 200){
        const carValues = carDataSubject.getValue();
        const selectedCarIndex = carValues.cars.indexOf(car);
        const newCars = [
            ...carValues.cars,   
        ]
        newCars[selectedCarIndex] = {
            ...newCars[selectedCarIndex],
            carPosition: response.data
        }

        carDataSubject.next({
            ...carDataSubject.getValue(),
            cars: newCars
        });
    }
}

const create = (config: Config, loginService: LoginService) => {
    const dataService: CarDataService = {
        getCarDataSubject: getCarDataSubject(),
        getCarData: getCarData(config),
        toggleCarPosition: toggleCarPosition(config, loginService)
    }

    dataService.getCarData();
    setInterval(dataService.getCarData, 5000);

    return dataService;
}

export default { create }