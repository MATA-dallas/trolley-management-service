import { RastracEventEmitter, TrolleyCarState } from "../../data-providers/rastrac.provider";
import { Data } from "./position.data"

const getAllPositions = (positions: Data) => async () => {
    return positions.getAll();
}

const handleRastracStateUpdate = (emitter: RastracEventEmitter) =>{
    emitter.on('trolleyCarStateUpdated', (state: TrolleyCarState[]) => {
        // TODO: update positions here
    });
}

export interface Handler {
    getAllPositions: ReturnType<typeof getAllPositions>
}

const create = (data: Data) : Handler => {
    return {
        getAllPositions: getAllPositions(data)
    };
}

export default { create }