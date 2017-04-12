import React from 'react'
import { DidYouBuy, KeepPosted } from './Popups'

let socket = io.connect()

export default class ImageBox extends React.Component{
    constructor (props) {
        super(props)

        this.state = {
            inProcess: props.inProcess,
            offerStatus: props.offers.offerStatus
        }

        console.log(this.props)

        this.acceptOffer = this.acceptOffer.bind(this)
    }

    acceptOffer = () => {
        if (this.props.offers.link){
            
            window.location.assign(this.props.offers.link)
            socket.emit('pendingToInProcess',
                {
                    timestamp: this.props.requestTime, 
                    email: this.props.customerEmail, 
                    offerTime: this.props.offers.offerTime,
                    sellerEmail: this.props.offers.sellerEmail
                })
        }
    }

    render(){
        return(
            <div className="imageBox">
                <div className="close-btn">
                    x
                </div>
                <div className="personName">
                    {this.props.offers.sellerEmail}
                </div>
                <div className="boxImage">
                    <img src={this.props.offers.images[0]} alt="image" />
                </div>
                <div className="footer">
                    <div className="footer-price">
                        {this.props.offers.price}
                    </div>

                    {
                        this.state.offerStatus === 'inProcess'
                        ? <div className='inProcess-button'> In Process </div>
                        : (this.state.offerStatus === 'rejected'
                          ? <div className='rejected-button'> Rejected </div>
                          : this.state.offerStatus === 'accepted'
                            ? <div className="accept-btn green-btn" onClick={ this.acceptOffer }> Accepted </div>
                            : <div className="accept-btn" onClick={ this.acceptOffer }> Accept </div>)
                    }

                </div>

                {
                    this.state.inProcess 
                    ? 
                        <DidYouBuy 
                        data={this.props} 
                        changeInProcess={ () => {this.setState({ inProcess : false }) }} 
                        /> 
                    : <div />
                }
            </div>
        )
    }
}