import express, { Request, Response } from 'express';
import { Util } from '../../util/util';
import { ManualStatus, Position } from './position.model';
import { Handler } from './position.handler';

const create = (handler: Handler, util: Util) => {
    const router = express.Router();
    router.get('/', async (req: Request, res: Response) => {
        res.json(await handler.getAllPositions());
    });

    type PatchPosition = {
        manualStatus: ManualStatus
    }

    type CarById = {
        id: number
    }

    router.get('/:id', async (
        req: Request<CarById, Position, PatchPosition, any, any>, 
        res: Response<Position>) => {
            res.json(await handler.getById(req.params.id))
    });
    
    return router;
}

export default { create }