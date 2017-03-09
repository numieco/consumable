import React 			from 'react'
import LoginForm 	from '../components/LoginForm'
import BasePage		from '../components/BasePage.jsx'

export default class Login extends React.Component {

	render () {
		return (

			<div>
				<BasePage/>

				<div className="container">
					<LoginForm 
						//add props here
					/>
				</div>	
				
			</div>

		)
	}

}