import React, { useState, useEffect } from 'react'
import { Routes, Route } from 'react-router-dom'

// Componentes
import SignUp from './components/SignUp'
import Login from './components/Login'
import TableUsers from './components/TableUsers'
import Home from './components/Home'

import firebaseApp from './config/firebaseConfig'
import { getAuth, onAuthStateChanged } from 'firebase/auth'
import FirstWindow from './components/FirstWindow'
const auth = getAuth(firebaseApp)




const Enroutes = () => {
	const [usuarioGlobal, setUsuarioGlobal] = useState(1)

	onAuthStateChanged(auth, (userFirebase) => {
		if (userFirebase) {
			// codigo Si hay sesión iniciada
			setUsuarioGlobal(userFirebase)
		} else {
			// codigo si no hay sesión iniciada
			setUsuarioGlobal(null)
		}
	})

	return (
		/* Asignacion de rutas */
		<Routes>
			<Route path="/" element={usuarioGlobal ? <Home /> : <TableUsers />} />
			{/* <Route path="/" element={<Home />} /> */}
			{/* <Route path="/login" element={<Login />} /> */}
			{/* <Route path="/signup" element={<SignUp />} /> */}
			{/* <Route path="/agregar-usuario" element={<TableUsers />} /> */}
			{/* <Route path="/window" element={<FirstWindow />} /> */}
		</Routes>
	)
}

export default Enroutes
