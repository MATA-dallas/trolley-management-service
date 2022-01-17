import { Box } from "@mui/material"
import { BrowserRouter, Route, Routes } from "react-router-dom"
import { LandingPage } from "./components/LandingPage/LandingPage"
import NavBar from "./components/NavBar/NavBar"
import { loginServiceContext, userServiceContext, loginService, userService, carDataService, carDataServiceContext } from "./store"

export const App = () => {
    return (
        <>
            <carDataServiceContext.Provider value = {carDataService}>
                <loginServiceContext.Provider value = {loginService}>
                    <userServiceContext.Provider value = {userService}>
                        <NavBar />
                        <LandingPage />
                    </userServiceContext.Provider>
                </loginServiceContext.Provider>
            </carDataServiceContext.Provider>
        </>
    )
}