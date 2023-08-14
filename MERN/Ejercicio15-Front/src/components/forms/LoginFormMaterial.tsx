import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Checkbox from '@mui/material/Checkbox';
import FormControlLabel from '@mui/material/FormControlLabel';
import Grid from '@mui/material/Grid';
import Container from '@mui/material/Container';
import Link from '@mui/material/Link';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import * as React from 'react';

import * as Yup from "yup";
import { useFormik } from 'formik';
import { login } from '../../services/authService';
import { AxiosResponse } from 'axios';
import { useNavigate } from 'react-router-dom';
import { CssBaseline } from '@mui/material';

// Se define el esquema de validación
const loginSchema = Yup.object().shape({
    email: Yup.string().email("Formato de email no válido").required("Es OBLIGATORIO poner el email"),
    password: Yup.string().required("Es OBLIGATORIO poner la contraseña")
})

const defaultTheme = createTheme();

export default function LoginFormMaterial() {
    const navigate = useNavigate();

    const formik = useFormik({
        initialValues: {
            email: "",
            password: "",
        },
        validationSchema: loginSchema,
        onSubmit: async (values) => {
            await login(values.email, values.password)
                .then(async (response: AxiosResponse) => {

                    if (response.status === 200) {
                        if (response.data.token) {
                            // Se guarda el token en el SessionStorage
                            await sessionStorage.setItem("sessionJWTToken", response.data.token);

                            navigate("/")
                        } else {
                            throw new Error("Error al generar un nuevo token.")
                        }
                    } else {
                        throw new Error("No se ha podido iniciar sesión. Comprueba el email, la contraseña, o que el servidor esté funcionando.")
                    }
                })
                .catch((error: any) => console.log(`[ERROR DE LOGIN]: ${error}`))
        }
    })

    return (
        <ThemeProvider theme={defaultTheme}>
            <Container component="main" maxWidth="xs">
                <CssBaseline />
                    <Box
                        sx={{
                            marginTop: 8,
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                        }}
                    >
                        <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
                            <LockOutlinedIcon />
                        </Avatar>
                        <Typography component="h1" variant="h5">
                            Iniciar sesión
                        </Typography>
                        <Box component="form" onSubmit={formik.handleSubmit} noValidate sx={{ mt: 1 }}>
                            <TextField
                                margin="normal"
                                required
                                fullWidth
                                id="email"
                                label="Correo electrónico"
                                name="email"
                                autoComplete="email"
                                autoFocus
                                value={formik.values.email}
                                onChange={formik.handleChange}
                                error={formik.touched.email && Boolean(formik.errors.email)}
                                helperText={formik.touched.email && formik.errors.email}
                            />
                            <TextField
                                margin="normal"
                                required
                                fullWidth
                                name="password"
                                label="Contraseña"
                                type="password"
                                id="password"
                                autoComplete="current-password"
                                onChange={formik.handleChange}
                                value={formik.values.password}
                                error={formik.touched.password && Boolean(formik.errors.password)}
                                helperText={formik.touched.password && formik.errors.password}
                            />
                            <Button
                                type="submit"
                                fullWidth
                                variant="contained"
                                sx={{ mt: 3, mb: 2 }}
                            >
                                Iniciar sesión
                            </Button>
                            <Grid container>
                                <Grid item xs>
                                    <Link href="#" variant="body2">
                                        ¿Has olvidado tu contraseña?
                                    </Link>
                                </Grid>
                                <Grid item>
                                    <Link href="/register" variant="body2">
                                        {"¿No tienes cuenta? Regístrate."}
                                    </Link>
                                </Grid>
                            </Grid>
                        </Box>
                    </Box>
            </Container>
        </ThemeProvider>
    );
}
