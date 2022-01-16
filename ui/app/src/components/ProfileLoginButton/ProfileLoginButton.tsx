import { Button, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { useLoginServiceContext, useUserServiceContext } from "../../store";

export const ProfileLoginButton = () => {
    const userContext = useUserServiceContext();
    const [user, setUser] = useState(userContext.getUserSubject().getValue());
    useEffect(()=> {
        const subscription = userContext.getUserSubject().subscribe(setUser);

        return () => subscription.unsubscribe();
    }, []);


    return (
        <ProfileAndLogOut />
    );
}

const ProfileAndLogOut = () => {
    const loginContext = useLoginServiceContext();
    const userContext = useUserServiceContext();
    const [user, setUser] = useState(userContext.getUserSubject().getValue());
    useEffect(()=> {
        const subscription = userContext.getUserSubject().subscribe(setUser);

        return () => subscription.unsubscribe();
    }, []);

    if(user == null)
        return <></>

    return (
        <>
            <div style={{padding: 10}}>
                <div>
                    <Typography variant="h6" >
                        {user.user}
                    </Typography>
                </div>
                <div>
                    <Button 
                        color="inherit" 
                        variant="outlined" 
                        onClick={()=>loginContext.logOut()}>
                        Log out
                    </Button>
                </div>
            </div>
        </>
    );
}