import { createContext, useContext } from "react";
import login, { LoginService } from "../services/login.service";
import user, { UserService } from "../services/user.service";
import carData, { CarDataService } from "../services/car-data.service";
import alertData, { AlertDataService } from "../services/alert.service";
import { Config, ConfigValues as configValues } from "../util/config";

export const loginService = login.create(configValues);
export const userService = user.create(loginService, configValues);
export const carDataService = carData.create(configValues, loginService);
export const alertDataService = alertData.create(configValues, loginService);

export const loginServiceContext = createContext<LoginService>(loginService);
export const userServiceContext = createContext<UserService>(userService);
export const carDataServiceContext = createContext<CarDataService>(carDataService);
export const alertDataServiceContext = createContext<AlertDataService>(alertDataService);
export const configContext = createContext<Config>(configValues);

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

export const useConfigContext = () => {
    return useContext(configContext);
}