import React from "react"
import Header from "../components/Header"
import UserDetails from "../components/UserDetails"
import AllRequest from "../components/AllRequest"

require("../sass/index.scss")

export default class App extends React.Component {

	constructor(props) {
		super(props)
		this.userDetails = this.userDetails.bind(this)
		this.refreshData = this.refreshData.bind(this)

		this.state = {
			details: {
				username: "",
				email: "",
				age: "",
				photo: "",			
			}
		}
	}

	userDetails = (details) => {
		this.setState({
			details: details			
		})
	}

	refreshData = () => {
		this.refs.child.refreshData()
	}

	render(){
		return(
			<div className="container">
				<Header fb={FB} userDetails={this.userDetails} />
				<UserDetails details={this.state.details} 
							name={this.state.details.username}
							refreshData={this.refreshData} />
				<AllRequest ref="child" />

			</div>
		);
	}
}