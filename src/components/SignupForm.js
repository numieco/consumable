import React from 'react'
import { Link } from 'react-router'

const SignupForm = ({
	onSubmit,
	onChange,
	errors,
	user
}) => (

	<div className='signup-form-container'>

		<div className="seller-signup">

			<h3 className="signup-title-text"> Seller Signup </h3>

			<form action="/" onSubmit={onSubmit}>

      {errors.summary && <p className="errorMessage">{errors.summary}</p>}

				<div className="nameField">
					<input 
						type="text"
						name="name"
						placeholder="Enter Full Name"
						onChange={onChange}
						value={user.name}
					/>
				</div>
				<div className="nameErr">
					{errors.name}
				</div>

				<div className="emailField">
					<input 
						type="email"
						name="email"
						placeholder="Email Address"
						onChange={onChange}
						value={user.email}
					/>
				</div>
				<div className="emailErr">
					{errors.email}
				</div>

				<div className="passwordField">
					<input 
						type="password"
						name="password"
						placeholder="Password"
						onChange={onChange}
						value={user.password}
					/>
				</div>	
				<div className="passwordErr">
					{errors.password}
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