import { Box } from "@mui/material";
import { useEffect, useState } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { User } from "../../services/service-models";
import { useUserServiceContext } from "../../store"
import { CarPage } from "../CarPage/CarPage";
import { LoginPage } from "../LoginPage/LoginPage";
import NavBar from "../NavBar/NavBar";

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
    
    return (
            <>
                <NavBar />
                <Box style={{margin:'10px'}}>   
                    <BrowserRouter>
                        <Routes>
                            <Route path="/" element={<CarPage/>} />
                        </Routes>
                    </BrowserRouter>
                </Box>
            </>
    );
}