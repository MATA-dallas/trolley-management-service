import express, { Request, Response } from 'express';
import { Util } from '../../util/util';
import { Handler } from './position.handler';

const create = (handler: Handler, util: Util) => {
    const router = express.Router();
    router.get('/', async (req: Request, res: Response) => {
        res.json(await handler.getAllPositions());
    });
    
    return router;
}

export default { create }