import React, { useState } from 'react'

import Home from './components/Home'
import Login from './components/Login'
import CssBaseline from '@mui/material/CssBaseline'

import firebaseApp from './config/firebaseConfig'
import { getAuth, onAuthStateChanged } from 'firebase/auth'
const auth = getAuth(firebaseApp)

function App() {
	// Estado global
	const [userGlobal, setUserGlobal] = useState(null)

	onAuthStateChanged(auth, (userFirebase) => {
		if (userFirebase) {
			// Codigo en caso de hay sesion iniciada
			setUserGlobal(userFirebase)
		} else {
			// Codigo en caso de no haber sesion iniciada
			setUserGlobal(null)
		}
	})
	return (
		<div>
			<CssBaseline />
			{userGlobal ? <Home userEmail={userGlobal.email} userglobal={userGlobal}/> : <Login />}
		</div>
	)
}

export default App
