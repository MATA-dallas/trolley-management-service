import express from "express";
import { Authenticator as Passport } from "passport";
import { IVerifyOptions, Strategy as LocalStrategy } from "passport-local";
import { Handler } from "./login.handler";

type DoneCallback = (error: any, user?: any, options?: IVerifyOptions) => void;

const create = (passport: Passport, handler: Handler) => {
    const router = express.Router();

    passport.use(new LocalStrategy(
        // function of username, password, done(callback)
        function (username: string, passwordHash: string, done: DoneCallback) {
            // look for the user data
            return handler.getAuthenticatedUser(username, passwordHash)
                .then(user => {
                    if(user == null) {
                        done(null, false, {message: "username of password incorrect."})
                        return;
                    }
                    done(null, user)
                })
                .catch(err => done(err));
        }
    ));

    router.post('/',
        passport.authenticate('local'),
        function (req, res) {
            res.redirect('/');
        }
    );

}