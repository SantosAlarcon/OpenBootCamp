// React Fragment
import { Fragment } from "react";

// Componentes Material List
import { ListItemButton, ListItemIcon, ListItemText } from "@mui/material";

// Componentes Material Icons
import DashboardIcon from "@mui/icons-material/Dashboard"
import PeopleIcon from "@mui/icons-material/People"
import BarChartIcon from "@mui/icons-material/BarChart"

const MenuItems = () => {
    return (
        <Fragment>
            <ListItemButton>
                <ListItemIcon>
                    <DashboardIcon />
                </ListItemIcon>
                <ListItemText primary="Katas" />
            </ListItemButton>

            <ListItemButton>
                <ListItemIcon>
                    <PeopleIcon />
                </ListItemIcon>
                <ListItemText primary="Usuarios" />
            </ListItemButton>

            <ListItemButton>
                <ListItemIcon>
                    <BarChartIcon />
                </ListItemIcon>
                <ListItemText primary="Ranking" />
            </ListItemButton>
        </Fragment>
    )
}

export default MenuItems;
