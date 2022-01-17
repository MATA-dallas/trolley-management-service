import util, { Util } from "../../util/util";
import { RastracEventEmitter, RastracProvider, TrolleyCarState } from "../../data-providers/rastrac.provider";
import { Data } from "./position.data"
import { Position } from "./position.model";

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

export interface Handler {
    getAllPositions: ReturnType<typeof getAllPositions>
}

const create = (data: Data, emitter: RastracEventEmitter) : Handler => {
    handleRastracStateUpdate(emitter, data)
    return {
        getAllPositions: getAllPositions(data)
    };
}

export default { create }