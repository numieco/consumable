import React from "react";
import ReactDOM from "react-dom";
import $ from "jquery";

export default class ItemSize extends React.Component{
    constructor(){
        super();
        this.state = {
            size : null,
            isSelected : false
        }
    }

    updateSize(sizeSelected, value){
        this.setState({
            size : sizeSelected,
            isSelected : true
        });
    }


    render(){
        return(
            <div className="itemSize">
                <Button selected={this.updateSize.bind(this,"XS",1)}>XS</Button>
                <Button selected={this.updateSize.bind(this,"S",2)}>S</Button>
                <Button selected={this.updateSize.bind(this,"M",3)}>M</Button>
                <Button selected={this.updateSize.bind(this,"L",4)}>L</Button>
                <Button selected={this.updateSize.bind(this,"XL",5)}>XL</Button>
                <Button selected={this.updateSize.bind(this,"2XL",6)}>2XL</Button>
                <Button selected={this.updateSize.bind(this,"None",7)}>None</Button>
            </div>
            );
    }
}

class Button extends React.Component{
    
    render(){
        return(
            <button onClick={this.selected}>{this.props.children}</button>
             );
    }
}