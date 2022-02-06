import { Box } from "@mui/material"
import { BrowserRouter, Route, Routes } from "react-router-dom"
import { LandingPage } from "./components/LandingPage/LandingPage"
import NavBar from "./components/NavBar/NavBar"
import { loginServiceContext, userServiceContext, loginService, userService, carDataService, carDataServiceContext, alertDataServiceContext, alertDataService } from "./store"

export const App = () => {
    return (
        <>
            <alertDataServiceContext.Provider value = {alertDataService}>
                <carDataServiceContext.Provider value = {carDataService}>
                    <loginServiceContext.Provider value = {loginService}>
                        <userServiceContext.Provider value = {userService}>
                            <LandingPage />
                        </userServiceContext.Provider>
                    </loginServiceContext.Provider>
                </carDataServiceContext.Provider>
            </alertDataServiceContext.Provider>
        </>
    )
}