import React, { useState } from 'react'
import Button from '@mui/material/Button'
import CssBaseline from '@mui/material/CssBaseline'
import TextField from '@mui/material/TextField'
import Grid from '@mui/material/Grid'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import Container from '@mui/material/Container'
import { createTheme, ThemeProvider } from '@mui/material/styles'

import firebaseApp from '../config/firebaseConfig'
import { getFirestore, updateDoc, doc } from 'firebase/firestore'
const firestore = getFirestore(firebaseApp)

const theme = createTheme()

const AddTask = ({ userEmail, arrayInfo, setArrayInfoUsers }) => {
	const handleSubmit = async (event) => {
		event.preventDefault()
		const data = new FormData(event.currentTarget)
		// eslint-disable-next-line no-console
		const email = data.get('email'),
			age = data.get('age'),
			name = data.get('name'),
			streetAddress = data.get('address')
		console.log(email, age, streetAddress, name) // contraseña debe ser mayor a 6 caracteres
		// Crear nuevo array con los datos a actualizar
		console.log(arrayInfo)
		const newArrayUsers = [
			...arrayInfo,
			{ age, email, name, streetAddress },
		]
		// Actualizar base de datos
		const docuRef = doc(firestore, `users/${userEmail}`)
		updateDoc(docuRef, {users: [...newArrayUsers]})
		// Actualizar estado
		setArrayInfoUsers(newArrayUsers)

	}

	return (
		<ThemeProvider theme={theme}>
			<Container component="main" maxWidth="xs">
				<CssBaseline />
				<Box
					sx={{
						display: 'flex',
						flexDirection: 'column',
						alignItems: 'center',
					}}
				>
					<Typography component="h3" variant="h6">
						Ingresa los siguientes datos
					</Typography>
					<Box
						component="form"
						noValidate
						onSubmit={handleSubmit}
						sx={{ mt: 3 }}
					>
						<Grid container spacing={2}>
							<Grid item xs={12}>
								<TextField
									required
									fullWidth
									id="name"
									label="nombre completo"
									name="name"
									autoComplete="name"
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
									id="address"
									label="Direccion"
									name="address"
									autoComplete="address"
								/>
							</Grid>
							<Grid item xs={12} sx={{ mb: 3 }}>
								<TextField
									required
									fullWidth
									name="age"
									label="Edad"
									type="number"
									id="age"
								/>
							</Grid>
						</Grid>
						<Button
							type="submit"
							fullWidth
							variant="contained"
							sx={{ mt: 3, mb: 2 }}
						>
							Agregar
						</Button>
					</Box>
				</Box>
			</Container>
		</ThemeProvider>
	)
}

export default AddTask
