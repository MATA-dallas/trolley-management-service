// a legacy controller for pulling all cars
// should be obsolete soon

import express, { Request, Response } from 'express';
import { Knex } from 'knex';
import { RastracEventEmitter, TrolleyCarState } from '../../data-providers/rastrac.provider';
import { Handler as AlertHandler } from '../alert/alert.handler';
import car from '../car';
import { Handler as CarHandler } from '../car/car.handler';
import { Handler as PositionHandler } from '../position/position.handler';

let rastracData: TrolleyCarState[];

type Latitude = number;
type Longitude = number;
type Advisory = string;

type LegacyCarObject = [Latitude, Longitude, Advisory];

const create = async (positionHandler: PositionHandler, alertHandler: AlertHandler, emitter: RastracEventEmitter) => {
    const router = express.Router();
    emitter.addListener("trolleyCarStateUpdated", (state)=> {
        rastracData = state;
    });
    router.get('/', async (req, res) => {
        const [positions, alerts] = await Promise.all([
            positionHandler.getAllPositions(),
            alertHandler.getAllAlerts(1)
        ]);

        const activeCars = positions
            .filter(x=>x.manualStatus != 'OFF' && rastracData[x.car].Advisories != 'BARN')
            .map<{[key: string]: LegacyCarObject}>(x=> { 
                return {
                    [x.car]: [ 
                        rastracData[x.car].Latitude, 
                        rastracData[x.car].Longitude, 
                        rastracData[x.car].Advisories 
                    ] 
                }
            });
        
        res.json(Object.assign({}, [...activeCars]));
    });
    return router;
}

export default { create }