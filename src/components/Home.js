import React, { useState, useEffect } from 'react'

import { Button } from '@material-ui/core'
import CssBaseline from '@mui/material/CssBaseline'
import TasksList from './TasksList'
import AddTask from './AddTask'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import Modal from '@mui/material/Modal'
import Container from '@mui/material/Container'

import firebaseApp from '../config/firebaseConfig'
import { getAuth, signOut } from 'firebase/auth'
import { getFirestore, doc, getDoc, setDoc } from 'firebase/firestore'
import { textAlign } from '@mui/system'

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
			<Button onClick={handleOpen}>Agregar</Button>
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

const Home = ({ userEmail, userglobal }) => {
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

	useEffect(() => {
		async function fetchInfo() {
			const info = await getDocumentOrCreateDocument(userEmail)
			setArrayInfoUsers(info)
		}

		fetchInfo()
	}, [])

	return (
		<>
			<CssBaseline />
			<Container>
				<h2>Lista de Usuarios {userEmail}</h2>

				<BasicModal
					setArrayInfoUsers={setArrayInfoUsers}
					userEmail={userEmail}
					arrayInfo={ArrayInfoUsers}
				/>

				{ArrayInfoUsers ? <TasksList arrayInfo={ArrayInfoUsers} /> : ''}
				<Button
					type="button"
					variant="contained"
					sx={{ mt: 3, mb: 2 }}
					onClick={() => signOut(auth)}
				>
					Cerar sesión
				</Button>
			</Container>
		</>
	)
}

export default Home
