import React from "react"
import SingleRequest from "../components/SingleRequest"
import $ from "jquery"

export default class AllRequest extends React.Component {

	constructor(props) {
		super(props)
		this.state = {
			allReq: "",
            everyoneReq : true,
            invidualReq : false
		}
		this.refreshData = this.refreshData.bind(this)
        console.log("value of everyone"+ this.state.everyoneReq);
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

    everyoneRequest = () => {
        // if everone tab is clicked, it sets the corresponding varible to true 
        this.setState({
            everyoneReq : true,
            invidualReq : false
        });
        // changing the color inorder show it is selected
        $(".everybody").css({
            "color" : "#609dff",
            "border-color" : "#609dff"
        });
        $(".individual").css({
            "color" : "black",
            "border-color" : "black"
        });
    }

    individualRequest = () => {
        // if individual tab is clicked, it sets the corresponding varible to true
        this.setState({
            invidualReq : true,
            everyoneReq : false
        }) 
        // changing the color inorder show it is selected
        $(".individual").css({
            "color" : "#609dff",
            "border-color" : "#609dff"
        });
        $(".everybody").css({
            "color" : "black",
            "border-color" : "black"
        });
    }

	render() {
        // checking if the everyone tab is clicked or individual tab is clicked. If everyone is true then all the request is listed 
        // else if individual is true only the request made by current user is listed
	if(this.state.allReq){
        let list;
        if(this.state.everyoneReq){
    		list = this.state.allReq.requests.reverse().map((data, i) => {
    			return (
    				<div key={i}> 
    					<SingleRequest 
    						photo={data.photo} 
    						name={data.name} 
    						desc={data.itemDesc} 
    						min={data.min}
    						max={data.max}
    						key={i}
                            details = {this.props.details}
    					/> 
    				</div>
    			)
    		})
        }else if(this.state.invidualReq){
            list = this.state.allReq.requests.reverse().map((data, i) => {
                if(data.email == this.props.details.email){
                    return (
                        <div key={i}> 
                            <SingleRequest 
                                photo={data.photo} 
                                name={data.name} 
                                desc={data.itemDesc} 
                                min={data.min}
                                max={data.max}
                                key={i}
                                details = {this.props.details}
                            /> 
                        </div>
                    ) 
                }
                
            })
        }
		return(
            <div>
            <div className="requestSelector">
                <div className="everybody" onClick={this.everyoneRequest.bind(this)}> Everyone </div>
                <div className="individual" onClick={this.individualRequest.bind(this)}> Individual </div>
            </div>
			<div className="list-requests">{list}</div>
            </div>
		)
	}
	else {
		return(
			<div> no data </div>
		)
	}
	}
}