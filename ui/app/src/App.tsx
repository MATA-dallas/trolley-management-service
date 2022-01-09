import { Box } from "@mui/material"
import { useState } from "react"
import { BrowserRouter, Route, Routes } from "react-router-dom"
import { LoginPage } from "./components/LoginPage/LoginPage"
import NavBar from "./components/NavBar/NavBar"
import loginService from "./services/login.service"
import { Dependencies, dependencyContext } from "./store/dependency.context"
import config from "./util/config"

export const App = () => {
    const [dependenceis, setDependencies] = useState({
        loginService: loginService.create(config)
    }as Dependencies);
    return (
        <>
            <dependencyContext.Provider value={dependenceis}>
                <NavBar />
                <Box style={{margin:'10px'}}>
                    <BrowserRouter>
                        <Routes>
                            <Route path="/login" element={<LoginPage />} />
                        </Routes>
                    </BrowserRouter>
                </Box>
            </dependencyContext.Provider>
        </>
    )
}