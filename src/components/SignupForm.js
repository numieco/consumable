import React from 'react'
import { Link } from 'react-router'

const SignupForm = ({
	//props from parent Signup.jsx
}) => (

	<div className='signup-form-container'>

		<div className="seller-signup">

			<h3 className="signup-title-text"> Seller Signup </h3>

			<form action="#" >

				<div className="fullNameField">
					<input 
						type="text"
						placeholder="Enter Full Name"
					/>
				</div>

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
					<input type="submit" value="Signup" />
				</div>	

				<div className="link-to-signup" >
					Already have an account ? <Link to={'/login'}>  Login here ! </Link>
				</div>		

			</form>			

		</div>

	</div>

)

export default SignupForm