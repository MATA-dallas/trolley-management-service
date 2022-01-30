import util, { Util } from "../../util/util";
import { RastracEventEmitter, RastracProvider, TrolleyCarState } from "../../data-providers/rastrac.provider";
import { Data } from "./position.data"
import { ManualStatus, Position } from "./position.model";

type CachedPositions = {
    positions: Position[] | null;
}

const getAllPositions = (positions: Data) => async () => {
    return positions.getAll();
}

const handleRastracStateUpdate = (emitter: RastracEventEmitter, data: Data) => {
    emitter.on('trolleyCarStateUpdated', async (state: TrolleyCarState[]) => {
        try {
            const carPositions = await data.getCarPositions();
            const updatePromises = carPositions.map(position => {
                const stateItem = state.filter(x=>x.ID == position.IMEI.toString()).pop();
                if(stateItem == null) {
                    console.error(`car number ${position.car} not updated`);
                    return;
                }
                return data.updatePosition(position.car, {
                    Latitude: stateItem.Latitude,
                    Longitude: stateItem.Longitude,
                    UpdateTime: stateItem.Time
                });
            });
            await Promise.all(updatePromises);
        }
        catch(err) {
            // TODO: learn how to not use a try/catch here
            console.error(err);
        }
    });
}

const getById = (data: Data) => (car: number) => {
    return data.getById(car);
}

const setManualStatus = (data: Data) => (car: number, manualStatus: ManualStatus) => {
    if(manualStatus != "" && manualStatus != "OFF")
        throw new Error(`manual status '${manualStatus}' not valid`);
    return data.updatePosition(car, {
        ManualStatus: manualStatus
    })
}

export interface Handler {
    setManualStatus: ReturnType<typeof setManualStatus>
    getAllPositions: ReturnType<typeof getAllPositions>,
    getById: ReturnType<typeof getById>
}

const create = (data: Data, emitter: RastracEventEmitter) : Handler => {
    handleRastracStateUpdate(emitter, data)
    return {
        getAllPositions: getAllPositions(data),
        getById: getById(data),
        setManualStatus: setManualStatus(data)
    };
}

export default { create }