import { useEffect, useState } from "react";
import { User } from "../../services/service-models";
import { useUserServiceContext } from "../../store"
import { LoginPage } from "../LoginPage/LoginPage";

export const LandingPage = () => {
    const userContext = useUserServiceContext();
    const [user, setUser] = useState<User | null>(null)

    useEffect(()=>{
        const subcription = userContext.getUserSubject()
            .subscribe(x=> {
                setUser(x);
            });
        
        return () => subcription.unsubscribe();
    }, [])

    if(user == null)
        return <LoginPage />
    
    return <></>
}