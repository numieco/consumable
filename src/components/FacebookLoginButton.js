import React from "react"
import $ from "jquery"

export default class FacebookLoginButton extends React.Component {

	constructor(props) {
		super(props)
		this.FB = props.fb
		this.sendParent = this.sendParent.bind(this)
		this.state = {
			loginStatus: "",
			username: null,
			email: null,
			age: null,
			photo: null
		}
	}

	componentDidMount(props) {			

		this.FB.Event.subscribe('auth.logout', 
			this.onLogout.bind(this))

		this.FB.Event.subscribe('auth.statusChange',
			this.checkLoginStatus.bind(this))	

		this.FB.Event.subscribe('auth.login',
			this.onLogin.bind(this))	

		FB.api(
			'/me?fields=name,email,birthday,picture'
			, (response) => {
				console.log(response)
			}
		)
	}

	sendParent = (username,email,birthday,photo) => {
		this.props.userInfo(username,email,birthday,photo)
	}

	onLogin = () => {
		console.log("loggedin")
	}

	checkLoginStatus = (response) => {
		console.log("checkLoginStatus")
		const self = this
		if(response.status === "connected") {
			FB.api(
				'/me?fields=name,email,birthday,picture.type(large)'
				, (response) => {
					//ajax call to mongo server

					this.setState({
						username: response.name,
						email: response.email,
						age: response.birthday,
						photo: response.picture.data.url						
					})

					this.sendParent(response.name, response.email, response.birthday, response.picture.data.url)
				}
			)
		} else {
			console.log("nothing here")
		}
	}

	onLogout = (response) => {
		console.log("logged out")
		this.setState({
			username: null,
			email: null,
			age: null,
			photo: null			
		})
		this.sendParent(this.state.username, this.state.email, this.state.age, this.state.photo)
		console.log(this.state.username)
		FB.getLoginStatus((response) => {
			console.log(response.status)
		})
	}


	render() {
		return(
			<div className="fb-button">
				<div className="fb-login-button" 
					data-max-rows="1"
					data-scope="public_profile,email,user_birthday"
					data-size="large"						
					data-show-faces="false" 
					data-auto-logout-link="true"
				> Signin
				</div>

			</div>
		)
	}
}