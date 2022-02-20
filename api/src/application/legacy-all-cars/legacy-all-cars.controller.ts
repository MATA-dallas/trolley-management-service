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

const create = async (positionHandler: PositionHandler, alertHandler: AlertHandler, emitter: RastracEventEmitter, carHandler: CarHandler) => {
    const router = express.Router();
    emitter.addListener("trolleyCarStateUpdated", (state)=> {
        rastracData = state;
    });
    router.get('/', async (req, res) => {
        const [positions, alerts, cars] = await Promise.all([
            positionHandler.getAllPositions(),
            alertHandler.getAllAlerts(1),
            carHandler.getAllCars()
        ]);

        const carPositions = cars.map(car=>{
            const position = positions.find(pos => pos.car == car.car)!;
            const rastracPosition = rastracData.find(x=>x.ID == car.IMEI.toString())!;
            return {
                car,
                position,
                rastracPosition
            }
        }).filter(x=>x.car != null && x.position != null &&  x.rastracPosition != null);

        const activeCars = carPositions
            .filter(x=>
                x.position.manualStatus != 'OFF'
                && x.rastracPosition.Advisories != 'BARN')
            .map<{[key: string]: LegacyCarObject}>(x=> { 
                return {
                    [x.car.car]: [ 
                        x.rastracPosition.Latitude, 
                        x.rastracPosition.Longitude, 
                        x.rastracPosition.Advisories 
                    ] 
                }
            });
        const data = Object.assign({}, ...activeCars);
        // 32768 is the code that the ui is looking for to pull the alerts.
        // this was a legacy solution that was pulled into this project
        // and should be refactored asap.
        data["32768"] = alerts[0].Alert;
        res.json(data);
    });
    return router;
}

export default { create }