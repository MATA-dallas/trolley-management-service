import { Button, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { useLoginServiceContext, useUserServiceContext } from "../../store";

export const ProfileLoginButton = () => {
    const userContext = useUserServiceContext();
    const [user, setUser] = useState(userContext.getUserSubject().getValue());
    useEffect(()=> {
        userContext.getUserSubject().subscribe(setUser);
    }, [])
    return (
        user == null? 
            <Button color="inherit" href="/login">Login</Button>
            :
            <ProfileAndLogOut />
    );
}

const ProfileAndLogOut = () => {
    const loginContext = useLoginServiceContext();
    const userContext = useUserServiceContext();
    const [user, setUser] = useState(userContext.getUserSubject().getValue());
    useEffect(()=> {
        userContext.getUserSubject().subscribe(setUser);
    }, []);

    return (
        <>
            <div style={{padding: 10}}>
                <div>
                    <Typography variant="h6" >
                        {user?.user}
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