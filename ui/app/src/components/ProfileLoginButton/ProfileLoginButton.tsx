import { Button, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { useAppState } from "../../store/store.context";

export const ProfileLoginButton = () => {
    const ctx = useAppState();
    const [user, setUser] = useState(ctx.state.user);
    useEffect(()=> {
        setUser(ctx.state.user);
    }, [ctx.state.user])
    return (
        user == null? 
            <Button color="inherit" href="/login">Login</Button>
            :
            <ProfileAndLogOut />
    );
}

const ProfileAndLogOut = () => {
    const ctx = useAppState();
    const [user, setUser] = useState(ctx.state.user);
    useEffect(()=> {
        setUser(ctx.state.user);
    }, [ctx.state.user]);

    return (
        <>
            <Typography variant="h3" >
                {ctx.state.user}
            </Typography>
            <Button color="inherit">Log out</Button>
        </>
    );
}