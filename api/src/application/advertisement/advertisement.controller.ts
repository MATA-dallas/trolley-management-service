import express from "express";
import { Request, Response } from 'express';
import { CreateAd, Handler } from "./advertisement.handler";

const create = (handler: Handler, authMiddleware: any) => {
    const router = express.Router();

    router.get('/latest', async (req: Request, res: Response)=> {
        res.json(await handler.getLatestAd());
    });

    router.post('/', authMiddleware, async (req: Request<any, any, CreateAd>, res: Response)=> {
        res.json(await handler.createAd(req.body));
    });

    return router;
}

export default { create }