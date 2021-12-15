import { NextFunction, Request, Response } from "express";
import createError from "http-errors";
import config from "../config";

declare type WebError = Error & { status?: number };
export const errorHandler = (err: WebError, req: Request, res: Response, next: NextFunction): void => {
    if(config.Server.isDev){
        res.status(500).json({message: err.message});
    }
    else{
        res.status(500).send("internal server error");
    }
};

export const errorNotFoundHandler = (req: Request, res: Response, next: NextFunction): void => {
    res.status(404).end("not found");
};
