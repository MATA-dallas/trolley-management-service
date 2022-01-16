import { Box } from "@mui/material"
import { useState } from "react"
import { BrowserRouter, Route, Routes } from "react-router-dom"
import { LoginPage } from "./components/LoginPage/LoginPage"
import NavBar from "./components/NavBar/NavBar"
import { loginServiceContext, userServiceContext, loginService, userService } from "./store"
import config from "./util/config"

export const App = () => {
    return (
        <>
            <loginServiceContext.Provider value={loginService}>
                <userServiceContext.Provider value = {userService}>
                    <NavBar />
                    <Box style={{margin:'10px'}}>
                        <BrowserRouter>
                            <Routes>
                                <Route path="/login" element={<LoginPage />} />
                            </Routes>
                        </BrowserRouter>
                    </Box>
                </userServiceContext.Provider>
            </loginServiceContext.Provider>
        </>
    )
}