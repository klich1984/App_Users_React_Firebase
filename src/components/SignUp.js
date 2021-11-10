import React from 'react'
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
import {
	getAuth,
	createUserWithEmailAndPassword,
	signInWithRedirect,
	GoogleAuthProvider,
} from 'firebase/auth'
const auth = getAuth(firebaseApp),
  googleProvider = new GoogleAuthProvider()

const theme = createTheme()


export default function SignUp({ autenting, setAutenting }) {
	const handleSubmit = async (event) => {
		event.preventDefault()
		const data = new FormData(event.currentTarget)
		// eslint-disable-next-line no-console
		const email = data.get('email'),
			password = data.get('password')
		// console.log(email, password) // contraseña debe ser mayor a 6 caracteres
		const user = await createUserWithEmailAndPassword(auth, email, password)
		console.log(user)
	}

	const handleChange = () => {
		console.log('Componente SignUp', autenting)
		setAutenting(!autenting)
	}

  const handleSignInGoogle = () => {
    signInWithRedirect(auth, googleProvider)
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
						Registrate
					</Typography>
					<Box
						component="form"
						noValidate
						onSubmit={handleSubmit}
						sx={{ mt: 3 }}
					>
						<Grid container spacing={2}>
							<Grid item xs={12} sm={6}>
								<TextField
									autoComplete="given-name"
									name="firstName"
									required
									fullWidth
									id="firstName"
									label="Nombre"
									autoFocus
								/>
							</Grid>
							<Grid item xs={12} sm={6}>
								<TextField
									required
									fullWidth
									id="lastName"
									label="Apellido"
									name="lastName"
									autoComplete="family-name"
								/>
							</Grid>
							<Grid item xs={12}>
								<TextField
									required
									fullWidth
									id="email"
									label="Correo Electronico"
									name="email"
									autoComplete="email"
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
									autoComplete="new-password"
								/>
							</Grid>
						</Grid>
						<Button
							type="submit"
							fullWidth
							variant="contained"
							sx={{ mt: 3, mb: 2 }}
						>
							Registrarse
						</Button>
            {/* Google */}
            <Button
              type="button"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
              onClick={handleSignInGoogle}
            >
              Ingresar con Google
            </Button>
						<Grid container justifyContent="flex-end">
							<Grid item>
									<Link onClick={handleChange}>
									¿Ya tienes una cuenta? Ingresa Aquí
								</Link>
							</Grid>
						</Grid>
					</Box>
				</Box>
			</Container>
		</ThemeProvider>
	)
}
