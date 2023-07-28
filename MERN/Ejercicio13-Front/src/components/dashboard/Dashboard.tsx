import { styled, createTheme, ThemeProvider, CssBaseline, Box, Toolbar, Divider, IconButton, Container, Badge, Grid, Paper } from '@mui/material'
import React from 'react'
import MuiDrawer from "@mui/material/Drawer"
import AppBar, { AppBarProps as MuiAppBarProps } from '@mui/material/AppBar'
import MenuIcon from "@mui/icons-material/Menu"
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft"
import LogoutIcon from "@mui/icons-material/Logout"
import MenuItems from './MenuItems'

const anchuraDrawer: number = 240;

interface AppBarProps extends MuiAppBarProps {
  open?: boolean
}


// Barra de aplicaciones
const BarraApp = styled(AppBar, {
  shouldForwardProp: (prop) => prop !== "open",
})<AppBarProps>(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(["width", "margin"], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen
  }),
  ... (open && {
    marginLeft: anchuraDrawer,
    width: `calc(100% - ${anchuraDrawer}px)`,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen
    }),
  })
}
))

// Drawer
const Drawer = styled(MuiDrawer, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  '& .MuiDrawer-paper': {
    position: "relative",
    whiteSpace: "nowrap",
    width: anchuraDrawer,
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen
    }),
    boxSizing: "border-box"
  }
}))

const Dashboard = () => {
  return (
    <div>Dashboard</div>
  )
}

export default Dashboard
