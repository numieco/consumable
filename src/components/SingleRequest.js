import React from "react"

export default class SingleRequest extends React.Component {
	
	constructor(props) {
		super(props)
		this.state = {
			isCustomer : true
		}
	}

	isCustomer(){
		if(this.props.details.usertype == "customer"){
			return true;	
		}else{
			return false;
		}
	}
	

	render() {
		
		if(this.isCustomer()){
			return(
				<div className="singleReq">
					<div className="singlePhoto">
						<img src={this.props.photo} alt={this.props.photo} />
					</div>
					<div className="singleName">
						{this.props.name}
					</div>
					<div className="singleDesc">
						{this.props.desc}
					</div>
					<div className="singleRange">
						${this.props.min} - ${this.props.max}
					</div>
					
					
				</div>
			)
		}else{
			return(
				<div className="singleReq">
					<div className="singlePhoto">
						<img src={this.props.photo} alt={this.props.photo} />
					</div>
					<div className="singleName">
						{this.props.name}
					</div>
					<div className="singleDesc">
						{this.props.desc}
					</div>
					<div className="singleRange">
						${this.props.min} - ${this.props.max}
					</div>
					<div className="requestBtn connectBtn">
						Connect
					</div>
					
				</div>
			)
		}
		
	}
}