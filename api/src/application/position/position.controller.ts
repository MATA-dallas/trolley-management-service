import express, { Request, Response } from 'express';
import { Util } from '../../util/util';
import { ManualStatus, Position } from './position.model';
import { Handler } from './position.handler';

const create = (handler: Handler, util: Util, authMiddleware: any) => {
    const router = express.Router();
    router.get('/', async (req: Request, res: Response) => {
        res.json(await handler.getAllPositions());
    });

    type CarById = {
        id: number
    }

    router.get('/:id', async (
        req: Request<CarById, Position, any, any, any>, 
        res: Response<Position>) => {
            res.json(await handler.getById(req.params.id))
    });

    type ToggleFlagBody = {
        manualStatus: ManualStatus
    }

    router.post('/:id/set-manual-status',authMiddleware, async (
        req: Request<CarById, Position, ToggleFlagBody, any, any>, 
        res: Response<Position>) => {
            await handler.setManualStatus(req.params.id, req.body.manualStatus);
            
            res.json(await handler.getById(req.params.id))
    })
    
    return router;
}

export default { create }