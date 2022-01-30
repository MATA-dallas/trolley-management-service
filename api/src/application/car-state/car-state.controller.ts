import { Router } from "express";
import { CarStateHandler } from "./car-state.handler";

const create = (handler: CarStateHandler) => {
    const router = Router();
    router.get("/", async (req, res) => {
        const states = await handler.allStates();
        res.json(states)
    });

    return router;
}

export default { create }