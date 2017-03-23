import React from "react";

export default class ImageBox extends React.Component{
    constructor(){
        super()
        this.setState({
            name : "",
            image : "",
            price : ""
        })
    }
    render(){
        return(
            <div className="imageBox">
                <div className="close-btn">
                    x
                </div>
                <div className="personName">
                    Hello
                    {this.state.name}
                </div>
                <div className="boxImage">
                    <img src={this.state.image} alt="image" />
                </div>
                <div className="footer">
                    <div className="footer-price">
                        {this.state.price}
                    </div>
                    <div className="accept-btn" onClick=#>
                        Accept
                    </div>
                </div>
            </div>);
    }
}