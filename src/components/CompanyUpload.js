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
			isImageUploaded: false,
			numberOfImages: '',
			images: [],
			offeredSize: ''
		}

		this.hidePopup = this.hidePopup.bind(this)
		this.onDrop = this.onDrop.bind(this)
		this.submitSellersOffer = this.submitSellersOffer.bind(this) 
		this.handlePrice = this.handlePrice.bind(this)
		this.handleNotes = this.handleNotes.bind(this)
		this.handleLink = this.handleLink.bind(this)
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
		let images = this.state.images
		if (accepted.length > 0) {

			console.log(accepted)
			accepted.forEach((file) => {
				images.push(file)
			})

			this.setState({
				isImageUploaded: true,
				numberOfImages: images.length,
				images: images
			}, () => console.log(this.state.images))
		} else {
			this.setState({
				isImageUploaded: images.length > 0 ? true : false ,
				numberOfImages: images.length,
				images: images
			})
		}

	}


	submitSellersOffer = () => {

	}

	handlePrice = (event) => {
		this.setState({
			price: event.target.value
		})
	}

	handleNotes = (event) => {
		this.setState({
			notes: event.target.value
		})
	}

	handleLink = (event) => {
		this.setState({
			link: event.target.value
		})
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
						<input type='number' value={this.state.price} onChange={ this.handlePrice } placeholder='Price' />
					</div>

					<div className='item-size-upload'>
						<ItemSize staticSize={ this.props.size }/>
					</div>

					<div>
						<Dropzone 
							className='image-upload'
							onDrop={ this.onDrop }
							accept='image/*'
							multiple={true}
						>
							Drag and drop attachments here or <p>browse</p>
							{
								this.state.isImageUploaded
								? <div> { this.state.numberOfImages } Uploaded </div>
								: <div> </div>
							}
						</Dropzone>
					</div>

					<div className='sellers-notes'>
						<textarea value={ this.state.notes } onChange={ this.handleNotes } placeholder='Notes' />
					</div>

					<div className='seller-link'>
						<input type='text' value={ this.state.link } onChange={ this.handleLink } placeholder='Link' />
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