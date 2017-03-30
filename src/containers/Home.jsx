import React from "react"
import Header from "../components/Header"
import UserDetails from "../components/UserDetails"
import AllRequest from "../components/AllRequest"
import Auth from '../server/auth/authUserCheck'

require("../sass/index.scss")

export default class Home extends React.Component {

	constructor(props) {
		super(props)

		this.state = {
			details: {
        userType: "",
				username: "",
				email: "",
				age: "",
				photo: "",
				user: "",
				sellerSearch : false		
			}
		}

		this.userDetails = this.userDetails.bind(this)
		this.refreshData = this.refreshData.bind(this)
	}

	componentDidMount = (props) => {

		if(Auth.isUserAuthenticated()) {
	    const xhr = new XMLHttpRequest()
	    xhr.open('get', '/api/home')
	    xhr.setRequestHeader('Content-type', 'application/application/x-www-form-urlencoded')
	    
	    xhr.setRequestHeader('Authorization', `bearer ${Auth.getToken()}`)
	    xhr.responseType = 'json'
	    xhr.addEventListener('load', () => {
	      if (xhr.status === 200) {
	      	localStorage.setItem('userType', 'seller')
	      	
	        this.setState({
	          details: {
	          	userType: 'seller'
	          }
	        })
	      }
	    })
	    xhr.send()
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

	setSellerSearch = (searchText, category) => {
		this.refs.child.sellerSearchedData(searchText,category)
	}

	render(){
		return(
			<div className="container">
				<Header fb={FB} userDetails={this.userDetails} />
				<UserDetails 
					details={this.state.details} 
					name={this.state.details.username}
					refreshData={this.refreshData}
					sellerSearch = {(searchText, category) => this.setSellerSearch(searchText, category)} 
				/>
				<AllRequest ref="child" details={this.state.details} />

			</div>
		);
	}
}