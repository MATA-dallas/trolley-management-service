import MenuIcon from '@mui/icons-material/Menu';
import React, { useState } from 'react';
import AddAlertIcon from '@mui/icons-material/AddAlert';
import CarRentalIcon from '@mui/icons-material/CarRental';
import MailIcon from '@mui/icons-material/Mail';
import { ProfileLoginButton } from '../ProfileLoginButton/ProfileLoginButton';
import {
    AppBar, Box, IconButton, List, ListItem,
    ListItemIcon, ListItemText, SwipeableDrawer,
    Toolbar, Typography
} from '@mui/material';
import { BrowserRouter, Link } from 'react-router-dom';

const NavBar = () => {
    const [open, setOpen] = useState(false);
    const toggleDrawer = (shouldBeOpen: boolean) => (event: any) => {
        if (
            event &&
            event.type === 'keydown' &&
            (event.key === 'Tab' || event.key === 'Shift')
        ) {
            return;
        }

        setOpen(shouldBeOpen);
    };
    return (
        <Box sx={{ flexGrow: 1 }}>
            <AppBar position="static">
                <Toolbar>
                    <IconButton
                        size="large"
                        edge="start"
                        color="inherit"
                        aria-label="menu"
                        sx={{ mr: 2 }}
                        onClick={toggleDrawer(true)}
                    >
                        <MenuIcon />
                    </IconButton>
                    <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                        Trolley Management
                    </Typography>
                    <ProfileLoginButton />
                </Toolbar>
            </AppBar>
            <SwipeableDrawer
                anchor={"left"}
                open={open}
                
                onClose={toggleDrawer(false)}
                onOpen={toggleDrawer(true)}
            >
                {list(toggleDrawer)}
            </SwipeableDrawer>
        </Box>
    )
}

const list = (toggleDrawer: (isOpen: boolean) => any) => (
    <Box
        sx={{ padding: "15px" }}
        role="presentation"
        onClick={toggleDrawer(false)}
    >
        <List>
            <ListItem button component={Link} to="/" >
                <ListItemIcon>
                    <CarRentalIcon />
                </ListItemIcon>
                <ListItemText primary={"cars"} />
            </ListItem>
            <ListItem button component={Link} to="/alerts" >
                <ListItemIcon>
                    <AddAlertIcon />
                </ListItemIcon>
                <ListItemText primary={"alerts"} />
            </ListItem>
        </List>
    </Box>
);
export default NavBar;