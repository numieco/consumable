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
		$.ajax({
  			url: "http://localhost:8080/allRecords",
  			type: "GET",
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
	}

	render() {
	if(this.state.allReq){
		let list = this.state.allReq.requests.reverse().map((data, i) => {
			return (
				<div> 
					<SingleRequest 
						photo={data.photo} 
						name={data.name} 
						desc={data.itemDesc} 
						min={data.min}
						max={data.max}
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