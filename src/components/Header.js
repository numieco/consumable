import React from "react"
import FacebookLoginButton from "./FacebookLoginButton"

export default class Header extends React.Component {

	constructor(props) {
		super(props)
		
		this.state = {
			details: {
				username: "",
				email: "",
				age: "",
				photo: ""				
			}
		}

		this.userInfo = this.userInfo.bind(this)
		this.sendDetailToParent = this.sendDetailToParent.bind(this)
	}

	userInfo = (username, email, age, photo) => {
		this.setState({
			details: {
				username: username,
				email: email,
				age: age,
				photo: photo				
			}			
		})
		this.sendDetailToParent()
	}

	sendDetailToParent = () => {
		this.props.userDetails(this.state.details)
	}


	render() {
		return(
			<div className="header">
				<h2 className="title-text"> Consumable </h2>
				<FacebookLoginButton fb={FB} userInfo={this.userInfo}/>
			</div>
		)
	}
}