import React from "react"

let socket = io.connect()

export default class ImageBox extends React.Component{
    constructor (props) {
        super(props)

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
                    <div className="accept-btn" onClick={ this.acceptOffer }>
                        Accept
                    </div>
                </div>
            </div>);
    }
}