import { EventEmitter } from "events";
import TypedEmitter from "typed-emitter";
import axios from "axios";
import cron from "node-cron";
import config from "../config";

export type TrolleyCarState = {
    ID: string,
    Latitude: number,
    Longitude: number,
    Advisories: "BARN" | "CITYPLACE" | ""
}

interface RastracEvents {
    trolleyCarStateUpdated: (state: TrolleyCarState[]) => void;
}

export type RastracEventEmitter = TypedEmitter<RastracEvents>;
export type RastracProvider = {};

const create = (emitter: RastracEventEmitter): RastracProvider => {
    cron.schedule("*/5 * * * * *", async function() {
        const states = await axios.get<TrolleyCarState[]>(`${config.Rastrac.baseUrl}/rtapi/api/state`, {
            headers: {
                authorization: `Basic ${config.Rastrac.basicAuthToken}`
            }
        });
        if(states.status != 200)
            console.error(`axios called failed with code ${states.status}: ${states.data}`);
        emitter.emit("trolleyCarStateUpdated", states.data);
    });

    return {};
}

export default { create }