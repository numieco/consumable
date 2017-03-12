import React, { PropTypes } from 'react'
import SignupForm from '../components/SignupForm'
import BasePage from '../components/BasePage.jsx'

export default class Signup extends React.Component {

	constructor (props, context) {
		super(props, context)

		this.state = {
			errors: {
				name: '',
				email: '',
				password: ''
			},
			user: {
				email: '',
				name: '',
				password: ''
			}
		}

		this.processForm = this.processForm.bind(this)
		this.changeUser = this.changeUser.bind(this)
	}

	processForm(event) {
		event.preventDefault()

		const name = this.state.user.name
		const email = this.state.user.email
		const password = this.state.user.password
		const formData = {
			name,
			email,
			password
		}

		const xhr = new XMLHttpRequest()
		xhr.open('post', '/auth/signup')
		xhr.setRequestHeader('Content-type', 'application/json')
		xhr.responseType = 'json'
		xhr.addEventListener('load', () => {
			if(xhr.status === 200) {
				this.setState({
					errors: {
						name: '',
						email: '',
						password: ''
					}
				})

				localStorage.setItem('successMessage', xhr.response.message)

				this.context.router.push('/login')
			} else {
				
				const errors = xhr.response.errors ? xhr.response.errors : {}
				errors.summary = xhr.response.message

				this.setState({
					errors
				})
			}
		})
		xhr.send(JSON.stringify(formData))
	}

	changeUser(event) {
		const field = event.target.name
		const user = this.state.user
		user[field] = event.target.value

		this.setState({
			user
		})
	}

	render () {
		return (

			<div>
				<BasePage/>

				<div className="container">
					<SignupForm 
						onSubmit={this.processForm}
						onChange={this.changeUser}
						errors={this.state.errors}
						user={this.state.user}
					/>
				</div>	
			</div>
		)
	}
}

Signup.contextTypes = {
  router: PropTypes.object.isRequired
}