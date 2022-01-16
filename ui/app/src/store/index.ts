import { createContext, useContext } from "react";
import login, { LoginService } from "../services/login.service";
import user, { UserService } from "../services/user.service";
import config from "../util/config";

export const loginService = login.create(config);
export const userService = user.create(loginService, config);

export const loginServiceContext = createContext<LoginService>(loginService);
export const userServiceContext = createContext<UserService>(userService);

export const useLoginServiceContext = () => {
    return useContext(loginServiceContext);
}

export const useUserServiceContext = () => {
    return useContext(userServiceContext);
}