import React from "react"
import CompanyUpload from "./CompanyUpload"

export default class SingleRequest extends React.Component {
	
	constructor(props) {
		super(props)
		this.state = {
			isCustomer : true,
			showSellerUpload: false
		}
	
		this.proposeItems = this.proposeItems.bind(this)
		this.hideCompanyUpload = this.hideCompanyUpload.bind(this)
	}

	isCustomer = () => {
		if (this.props.details.usertype == "customer") {
			return true
		} else {
			return false
		}
	}

	proposeItems = () => {
		this.setState({
			showSellerUpload: true
		})
	}
	
	hideCompanyUpload = () => {
		this.setState({
			showSellerUpload: false
		})
	}

	render() {
		
		if (this.isCustomer()) {
			return (
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

		} else {
			return (
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
					<div className="requestBtn connectBtn" onClick={this.proposeItems} >
						Connect
					</div>

					{
						this.state.showSellerUpload
						? <CompanyUpload 
								title={ this.props.desc }
								timestamp={ this.props.timestamp }
								email={ this.props.email }
								size={ this.props.size }
								hideCompanyUpload={ this.hideCompanyUpload }
						/>
						: <div></div>
					}

				</div>
			)
		}
	}
}