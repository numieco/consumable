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
		if (this.props.details.userType == "customer") {
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

	showOffers = () => {
		if (this.props.individual == "true") {
			this.setState({
				showOffers: true
			})
			if(this.props.seller.length == 0){
				this.someData = "No offers from sellers"
			}else{
				this.someData = this.props.seller.map((item, i) =>{
					<ImageBox key ={i} sellerTitle = {item.title} sellerImage = {item.image} sellerLink = {item.link} sellerprice = {item.price} />
				})
			}	
		}	
	}

	render() {
		
		if (this.isCustomer()) {
			return (
				<div className="singleReq" onClick={this.showOffers.bind(this)}>
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
					{this.state.showOffers ?
						<div className="showOffers">
							{this.someData}
						</div> : <div> </div>	
					}
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