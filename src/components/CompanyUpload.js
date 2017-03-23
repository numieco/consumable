import React from 'react'
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
	}

	priceChange = (event) => {
		this.setState({
			price: event.target.value
		})
	}

	hidePopup = () => {
		this.props.hideCompanyUpload()
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
						<ItemSize />
					</div>

					<div className='image-upload'>

						<div>Drag and drop attachments here or <p>browse</p></div>

					</div>

					<div className='sellers-notes'>
						<textarea value={ this.state.notes } placeholder='Notes' />
					</div>

					<div className='seller-link'>
						<input type='text' value={ this.state.link } placeholder='Link' />
					</div>

					<div className='upload-buttons'>
						<div className='cancel-button' onClick={ this.hidePopup }> Cancel </div>
						<div className='submit-button'> Submit </div>
					</div>
				</div>
			</div>
		)
	}
}