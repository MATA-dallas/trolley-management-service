import { RastracEventEmitter, TrolleyCarState } from "../../data-providers/rastrac.provider";

let state: TrolleyCarState[] = [];

const allStates = () => async () => {
    return state;
};

export type CarStateHandler = {
    allStates: ReturnType<typeof allStates>;
};

const create = (rastracEventEmitter: RastracEventEmitter) => {
    rastracEventEmitter.on("trolleyCarStateUpdated", newState => {
        state = newState;
    });
    const handler = {
        allStates: allStates()
    }
    return handler;
}

export default { create }