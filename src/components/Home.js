import React, { useState, useEffect } from 'react'

import Button from '@mui/material/Button'
import CssBaseline from '@mui/material/CssBaseline'
import TasksList from './TasksList'
import AddTask from './AddTask'
import Box from '@mui/material/Box'
import Modal from '@mui/material/Modal'
import Container from '@mui/material/Container'
import Typography from '@mui/material/Typography'
import { createTheme, ThemeProvider } from '@mui/material/styles'
import Stack from '@mui/material/Stack'
import Add from '@mui/icons-material/Add'

import firebaseApp from '../config/firebaseConfig'
import { getAuth, signOut } from 'firebase/auth'
import { getFirestore, doc, getDoc, setDoc } from 'firebase/firestore'

const style = {
	position: 'absolute',
	top: '50%',
	left: '50%',
	transform: 'translate(-50%, -50%)',
	width: 400,
	bgcolor: 'background.paper',
	border: '2px solid #000',
	boxShadow: 24,
	p: 4,
}

const BasicModal = ({ setArrayInfoUsers, userEmail, arrayInfo }) => {
	const [open, setOpen] = useState(false)
	const handleOpen = () => setOpen(true)
	const handleClose = () => setOpen(false)

	return (
		<div>
			<CssBaseline />
			<Button variant="contained" startIcon={<Add />} onClick={handleOpen}>
				Agregar
			</Button>
			<Modal
				open={open}
				onClose={handleClose}
				aria-labelledby="modal-modal-title"
				aria-describedby="modal-modal-description"
			>
				<Box sx={style}>
					<AddTask
						setArrayInfoUsers={setArrayInfoUsers}
						userEmail={userEmail}
						arrayInfo={arrayInfo}
					/>
				</Box>
			</Modal>
		</div>
	)
}

const auth = getAuth(firebaseApp),
	firestore = getFirestore(firebaseApp)

function createData(name, age, streetAddress, email) {
	return { name, age, streetAddress, email }
}

const fakedata = [
	createData('Carlos Usuga', 37, 'Calle 32 # 12-45', 'klich84@gmail.com'),
	createData('Matias Lopez', 2, 'Calle 24 # 11-11', 'matias@gmail.com'),
	createData('Erica Orrego', 30, 'Carrera 5 # 10-187', 'erica@gmail.com'),
]

const theme = createTheme()

const Home = ({ userEmail }) => {
	const [ArrayInfoUsers, setArrayInfoUsers] = useState(null)

	async function getDocumentOrCreateDocument(idDocumentt) {
		// Crear referencia al documento (saber que documento queremos)
		const docuRef = doc(firestore, `users/${idDocumentt}`),
			// Buscar documentos (si existe o no existe recibimos un objeto)
			consult = await getDoc(docuRef)
		//revisa si existe
		if (consult.exists()) {
			// si si existe
			// convertir la informacion
			const infoDocument = consult.data()
			return infoDocument.users
		} else {
			// si no existe creamos el documento
			await setDoc(docuRef, { users: [...fakedata] })
			const consult = await getDoc(docuRef)
			const infoDocument = consult.data()
			return infoDocument.users
		}
	}

	const handleClose = () => {
		signOut(auth)
	}

	useEffect(() => {
		async function fetchInfo() {
			const info = await getDocumentOrCreateDocument(userEmail)
			setArrayInfoUsers(info)
		}

		fetchInfo()
	}, [])

	return (
		<ThemeProvider theme={theme}>
			<CssBaseline />
			<main>
				<Box
					sx={{
						bgcolor: 'background.paper',
						pt: 5,
						pb: 6,
					}}
				>
					<Container maxWidth="sm">
						<Typography
							component="h1"
							variant="h5"
							align="center"
							color="text.secondary"
							gutterBottom
						>
							Lista de Usuarios de {userEmail}
						</Typography>
					</Container>
				</Box>
			</main>
			<Container>
				<BasicModal
					setArrayInfoUsers={setArrayInfoUsers}
					userEmail={userEmail}
					arrayInfo={ArrayInfoUsers}
				/>

				{ArrayInfoUsers ? <TasksList arrayInfo={ArrayInfoUsers} /> : 'Loader'}
				<Stack
					sx={{ pt: 4 }}
					direction="row"
					spacing={2}
					justifyContent="center"
				>
					<Button
						type="button"
						variant="contained"
						color="error"
						sx={{ mt: 3, mb: 2 }}
						onClick={handleClose}
					>
						Cerrar sesión
					</Button>
				</Stack>
			</Container>
		</ThemeProvider>
	)
}

export default Home
