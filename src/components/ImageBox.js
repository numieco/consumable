import React from "react";

export default class ImageBox extends React.Component{
    render(){
        return(
            <div className="imageBox">
                <div className="close-btn">
                    x
                </div>
                <div className="personName">
                    Hello
                    {this.props.personName}
                </div>
                <div className="boxImage">
                    <img src="http://placehold.it/350x150" alt="image" />
                </div>
                <div className="footer">
                    <div className="footer-price">
                        {this.props.price}
                    </div>
                    <div className="accept-btn">
                        Accept
                    </div>
                </div>
            </div>);
    }
}