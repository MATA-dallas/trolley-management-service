import { Box } from "@mui/material"
import { BrowserRouter, Route, Routes } from "react-router-dom"
import { LandingPage } from "./components/LandingPage/LandingPage"
import NavBar from "./components/NavBar/NavBar"
import { loginServiceContext, userServiceContext, loginService, userService } from "./store"

export const App = () => {
    return (
        <>
            <loginServiceContext.Provider value={loginService}>
                <userServiceContext.Provider value = {userService}>
                    <NavBar />
                    <Box style={{margin:'10px'}}>
                        <BrowserRouter>
                            <Routes>
                                <Route path="/" element={<LandingPage />} />
                            </Routes>
                        </BrowserRouter>
                    </Box>
                </userServiceContext.Provider>
            </loginServiceContext.Provider>
        </>
    )
}