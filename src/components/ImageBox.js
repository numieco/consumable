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
                    Hello
                    {this.props.sellerTitle}
                </div>
                <div className="boxImage">
                    <img src={this.props.sellerImage} alt="image" />
                </div>
                <div className="footer">
                    <div className="footer-price">
                        {this.props.sellerprice}
                    </div>
                    <div className="accept-btn">
                        Accept
                    </div>
                </div>
            </div>);
    }
}