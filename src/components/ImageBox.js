import React from "react";

export default class ImageBox extends React.Component{
    constructor(){
        super()
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
                    <div className="accept-btn">
                        Accept
                    </div>
                </div>
            </div>);
    }
}