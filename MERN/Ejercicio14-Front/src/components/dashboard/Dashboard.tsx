import ChevronLeftIcon from "@mui/icons-material/ChevronLeft"
import LogoutIcon from "@mui/icons-material/Logout"
import MenuIcon from "@mui/icons-material/Menu"
import NotificationsIcon from "@mui/icons-material/Notifications"
import { Badge, Box, Container, CssBaseline, Divider, Grid, IconButton, List, Paper, ThemeProvider, Toolbar, Typography, createTheme, styled } from '@mui/material'
import AppBar, { AppBarProps as MuiAppBarProps } from '@mui/material/AppBar'
import MuiDrawer from "@mui/material/Drawer"
import { useState } from 'react'
import MenuItems from './MenuItems'
import TipTapEditor from "../editor/TipTapEditor"

const anchuraDrawer = 240;

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
            duration: theme.transitions.duration.enteringScreen
        }),
        boxSizing: "border-box",
        ...(!open && {
            overflowX: "hidden",
            transition: theme.transitions.create("width", {
                easing: theme.transitions.easing.sharp,
                duration: theme.transitions.duration.leavingScreen
            }),
            width: theme.spacing(7),
            [theme.breakpoints.up("sm")]: {
                width: theme.spacing(9)
            }
        }

        )
    }
}))

// Definir tema
const myTheme = createTheme()

const Dashboard = () => {
    const [open, setOpen] = useState<boolean>(false);

    const toggleDrawer = () => setOpen(!open);

    return (
        <ThemeProvider theme={myTheme}>
            <Box sx={{ display: "flex" }}>
                <CssBaseline />

                <BarraApp position="absolute" open={open}>
                    <Toolbar sx={{ pr: "24px" }}>
                        <IconButton edge="start" color="inherit" aria-label="Abrir drawer" onClick={toggleDrawer} sx={{
                            marginRight: "36px",
                        }}>
                            {open ? <ChevronLeftIcon /> : <MenuIcon />}
                        </IconButton>

                        <Typography component="h1" variant="h6" color="inherit" sx={{ flexGrow: 1 }}>
                            Code Verification Katas
                        </Typography>

                        {/* Icono para mostrar notificaciones */}
                        <IconButton color="inherit">
                            <Badge badgeContent={10} color="secondary">
                                <NotificationsIcon />
                            </Badge>
                        </IconButton>

                        {/* Icono para el cierre de sesión */}
                        <IconButton color="inherit">
                            <LogoutIcon />
                        </IconButton>
                    </Toolbar>
                </BarraApp>

                {/* Drawer */}
                <Drawer variant='permanent' open={open}>
                    <Toolbar sx={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "flex-end",
                        px: [1]
                    }}>
                        {/* Lista de objetos de menú */}
                        <List component="nav">
                            {
                                MenuItems
                            }
                        </List>

                    </Toolbar>

                    <Divider />

                </Drawer>

                {/* Contenido del dashboard */}
                <Box component="main" sx={{
                    backgroundColor: (theme) => theme.palette.mode === "light" ? theme.palette.grey[100] : theme.palette.grey[900],
                    flexGrow: 1,
                    height: "100vh",
                    overflow: "auto"
                }}>
                    <Toolbar />
                    <Container maxWidth="lg" sx={{
                        mt: 4,
                        mb: 4
                    }}>

                        <Grid item xs={12} md={12} lg={12}>
                            <Paper sx={{
                                p: 2,
                                display: "flex",
                                flexDirection: "column",
                                height: 400
                            }}>
                                <TipTapEditor />
                            </Paper>
                        </Grid>

                    </Container>
                </Box>
            </Box>
        </ThemeProvider>
    )
}

export default Dashboard
