import React from 'react'
import { DidYouBuy, KeepPosted } from './Popups'

let socket = io.connect()

export default class ImageBox extends React.Component{
    constructor (props) {
        super(props)

        this.state = {
            hide: false,
            inProcess: props.inProcess,
            offerStatus: props.offers.offerStatus
        }

        this.acceptOffer = this.acceptOffer.bind(this)
        this.deleteOffer = this.deleteOffer.bind(this)
    }

    acceptOffer = () => {
        if (this.props.offers.link) {
            socket.emit('pendingToInProcess', {
                timestamp: this.props.requestTime, 
                email: this.props.customerEmail, 
                offerTime: this.props.offers.offerTime,
                sellerEmail: this.props.offers.sellerEmail
            })

            window.location.assign(this.props.offers.link)
        }
    }

    deleteOffer = () => {
        socket.emit('deleteSellerOffer', {
            requestTime: this.props.requestTime, 
            offerTime: this.props.offers.offerTime
        })
        this.setState({ hide: true })
    }

    render(){
        return(
            <div className={ this.state.hide ? 'display-none' : 'imageBox' }>
                <div className="close-btn" onClick={ this.deleteOffer }>
                    x
                </div>
                <div className="personName">
                    {this.props.offers.sellerName}
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
                          ? <div className='rejected-button red-btn'> Rejected </div>
                          : this.state.offerStatus === 'accepted'
                            ? <div className="accept-btn green-btn"> Accepted </div>
                            : <div className="accept-btn" onClick={ this.acceptOffer }> Accept </div>)
                    }

                </div>

                {
                    this.state.inProcess 
                    ? 
                        <DidYouBuy 
                        data={this.props} 
                        changeInProcess={ () => {this.setState({ inProcess : false }) }} 
                        changeStatusToRejected={ () => { this.setState({ offerStatus: 'rejected' }) } }
                        changeStatusToAccepted={ () => { this.setState({ offerStatus: 'accepted' }) } }
                        /> 
                    : <div />
                }
            </div>
        )
    }
}