import React from "react"
import FacebookLoginButton from "./FacebookLoginButton"
import $ from "jquery"
import { Link } from "react-router"
import Auth from "../server/auth/authUserCheck"

export default class Header extends React.Component {

	constructor(props) {
		super(props)
		
		this.state = {
			details: {
				userType : "",
				username: "",
				email: "",
				age: "",
				photo: ""				
			}
		}

		this.userInfo = this.userInfo.bind(this)
		this.sendDetailToParent = this.sendDetailToParent.bind(this)

	}

	userInfo = (userType, username, email, age, photo) => {
		this.setState({
			details: {
				userType : userType,
				username: username,
				email: email,
				age: age,
				photo: photo				
			}			
		}, () => this.sendDetailToParent())
		
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

			if(Auth.isUserAuthenticated()){
				$('.dropdown').css({
					'display' : 'none'
				})

			}else if(this.state.details.username == "" || this.state.details.username == null){
				$('.dropdown-content').css({
					'display' : 'inline-block',
					'background-color' : 'white',
					'box-shadow' : '0px 0px 0px 0px'
				})
				
			}else{
				$('.dropdown-content').css({
					'display' : 'none',
					'box-shadow' : '0px 8px 16px 0px rgba(0,0,0,0.2)',
					'background-color' : '#f9f9f9'
				})
			}
	}

	componentWillMount() {
		
		window.onclick = (event) => {
			if(!(this.state.details.username == "" || this.state.details.username == null)){
	  			if (!event.target.matches('.img-clk-drpdown')) {
	  				$(".dropdown-content").css({
	  					'display' : 'none'
	  				})
	  			}
	  		}
		}
		
	}



	sellerLogoutAction = () =>{
		Auth.deauthenticateUser()
		localStorage.removeItem('userType')
		localStorage.removeItem('sellerEmail')
		localStorage.removeItem('sellerName')
		this.setState({
			details : {
				userType : "",
				username: null,
				email: null,
				age: null,
				photo: null	
			}
		})
		location.reload()

	}


	render() {

		console.log("the value of state userType" + this.state.details.userType)
		return(
			<div className="header">
				{this.checkForButton()}

				{!Auth.isUserAuthenticated() && (this.state.details.userType == "" || this.state.details.userType == null) ? 
					<div className="seller-login-info">
						<Link to={'/Login'}> Click here to login if you are a seller </Link>
					</div>  : <span> </span>}
					
				
				<h2 className="title-text"> Consumable </h2>


					{
						Auth.isUserAuthenticated() 
						?
							<div className="seller-logout">
								<div className="seller-logout-button" onClick={this.sellerLogoutAction.bind(this)}> Log Out </div>
							</div> 
						:
							<div className="name-photo">
								{
									(this.state.details.username == "" || this.state.details.username == null) 
									? <h4 className="header-user-name"> </h4> 
									: <h4 className="header-user-name"> Hi, {this.firstname()} </h4>
								}
								<div className="dropdown">
									<div className="header-photo" onClick={this.clickToshowBtn.bind(this)}>

										{
											this.state.details.username == "" || this.state.details.username == null 
											? <span></span> 
											: <img src={this.state.details.photo} className="img-clk-drpdown" alt={this.state.details.photo} />
										}

									</div>
									<div className="dropdown-content">
										<FacebookLoginButton fb={FB} userInfo={this.userInfo}/>
									</div>
								</div>
							</div>
					}
			</div>
		)
		
	}
		
}
