import { Button, Grid, TextField, Typography } from "@mui/material";
import { ChangeEventHandler, useState } from "react";
import { FormEvent } from "react";
import { LoginResponse } from "../../services/login.service";
import { useAppState } from "../../store/store.context";

type loginFormType = {
    name: string,
    password: string
}

export const LoginForm = () => {
    const appState = useAppState();
    const [formValues, setFormValues] = useState({
        name: "",
        password: ""
    } as loginFormType);

    const [loginResult, setLoginResult] = useState<LoginResponse | null>(null);

    const onLoginSubmit = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        setLoginResult(await appState.tryLogin(formValues.name, formValues.password));
    }

    const handleInputChange:ChangeEventHandler<HTMLInputElement | HTMLTextAreaElement> = (e) => {
        const { name, value } = e.target;
        setFormValues({
            ...formValues,
            [name]: value,
        });
    }

    return (
        <form onSubmit={onLoginSubmit}>
            <Grid rowSpacing={10}>
                <Grid item>
                    <TextField 
                        name="name"
                        label="username"
                        type="text"
                        value={formValues.name}
                        onChange={handleInputChange}
                    />
                </Grid>
                <Grid item>
                    <TextField 
                        name="password"
                        label="password"
                        type="password"
                        value={formValues.password}
                        onChange={handleInputChange}
                    />
                </Grid>
                <Grid item>
                    <Button type="submit" variant="contained" >Log In</Button>
                </Grid>
                <Grid item>
                    {
                        loginResult != null && !loginResult.successful ?
                            <Typography variant="caption" style={{color:'red'}}>
                                username or password is invalid.
                            </Typography>
                            :
                            <></>
                    }
                </Grid>
            </Grid>
        </form>
    )
}