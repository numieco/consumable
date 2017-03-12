import React from 'react'
import { Link } from 'react-router'

const LoginForm = ({
  onSubmit,
  onChange,
  errors,
  successMessage,
  user
}) => (

	<div className='login-form-container'>

		<div className="seller-login">

			<h3 className="login-title-text"> Seller Login </h3>

			<form action="/" onSubmit={onSubmit}>

	      {errors.summary && <p className="errorMessage">{errors.summary}</p>}

				<div className="emailField">
					<input 
						type="text"
						name="email"
						placeholder="Email Address"
	          onChange={onChange}
	          value={user.email}
					/>
				</div>
				<div className="emailErr">{errors.email}</div>

				<div className="passwordField">
					<input 
						type="password"
						name="password"
						placeholder="Password"
	          onChange={onChange}
	          value={user.password}
					/>
				</div>	
				<div className="passwordErr">{errors.password}</div>

				<div className="submit-btn">
					<input type="submit" value="Login" />
				</div>	

				<div className="link-to-signup" >
					Don't have an account ? <Link to={'/signup'}> Create one ! </Link>
				</div>		

			</form>			

		</div>

	</div>

)

export default LoginForm