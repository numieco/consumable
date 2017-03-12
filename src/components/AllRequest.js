import React from "react"
import SingleRequest from "../components/SingleRequest"
import $ from "jquery"

export default class AllRequest extends React.Component {

	constructor(props) {
		super(props)
		this.state = {
			allReq: ""
		}
		this.refreshData = this.refreshData.bind(this)
	}

	componentDidMount() {
		this.refreshData()
	}

	refreshData = () => {

		const xhr = new XMLHttpRequest()
		xhr.open('post', '/allRecords')
		xhr.setRequestHeader('Content-type', 'application/json')
		xhr.responseType = 'json'
		xhr.addEventListener('load', () => {
			if(xhr.status === 200) {
				this.setState({
  					allReq: xhr.response
  				})
			} else {
				console.log(xhr.response.error)
			}
		})
		xhr.send()
/*
		$.ajax({
  			url: "/allRecords",
  			type: "post",
  			dataType: "json",
  			success: (response) => { 
  				this.setState({
  					allReq: response
  				})
  			},
  			error: (error) => {
  				console.log(error)
  			}

  		})		
*/
	}

	render() {
	if(this.state.allReq){
		let list = this.state.allReq.requests.reverse().map((data, i) => {
			return (
				<div key={i}> 
					<SingleRequest 
						photo={data.photo} 
						name={data.name} 
						desc={data.itemDesc} 
						min={data.min}
						max={data.max}
						key={i}
					/> 
				</div>
			)
		})
		return(
			<div className="list-requests">{list}</div>
		)
	}
	else {
		return(
			<div> no data </div>
		)
	}
	}
}