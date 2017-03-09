import React from 'react'
import FacebookLoginButton from './FacebookLoginButton'

const LoginForm = ({
	//props from parent Login.jsx
}) => (

	<div className='login-form-container'>

		<div className="consumer-login">

			<h3 className="login-title-text"> Consumer Login </h3>

			<div className="fb-button-container">
				<FacebookLoginButton />
			</div>

		</div>

		<div className="seller-login">

			<h3 className="login-title-text"> Seller Login </h3>

			<form action="#" >

				<div className="emailField">
					<input 
						type="text"
						placeholder="Email Address"
					/>
				</div>

				<div className="passwordField">
					<input 
						type="password"
						placeholder="Password"
					/>
				</div>	

				<div className="submit-btn">
					<input type="submit" value="Login" />
				</div>	

				<div className="link-to-signup" >
					Don't have an account ? {/* link to signup page */} Create one ! {/* Link tag will end here */} 
				</div>		

			</form>			

		</div>

	</div>

)

export default LoginForm