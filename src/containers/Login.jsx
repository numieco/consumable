import React, { PropTypes } from 'react'
import LoginForm from '../components/LoginForm'
import BasePage from '../components/BasePage.jsx'
import Auth from '../server/auth/authUserCheck'
import Home from '../containers/Home.jsx'

export default class Login extends React.Component {

  constructor(props, context) {
    super(props, context)

    const storedMessage = localStorage.getItem('successMessage')
    let successMessage = ''

    if (storedMessage) {
      successMessage = storedMessage
      localStorage.removeItem('successMessage')
    }

    this.state = {
      errors: {
      	email: '',
      	password: ''
      },
      successMessage,
      user: {
        email: '',
        password: ''
      }
    }

    this.processForm = this.processForm.bind(this)
    this.changeUser = this.changeUser.bind(this)
  }

  processForm(event) {

    event.preventDefault()

    const email = this.state.user.email
    const password = this.state.user.password
    const formData = {
    	email,
    	password
    }

    const xhr = new XMLHttpRequest()
    xhr.open('post', '/auth/login')
    xhr.setRequestHeader('Content-type', 'application/json')
    xhr.responseType = 'json'
    xhr.addEventListener('load', () => {
      if (xhr.status === 200) {
        this.setState({
          errors: {}
        })

        Auth.authenticateUser(xhr.response.token)
        localStorage.setItem('userType', 'seller')
        localStorage.setItem('sellerEmail', this.state.user.email)
        this.context.router.push('/')
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

  onBackButtonEvent(e) {
    e.preventDefault()
    this.transitionTo('Home')
  }

	render () {
		return (

			<div>
				<BasePage/>

				<div className="container">
					<LoginForm 
		        onSubmit={this.processForm}
		        onChange={this.changeUser}
		        errors={this.state.errors}
		        successMessage={this.state.successMessage}
		        user={this.state.user}
					/>
				</div>	

			</div>
		)
	}
}

Login.contextTypes = {
  router: PropTypes.object.isRequired
}