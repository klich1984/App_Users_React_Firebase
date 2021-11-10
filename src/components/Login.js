import React, { useState } from 'react'
import SignUp from './SignUp'
import ViewLogin from './viewLogin'


const Login = () => {
  const [autenting, setAutenting] = useState(true)
	return (
		<div>
			{autenting ? (
				<SignUp autenting={autenting} setAutenting={setAutenting} />
			) : (
				<ViewLogin autenting={autenting} setAutenting={setAutenting} />
			)}
		</div>
	)
}

export default Login
