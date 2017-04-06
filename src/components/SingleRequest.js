import React from "react"
import CompanyUpload from "./CompanyUpload"
import ImageBox from "./ImageBox"


let socket = io.connect()
let sellers = {}
let hasOffer = false
export default class SingleRequest extends React.Component {

	constructor(props) {
		super(props)
		this.state = {
			isCustomer : true,
			showSellerUpload: false,
			showOffersToCustomer: false,
			offersBySellers: []
		}
		this.proposeItems = this.proposeItems.bind(this)
		this.hideCompanyUpload = this.hideCompanyUpload.bind(this)
		this.checkOffers = this.checkOffers.bind(this)
	}

	isCustomer = () => {
		if (this.props.details.userType == "customer") {
			return true
		} else {
			return false
		}
	}

	checkOffers = () => {

		this.setState({
			showOffersToCustomer: !this.state.showOffersToCustomer
		})

		socket.emit('checkOffers', {timestamp: this.props.timestamp, email: this.props.email})

		socket.on('returnOffers', (data) => {

			if(data.sellers.length > 0) {

				let getData = this.state.offersBySellers
				getData.push(data)

				this.setState({
					offersBySellers: getData
				})
			}
			sellers = data.sellers

		})
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
		
		let offer

		{
			this.state.offersBySellers.map((data, id) => {
				if(this.props.timestamp == data.timestamp) {
					offer = data.sellers.map((seller, sellerId) => {
						return ( 
							<ImageBox 
							  offers={ seller } 
							  key={ sellerId } 
							  requestTime={ this.props.timestamp } 
							  customerEmail={ this.props.email } 
							/> 
						)
					})

				}
			})
		}

		if (this.isCustomer()) {
			console.log("It re-renders")
			return (
				<div className="singleReq" onClick={ this.checkOffers }>

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
					<div className="offersBySellers"> 
						{
							this.state.showOffersToCustomer
							? offer
							: <div />
						} 
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
								sellerEmail={ this.props.sellerEmail }
						/>
						: <div></div>
					}

				</div>
			)
		}
	}
}