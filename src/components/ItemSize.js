import React from "react";
import ReactDOM from "react-dom";
import $ from "jquery";

const size = ["XS","S","M","L","XL","2XL","None"];

export default class ItemSize extends React.Component{
    constructor(){
        super();
        this.state = {
            size : ""
        }  

    }

    updateSize(sizeSelected){
        this.setState({
            size : sizeSelected
        });
        console.log(this.state.size)
    }

    clearStates = () => {
        this.setState({
            size : ""
        });
        console.log("it enters itemsize")
    }


    render(){
        return(
            <div className="itemSize">
                <div className="itemButtons">
                    {size.map((value) => <Button selectingSize = {() => this.updateSize(value)} key={value} sizeValue={value}/>)}
                </div>
            </div>
            );
    }
}

class Button extends React.Component{

    selected(){
        $(".itemSize button").css({
            "background-color": "white",
            "color": "#609dff"
            });
        console.log("it enters here");
        this.className = "buttonFor"+this.props.sizeValue;
        $("."+this.className).css({
            "background-color": "#609dff",
            "color": "white"
            });
        this.props.selectingSize;
    }
    
    render(){
        // In order change the colour of the button once the request button is clicked
        $(".itemSize button").css({
            "background-color": "white",
            "color": "#609dff"
            });
        return(
            <button className={"buttonFor"+this.props.sizeValue} onClick={() => this.selected()}>{this.props.sizeValue}</button>
             );
    }
}