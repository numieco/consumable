import React from "react"
import CompanyUpload from "./CompanyUpload"
import ImageBox from "./ImageBox"
import { ShowPercentPopup } from './Popups'


let socket = io.connect()
let sellers = {}
let hasOffer = false
let thisImageRender = []

export default class SingleRequest extends React.Component {

	constructor(props) {
		super(props)
		this.state = {
			isCustomer : true,
			showSellerUpload: false,
			showOffersToCustomer: false,
			offersBySellers: [],
			show80percent: false,
			show60percent: false
		}

		this.proposeItems = this.proposeItems.bind(this)
		this.hideCompanyUpload = this.hideCompanyUpload.bind(this)
		this.checkOffers = this.checkOffers.bind(this)
		this.goBack = this.goBack.bind(this)
		this.okClicked = this.okClicked.bind(this)
	}

	isCustomer = () => {
		if (this.props.details.userType == "customer") {
			return true
		} else {
			return false
		}
	}

	checkOffers = () => {
		if(this.props.email == localStorage.getItem('customerEmail')) {
			this.setState({
				showOffersToCustomer: !this.state.showOffersToCustomer
			}, () => {

				if(this.state.showOffersToCustomer){

					socket.emit('checkOffers', {timestamp: this.props.timestamp, email: this.props.email})

					socket.on('returnOffers', (data) => {

						socket.removeListener('returnOffers')

						if(data.sellers.length > 0) { 

							let getData = []
							getData.push(data)

							this.setState({
								offersBySellers: getData
							})
						} else {
							this.setState({
								offersBySellers: []
							})
						}
						sellers = data.sellers

					})
				}

			})
		}
	}

	proposeItems = () => {
		this.setState({
			showSellerUpload: true
		})
	}
	
	hideCompanyUpload = () => {
		this.setState({
			showSellerUpload: false,
			show80percent: false,
			show60percent: false
		})
	}

	goBack = () => {
		this.setState({
			show60percent: false,
			show80percent: false
		})
	}

	okClicked = () => {
		this.refs.companyUpload.sendData()
	}

	render() {
		
		let offer = null
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
							  inProcess={seller.offerStatus==='inProcess' ? true : false}
							  unmountMe = {() => {
							  	thisImageRender = []
							  	thisImageRender.push(sellerId)
							  }}
							/> 
						)
					})
				}
			})

		}

		if (this.isCustomer()) {
			return (
				<div>
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
							<div className="price-range-underline">${this.props.min} - ${this.props.max}</div>
						</div>
					</div>

					<div className="offersBySellers"> 
						{
							this.state.showOffersToCustomer
							? offer
							: null
						} 
					</div>
				</div>
			)

		} else {
			return (
				<div className="singleReq">
				{this.state.isLoading ? <div className="loading" /> : <div />}
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
						<div className="price-range-underline">${this.props.min} - ${this.props.max}</div>
					</div>
					
					{
						this.props.details.userType === "seller"
						? <div className="requestBtn connectBtn" onClick={this.proposeItems} >
						    Connect
						  </div>
						: null
					}


					{
						this.state.showSellerUpload
						? <CompanyUpload 
								title={ this.props.desc }
								timestamp={ this.props.timestamp }
								email={ this.props.email }
								size={ this.props.size }
								hideCompanyUpload={ this.hideCompanyUpload }
								sellerEmail={ this.props.sellerEmail }
								ref='companyUpload'
								show80percent={ () => {this.setState({ show80percent: true, show60percent: false })} }
								show60percent={ () => {this.setState({ show60percent: true, show80percent: false })} }
						/>
						: null
					}

					{
						(this.state.show80percent || this.state.show60percent)
						? <ShowPercentPopup 
								show60percent={ this.state.show60percent } 
								goBack={ this.goBack } 
								okClicked={ this.okClicked }
							/>
						: null

					}

				</div>
			)
		}
	}
}