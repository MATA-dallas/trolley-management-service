import { Server } from "../config";
import { ExtractJwt, Strategy as JwtStrategy } from "passport-jwt";
import passport, {
    Authenticator as Passport
} from "passport";

export type ReqUser = {
    id: number,
    user: string
}

const initialize = ()=> {
    const options = {
        jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
        secretOrKey: Server.jwtSecret
    };
    passport.use(new JwtStrategy(options, function(jwt_payload : ReqUser, done) {
        try {
            return done(null, jwt_payload);
        } catch (error) {
            done(error);
        }
    }));
}

export default {
    initialize
}