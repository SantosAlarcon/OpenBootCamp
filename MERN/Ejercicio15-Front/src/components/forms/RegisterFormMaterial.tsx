import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';

import * as Yup from "yup";
import { useFormik } from 'formik';
import { useNavigate } from 'react-router-dom';
import { register } from '../../services/authService';
import { AxiosResponse } from 'axios';

const defaultTheme = createTheme();

// Se define el esquema de validación
const registerSchema = Yup.object().shape({
    name: Yup.string().min(6, "El nombre debe tener al menos 6 letras.").max(12, "El nombre debe tener como máximo 12 letras.").required("El OBLIGATORIO poner el nombre"),
    email: Yup.string().email("Formato de email no válido").required("Es OBLIGATORIO poner el email"),
    password: Yup.string().min(8, "La contraseña debe tener como mínimo 8 letras.").required("Es OBLIGATORIO poner la contraseña"),
    confirm: Yup.string()
        .oneOf(
            [Yup.ref('password')],
            "¡Las contraseñas deben coincidir!"
        ).required("Ambas contraseñas deben coincidir."),
    age: Yup.number().min(18, "Debes tener 18 años o más.").required("Es OBLIGATORIO poner la edad"),
})

export default function RegisterFormMaterial() {
    // Se definen los valores iniciales.
    const valoresIniciales = {
        name: "",
        email: "",
        password: "",
        confirm: "",
        age: 18
    }

    const navigate = useNavigate();
    const formik = useFormik({
        initialValues: valoresIniciales,
        validationSchema: registerSchema,
        onSubmit: async (values) => {
            await register(values.name, values.email, values.password, values.age)
                .then((response: AxiosResponse) => {
                    if (response.status === 200) {
                        alert(JSON.stringify(response.data.message, null, 2));
                    } else {
                        throw new Error("no se ha podido crear el usuario. comprueba el nombre, email, la contraseña, la edad o que el servidor esté funcionando.")
                    }
                })
                .catch((error: any) => console.log(`[error a la hora de crear el usuario]: ${error}`))
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
                        Registrar nuevo usuario
                    </Typography>
                    <Box component="form" noValidate onSubmit={formik.handleSubmit} sx={{ mt: 3 }}>
                        <Grid container spacing={2}>
                            <Grid item xs={12}>
                                <TextField
                                    autoComplete="given-name"
                                    name="name"
                                    required
                                    fullWidth
                                    id="name"
                                    label="Nombre"
                                    onChange={formik.handleChange}
                                    value={formik.values.name}
                                    error={formik.touched.name && Boolean(formik.errors.name)}
                                    helperText={formik.touched.name && formik.errors.name}
                                    autoFocus
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    required
                                    fullWidth
                                    id="email"
                                    label="Correo electrónico"
                                    name="email"
                                    autoComplete="email"
                                    value={formik.values.email}
                                    onChange={formik.handleChange}
                                    error={formik.touched.email && Boolean(formik.errors.email)}
                                    helperText={formik.touched.email && formik.errors.email}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    required
                                    fullWidth
                                    name="password"
                                    label="Contraseña"
                                    type="password"
                                    id="password"
                                    value={formik.values.password}
                                    autoComplete="new-password"
                                    onChange={formik.handleChange}
                                    error={formik.touched.password && Boolean(formik.errors.password)}
                                    helperText={formik.touched.password && formik.errors.password}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    required
                                    fullWidth
                                    name="confirm"
                                    label="Confirmar contraseña"
                                    type="password"
                                    id="confirm"
                                    value={formik.values.confirm}
                                    autoComplete="confirm-new-password"
                                    onChange={formik.handleChange}
                                    error={formik.touched.confirm && Boolean(formik.errors.confirm)}
                                    helperText={formik.touched.confirm && formik.errors.confirm}
                                />
                            </Grid>
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                required
                                fullWidth
                                name="age"
                                label="Edad"
                                type='number'
                                id="age"
                                autoComplete="age"
                                value={formik.values.age}
                                min={18}
                                max={100}
                                onChange={formik.handleChange}
                                error={formik.touched.age && Boolean(formik.errors.age)}
                                helperText={formik.touched.age && formik.errors.age}
                            />
                        </Grid>
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            sx={{ mt: 3, mb: 2 }}
                        >
                            Registrar nuevo usuario
                        </Button>
                        <Grid container justifyContent="flex-end">
                            <Grid item>
                                <Link href="/login" variant="body2">
                                    ¿Ya tienes una cuenta? Inicia sesión
                                </Link>
                            </Grid>
                        </Grid>
                    </Box>
                </Box>
            </Container>
        </ThemeProvider>
    );
}
