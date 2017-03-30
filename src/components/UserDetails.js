import React from "react"
import NoUser from "../components/NoUser"
import ItemSize from "../components/ItemSize"
import ItemRequest from "../components/ItemRequest"
import $ from "jquery"

let socket = io.connect()

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
			maxRange: "maxRange",
			size : "",
			category: "",
			search: ""
		}

		this.validateAndStore = this.validateAndStore.bind(this)
		this.handleDescription = this.handleDescription.bind(this)
		this.handleMinRange = this.handleMinRange.bind(this)
		this.handleMaxRange = this.handleMaxRange.bind(this)
		this.handleSearch = this.handleSearch.bind(this)

		this.clearStates = this.clearStates.bind(this)
		this.getItemSize = this.getItemSize.bind(this)
		this.getItemCategory = this.getItemCategory.bind(this)
	}

	validateAndStore = () => {

		let desc = this.state.desc
		let min = this.state.min
		let max = this.state.max
		let size = this.state.size
		let category = this.state.category

		let keywords = desc.split(' ')

		category.forEach((i) => {
			keywords.push(i)
		})

		console.log(keywords)

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

			let data = '{ "email" : "'+ this.props.details.email 
								+'", "name" : "'+ this.props.details.username 
								+'", "photo" : "'+ this.props.details.photo 
								+'", "age" : "'+ this.getAge(this.props.details.age) 
								+'", "itemDesc" : "'+ desc 
								+'", "min" : "'+ min 
								+'", "max" : "'+ max 
								+'", "size" : "'+ size
								+'", "category" : '+ JSON.stringify(category)
								+', "keywords" : '+ JSON.stringify(keywords)
								+', "timestamp" : "'+ Date.now()
								+'", "sellers" : []}'

			socket.emit('insert-request', data)

			socket.on('insert-ack', (response) => {

				if(response.status === 200) {
					this.clearStates()
					this.props.refreshData()
				} else {
					console.log(response.error)
					this.clearStates()
					this.props.refreshData()
				}

			})	
		}
	}

	clearStates = () => {
		this.setState({
			desc: "",
			min: "",
			max: ""
		})
		this.sizeOfItem.clearStates()
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

	handleSearch = (e) => {
		this.setState({
			search: e.target.value
		})
	}

	getItemSize = (itemsize) =>{
		this.setState({
			size : itemsize
		})	
	}

	getItemCategory = (itemCat) => {
		this.setState({
			category : itemCat
		}, () => {
			console.log("category" +this.state.category)
		})
	}

	searchRequest = () => {
		let category = this.state.category
		let searchText = (this.state.search.length > 0) ? this.state.search.split(' ') : ''
		this.props.sellerSearch(searchText, category)
	}

	render() {
		if( this.props.details.username 
			&& this.props.details.email 
			&& this.props.details.age 
			&& this.props.details.photo 
			&& localStorage.getItem('userType') === 'customer') {
			
			return (
				<div className="currentuser">					
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
					<ItemSize ref={(input) => {this.sizeOfItem = input;}} returnSize = {this.getItemSize} />

					<ItemRequest userType={ this.props.details.userType } 
											 storeData= {() => this.validateAndStore()} 
											 returnCategory = {this.getItemCategory} 
					/>
				</div>
			)
		} else if (localStorage.getItem('userType') === 'seller' && this.props.details.userType === 'seller') {
			return (
				<div className="currentuser">					
					<div className="searchItem" >

						<div className="searchField">
							<input type="text" 
								   onChange={ this.handleSearch } 
								   value={ this.state.search }
								   placeholder="Search item category"
							/>
						</div>
					</div>
					<ItemRequest userType={ this.props.details.userType } 
									showSpecificReq = {this.searchRequest.bind(this)}
											 returnCategory={ this.getItemCategory }
					/>
				</div>
			)
		} else {
			return (
				<div></div>
			)
		}
	}
}