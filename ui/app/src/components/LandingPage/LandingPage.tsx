import { Box } from "@mui/material";
import { useEffect, useState } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { User } from "../../services/service-models";
import { useUserServiceContext } from "../../store"
import { AlertPage } from "../AlertPage/AlertPage";
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
                <BrowserRouter basename="/dashboard">
                    <NavBar />
                    <Box style={{margin:'10px'}}>   
                        <Routes>
                            <Route path="/" element={<CarPage/>} />
                            <Route path="/alerts" element={<AlertPage/>} />
                        </Routes>
                    </Box>
               </BrowserRouter>
            </>
    );
}