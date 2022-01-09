import { Alert, User } from "./store.models";
import { useState } from "react";
import React from "react";
import { BehaviorSubject, empty } from "rxjs";
import { useDependencyContext } from "./dependency.context";

export type State = {
    alerts: Alert[],
    user: User | null
}

const emptyInitialState = () => {
    return {
        alerts: [],
        user: null
    }
};

const subject = new BehaviorSubject(emptyInitialState());

export const useAppState = () => {
    const [state, setState] = useState(emptyInitialState() as State);
    const dependencies = useDependencyContext();

    const tryLogin = async (username: string, password: string) => {
        const result = await dependencies.loginService.tryLogIn(username, password);
        return result;
    }

    return {
        state,
        tryLogin
    }
}


const AppCtx = React.createContext<State | null>(null);
