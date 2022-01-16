import axios from "axios"
import { BehaviorSubject } from "rxjs"
import { User } from "./service-models"
import { Config } from "../util/config"
import { LoginService } from "./login.service"


const userSubject = new BehaviorSubject<User|null>(null)

const getUser = () => () => {
    return userSubject.getValue();
}

const getUserSubject = () => () => {
    return userSubject;
}

const create = (loginService: LoginService, config: Config) => {
    loginService.getAuthSubject()
        .subscribe(async (authToken:string|null)=> {
            if(authToken == null){
                userSubject.next(null);
                return;
            }
            const user = await axios.get<User>(`${config.apiBaseUrl}/users/authenticated-user`,
            {
                headers: {
                    'Authorization': authToken!
                }
            });
            if(user.status != 200) {
                console.error(user.data);
                return;
            }
            userSubject.next(user.data);
        });
    
    const userService: UserService = {
        getUser: getUser(),
        getUserSubject: getUserSubject()
    }

    return userService;
}

export type UserService = {
    getUser: ReturnType<typeof getUser>,
    getUserSubject: ReturnType<typeof getUserSubject>
}

export default { create }