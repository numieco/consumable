import React from 'react'
import Dropzone from 'react-dropzone'
import ItemSize from './ItemSize'

export default class CompanyUpload extends React.Component {

	constructor (props) {
		super (props)
		this.state = {
			title: this.props.title,
			timestamp: this.props.timestamp,
			email: this.props.email,
			size: this.props.size,
			price: '',
			notes: '',
			link: '',
			offeredSize: ''
		}

		this.hidePopup = this.hidePopup.bind(this)
		this.onDrop = this.onDrop.bind(this)
		this.submitSellersOffer = this.submitSellersOffer.bind(this) 
	}

	priceChange = (event) => {
		this.setState({
			price: event.target.value
		})
	}

	hidePopup = () => {
		this.props.hideCompanyUpload()
	}

	onDrop = (accepted, rejected) => {
		console.log('accepted')
		console.log(accepted)
		console.log('rejected')
		console.log(rejected)
	}

	submitSellersOffer = () => {

	}

	render () {
		return (
			<div className='company-upload'>
				<div className='transparent-background'> </div>
				<div className='consumer-request'>
					<div className='item-title'>
						{ this.state.title}
					</div>

					<div className='price-offered'>
						<input type='text' value={this.state.price} placeholder='Price'/>
					</div>

					<div className='item-size-upload'>
						<ItemSize staticSize={ this.props.size }/>
					</div>

					<div>
						<Dropzone className='image-upload'
											onDrop={ this.onDrop }
											accept='image/*'>
							Drag and drop attachments here or <p>browse</p>
						</Dropzone>
					</div>

					<div className='sellers-notes'>
						<textarea value={ this.state.notes } placeholder='Notes' />
					</div>

					<div className='seller-link'>
						<input type='text' value={ this.state.link } placeholder='Link' />
					</div>

					<div className='upload-buttons'>
						<div className='cancel-button' onClick={ this.hidePopup }> Cancel </div>
						<div className='submit-button' onClick={ this.submitSellersOffer }> Submit </div>
					</div>
				</div>
			</div>
		)
	}
}