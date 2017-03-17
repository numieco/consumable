import React from "react"
import NoUser from "../components/NoUser"
import ItemSize from "../components/ItemSize"
import ItemRequest from "../components/ItemRequest"
import $ from "jquery"

export default class UserDetails extends React.Component {
	
	constructor(props) {
		super(props)
		this.state = {
			details: props.details,
			desc: "",
			min: "",
			max: "",
			descClass: "description",
			minRange: "minRange",
			maxRange: "maxRange"
		}

		this.validateAndStore = this.validateAndStore.bind(this)
		this.handleDescription = this.handleDescription.bind(this)
		this.handleMinRange = this.handleMinRange.bind(this)
		this.handleMaxRange = this.handleMaxRange.bind(this)
		this.clearStates = this.clearStates.bind(this)
	}

	validateAndStore = () => {
		let desc = this.state.desc
		let min = this.state.min
		let max = this.state.max


		if(desc==="" && min==="" && max===""){
			console.log("Empty all data")
			this.setState({
				descClass: "description no-desc",
				minRange: "minRange no-min",
				maxRange: "maxRange no-max"				
			})
		}
		else if(desc!=="" && min==="" && max===""){
			console.log("Empty min and max")
			this.setState({
				descClass: "description",
				minRange: "minRange no-min",
				maxRange: "maxRange no-max"
			})
		}
		else if(desc==="" && min!=="" && max===""){
			console.log("Empty desc and max")
			this.setState({
				descClass: "description no-desc",
				minRange: "minRange",
				maxRange: "maxRange no-max"
			})
		}
		else if(desc==="" && min==="" && max!==""){
			console.log("Empty desc and min")
			this.setState({
				descClass: "description no-desc",
				minRange: "minRange no-min",
				maxRange: "maxRange"
			})			
		}
		else if(desc==="" && min!=="" && max!==""){
			console.log("Empty Desc")
			this.setState({
				descClass: "description no-desc",
				minRange: "minRange",
				maxRange: "maxRange"
			})			
		}
		else if(desc!=="" && min==="" && max!==""){
			console.log("Empty Min")
			this.setState({
				descClass: "description",
				minRange: "minRange no-min",
				maxRange: "maxRange"
			})			
		}
		else if(desc!=="" && min!=="" && max===""){
			console.log("Empty Max")
			this.setState({
				descClass: "description",
				minRange: "minRange",
				maxRange: "maxRange no-max"
			})			
		}
		else if(desc!=="" && min!=="" && max!==""){
			console.log("SUCCESS")
			this.setState({
				descClass: "description",
				minRange: "minRange",
				maxRange: "maxRange"
			})

			let data = '{ "email" : "'+ this.props.details.email +'", "name" : "'+ this.props.details.username +'", "photo" : "'+ this.props.details.photo +'", "age" : "'+ this.getAge(this.props.details.age) +'", "itemDesc" : "'+ desc +'", "min" : "'+ min +'", "max" : "'+ max +'"}'

			const xhr = new XMLHttpRequest()
			xhr.open('POST', '/insertRequest')
			xhr.setRequestHeader('Content-type', 'application/json')
			xhr.responseType = 'json'
			xhr.addEventListener('load', () => {
				if(xhr.status === 200) {
					this.clearStates()
					this.props.refreshData()
				} else {
					console.log(xhr.response.error)
					this.clearStates()
					this.props.refreshData()
				}
			})
			xhr.send(data)

		/*	$.ajax({
	  			url: "http://localhost:8089/insertRequest",
	  			type: "POST",
	  			data: data,
	  			dataType: "json",
	  			contentType: "application/json",
	  			async: true	
			}).done((data) => {
				this.clearStates()				
				this.props.refreshData()			
			}).fail((err) => {
				console.log(err)
				this.clearStates()				
				this.props.refreshData()			
			})
		
		*/
		}
	}

	clearStates = () => {
		this.setState({
			desc: "",
			min: "",
			max: ""
		})
	}

	getAge = (dob) => {
		let today = new Date()
		dob = new Date(dob)
		let age = today -  dob
		return Math.floor(age/31536000000)
	}

	handleDescription = (e) => {
		this.setState({
			desc: e.target.value
		})
	}

	handleMaxRange = (e) => {
		this.setState({
			max: e.target.value
		})
	}

	handleMinRange = (e) => {
		this.setState({
			min: e.target.value
		})
	}

	render() {
		if(this.props.details.username && this.props.details.email && this.props.details.age && this.props.details.photo){
			return (
				<div className="currentuser">
					{/* <div className="profilePic">
						<img src={this.props.details.photo} alt="Your Pic."/>
					</div>
					
					<div className="usename">
						{this.props.details.username}
					</div> */}
					
					<div className={this.state.descClass}>

						<div className="descField">
							<input type="text" 
								   onChange={this.handleDescription} 
								   value={this.state.desc}
								   placeholder="Item Description"
							/>
						</div>
					</div>
					<div className="wrapPriceBtn">
					<div className="priceRange">
						<div className="range-div">Price Range</div>
						<div className="lowRange">
							<input className={this.state.minRange} 
									type="number"
									value={this.state.min} 
									onChange={this.handleMinRange}/>
							Low
						</div>
						 - 
						<div className="highRange">
							<input className={this.state.maxRange} 
									type="number" 
									value={this.state.max}
									onChange={this.handleMaxRange}/>
							High
						</div>
					</div>
 
					{/*<div className="requestBtn" onClick={this.validateAndStore}>
						Request
					</div> */}
					</div>
					<ItemSize />
					<ItemRequest storeData= {this.validateAndStore}/>
				</div>
			)
		} else {
			return (
				<div className="currentuser">
					<NoUser />
				</div>
			)
		}
	}
}