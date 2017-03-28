import React from "react";

export default class ImageBox extends React.Component{
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
                    <img src="image" alt="image" />
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