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

	firstname = () =>{
		let getfirstname = this.state.details.username;
		let firstname = getfirstname.split(" ");
		return firstname[0];
	}


	render() {
		return(
			<div className="header">
				<h2 className="title-text"> Consumable </h2>
				<h4 className="header-user-name"> Hi, {this.firstname()} </h4>
				<FacebookLoginButton fb={FB} userInfo={this.userInfo}/>
			</div>
		)
	}
}