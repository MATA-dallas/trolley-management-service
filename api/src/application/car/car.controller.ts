import express, { Request, Response } from 'express';
import { Util } from '../../util/util';
import { Handler } from './car.handler';

const create = (handler: Handler, util: Util) => {
    const router = express.Router();
    router.get('/', async (req: Request, res: Response) => {
        res.json(await handler.getAllCars());
    });

    router.get('/:id', async (req: Request, res: Response) => {
        const id = util.tryParseInt(req.params.id);
        if(id == null)
            throw new Error(`id ${id} is not a valid number`);
        res.json(await handler.getCarById(id));
    });

    return router;
}

export default { create }