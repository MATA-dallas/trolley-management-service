import express, { Request, Response } from 'express';
import { ReqUser } from '../../middleware/jwt.authenticator';
import { Util } from '../../util/util';
import { Handler } from './user.handler';
import { get } from './user.data';

const create = (handler: Handler, authMiddleware: any) => {
    const router = express.Router();
    router.get('/authenticated-user', authMiddleware, async (req: Request, res: Response) => {
        const userRequest = req.user! as ReqUser;
        
        const user = await handler.getUserById(userRequest.id);
        res.json(user);
    });
    
    return router;
}

export default { create }