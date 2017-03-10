import React 			from 'react'
import SignupForm 	from '../components/SignupForm'
import BasePage		from '../components/BasePage.jsx'

export default class Signup extends React.Component {

	render () {
		return (

			<div>
				<BasePage/>

				<div className="container">
					<SignupForm 
						//add props here
					/>
				</div>	
				
			</div>

		)
	}

}