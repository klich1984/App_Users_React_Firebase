// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
	apiKey: 'AIzaSyCDdSIdien4ykna9gOf49HXE9MeRkXMr3M',
	authDomain: 'adminusers-6dd02.firebaseapp.com',
	projectId: 'adminusers-6dd02',
	storageBucket: 'adminusers-6dd02.appspot.com',
	messagingSenderId: '771467567643',
	appId: '1:771467567643:web:f3685d62d267e5ce32cebe',
}

// Initialize Firebase
// Cada modulo o componente que requiera conectarse a firebase debera importar esta conexion y añadir los servicios que requiera
const firebaseApp = initializeApp(firebaseConfig)

export default firebaseApp
