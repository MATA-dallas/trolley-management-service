import React from "react";
import { LoginService } from "../services/login.service";


export type Dependencies = {
    loginService: LoginService
}

export const dependencyContext = React.createContext<Dependencies>(undefined!);

export const useDependencyContext = () => {
    return React.useContext(dependencyContext);
}