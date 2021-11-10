import React, { useState } from 'react'
// import { Link as RouterLink } from 'react-router-dom'
import Avatar from '@mui/material/Avatar'
import Button from '@mui/material/Button'
import CssBaseline from '@mui/material/CssBaseline'
import TextField from '@mui/material/TextField'
import Link from '@mui/material/Link'
import Grid from '@mui/material/Grid'
import Box from '@mui/material/Box'
import LockOutlinedIcon from '@mui/icons-material/LockOutlined'
import Typography from '@mui/material/Typography'
import Container from '@mui/material/Container'
import { createTheme, ThemeProvider } from '@mui/material/styles'

// import db connection
import firebaseApp from '../config/firebaseConfig'
// add service
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth'
const auth = getAuth(firebaseApp)

const theme = createTheme()
// const MyLink = React.forwardRef((props, ref) => (
//   <RouterLink ref={ref} to="/window" {...props} />
// ))



const ViewLogin = ({ autenting, setAutenting }) => {

  const handleSubmit = async (event) => {
    event.preventDefault()
    const data = new FormData(event.currentTarget)
    // eslint-disable-next-line no-console
    // console.log({
    //   email: data.get('email'),
    //   password: data.get('password'),
    // })
    const email = data.get('email'),
      password = data.get('password'),
      datos = await signInWithEmailAndPassword(auth, email, password)
  }

  const handleChange = () => {
    setAutenting(!autenting)
    console.log('Componente viewLogin', autenting)
  }

  return (
    <ThemeProvider theme={theme}>
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
            Ingresa tu Usuario
          </Typography>
          <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Correo Electronico"
              name="email"
              autoComplete="email"
              autoFocus
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
            />

            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
              //href='/'
            >
              Ingresar
            </Button>
            {/* Google */}
            <Button
              type="button"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
              //href='/'
            >
              Ingresar con Google
            </Button>
            <Grid container>
              <Grid item>
                {/* <Link href="/signup" variant="body2">
                  {"¿No tienes una cuenta? Crea Una"}
                </Link> */}
								<Link onClick={handleChange}>¿No tienes una cuenta? Crea Una</Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  )
}

export default ViewLogin
