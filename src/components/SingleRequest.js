import React from "react"
import CompanyUpload from "./CompanyUpload"
import ImageBox from "../components/ImageBox"

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

	componentWillReceiveProps(nextProps){
		if (nextProps.individual == "true" ) {
			this.setState({
				showViewBtn: true
			})
		console.log("It enters the componentWillMount")		
		}else{
			this.setState({
				showViewBtn: false
			})
		}	
	}

	showImages = () =>{
		console.log("It enters the showImages")
		this.setState({
			showOffers: true
		})	
	}

	offerDetail = () => {
		console.log("IT enters the offerDetail")
		var offers = this.props.seller.map((item, i) =>{
			return <ImageBox key ={i} sellerTitle = {item.title} sellerImage = {item.image} sellerLink = {item.link} sellerprice = {item.price} />
		})
		return offers
	}

	render() {
		
		if (this.isCustomer()) {
			console.log("It re-renders")
			return (
				<div className="singleReq" >
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
					{this.state.showViewBtn ?
						<div className="viewButton">
							<button className="offer-view-button" onClick={this.showImages.bind(this)}> View </button>
						</div> : <div> </div>	
					}
					{this.state.showOffers ?
						<div className="sellerOffers">
							{this.offerDetail.bind(this)}
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