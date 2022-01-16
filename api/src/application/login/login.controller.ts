import express from "express";
import passport, {
    Authenticator as Passport
} from "passport";
import {
    IVerifyOptions,
    Strategy as LocalStrategy
} from "passport-local";
import {
    Handler
} from "./login.handler";
import jwt from 'jsonwebtoken';
import { User } from "./login.model";
import { Server } from "../../config"
import { ReqUser } from "../../middleware/jwt.authenticator";

type DoneCallback = (error: any, user ? : any, options ? : IVerifyOptions) => void;

const create = (handler: Handler) => {
    const router = express.Router();

    passport.use(new LocalStrategy(
        // function of username, password, done(callback)
        function (username: string, passwordHash: string, done: DoneCallback) {
            // look for the user data
            return handler.getAuthenticatedUser(username, passwordHash)
                .then(user => {
                    if (user == null) {
                        done(null, false, {
                            message: "username of password incorrect."
                        });
                        return;
                    }
                    done(null, user);
                })
                .catch(err => done(err));
        }
    ));

    router.post('/',
        passport.authenticate('local', {
            session: false
        }),
        function (req, res) {
            const user = req.user as User;
            const token = jwt.sign({
                id: user.ID,
                user: user.user
            } as ReqUser, Server.jwtSecret);
            res.end(token);
        }
    );

    return router;
}
export default {
    create
}