import { AnyTxtRecord } from 'dns';
import express from 'express'
import { Request, Response } from 'express';
import { Util } from '../../util/util';
import { Handler } from './alert.handler';

const create = (handler: Handler, util: Util, authMiddleware: any) => {
    const router = express.Router();
    router.get('/', async (req: Request, res: Response) => {
        const limit = req.query["limit"] as string | null;
        const parsedLimit = util.tryParseInt(limit ?? "");
        res.json(await handler.getAllAlerts(parsedLimit));
    });
    
    router.post('/', authMiddleware, async (req: Request, res: Response)=> {
        const val = req.body as PostAlert;
        console.log(val);
        const id = await handler.addAlert(val.alertText);

        res.json(await handler.getAlertById(id));
    });

    return router;
}

type PostAlert = {
    alertText: string | null
}

export default { create }
