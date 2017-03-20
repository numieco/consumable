import React from "react"
import FacebookLoginButton from "./FacebookLoginButton"
import $ from "jquery"

export default class Header extends React.Component {

	constructor(props) {
		super(props)
		
		this.state = {
			details: {
				usertype : "",
				username: "",
				email: "",
				age: "",
				photo: ""				
			}
		}

		this.userInfo = this.userInfo.bind(this)
		this.sendDetailToParent = this.sendDetailToParent.bind(this)
	}

	userInfo = (usertype, username, email, age, photo) => {
		this.setState({
			details: {
				usertype : usertype,
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

	clickToshowBtn = () => {
			$(".dropdown-content").toggle();
	}

	checkForButton = () => {

			if(this.state.details.username == "" || this.state.details.username == null){
				$('.dropdown-content').css({
					'display' : 'inline-block',
					'background-color' : 'white',
					'box-shadow' : '0px 0px 0px 0px'
				});
				console.log("why this is happening" + this.state.details.username)
			}else{
				$('.dropdown-content').css({
					'display' : 'none',
					'box-shadow' : '0px 8px 16px 0px rgba(0,0,0,0.2)',
					'background-color' : '#f9f9f9'
				});
				console.log("it also enters this")
			}
	}

	render() {
			return(
				<div className="header">
					{this.checkForButton()}
					<h2 className="title-text"> Consumable </h2>
					{this.state.details.username == "" || this.state.details.username == null ? 
					<span></span> : <h4 className="header-user-name"> Hi, {this.firstname()} </h4>}
					<div className="dropdown">
						<div className="header-photo" onClick={this.clickToshowBtn.bind(this)}>
						{this.state.details.username == "" || this.state.details.username == null ? 
						<span></span> :	<img src={this.state.details.photo} alt={this.state.details.photo} />
						}
						</div>
						<div className="dropdown-content">
							<FacebookLoginButton fb={FB} userInfo={this.userInfo}/>
						</div>
					</div>
				</div>
			)
		
	}
}