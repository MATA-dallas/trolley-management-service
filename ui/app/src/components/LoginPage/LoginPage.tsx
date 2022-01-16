import { Typography } from "@mui/material"
import { LoginForm } from "../LoginForm/LoginForm"

export const LoginPage = () => {
    return (
        <>
            <Typography variant="h3" style={{padding:7}}>Log In</Typography>
            <LoginForm />
        </>
    )
}