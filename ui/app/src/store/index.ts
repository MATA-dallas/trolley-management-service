import { createContext, useContext } from "react";
import login, { LoginService } from "../services/login.service";
import user, { UserService } from "../services/user.service";
import carData, { CarDataService } from "../services/car-data.service";
import alertData, { AlertDataService } from "../services/alert.service";
import config from "../util/config";

export const loginService = login.create(config);
export const userService = user.create(loginService, config);
export const carDataService = carData.create(config, loginService);
export const alertDataService = alertData.create(config, loginService);

export const loginServiceContext = createContext<LoginService>(loginService);
export const userServiceContext = createContext<UserService>(userService);
export const carDataServiceContext = createContext<CarDataService>(carDataService);
export const alertDataServiceContext = createContext<AlertDataService>(alertDataService);

export const useLoginServiceContext = () => {
    return useContext(loginServiceContext);
}

export const useUserServiceContext = () => {
    return useContext(userServiceContext);
}

export const useCarDataServiceContext = () => {
    return useContext(carDataServiceContext);
}

export const useAlertServiceContext = () => {
    return useContext(alertDataServiceContext);
}