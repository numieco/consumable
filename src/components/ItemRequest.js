import React from "react";

const items = ["Botique","Baby Items", "Others"];

export default class ItemRequest extends React.Component{
    constructor(){
        super();
        console.log(items);
        this.state = {
            item : ""
        }
    }
    
    componentWillMount(){
        this.selectedItems = new Set();
    }

    itemChecked(itmselectd){
        if(this.selectedItems.has(itmselectd)){
            this.selectedItems.delete(itmselectd);
        }else{
            this.selectedItems.add(itmselectd);
            this.setState({
                item : itmselectd
            });
        }
        console.dir(this.selectedItems); 

    }

    render(){
        return(
            <div className="category">
                <div className="itemRequest">
                    {items.map((item)=> <Checkbox label={item} key={item} toggleCheckBox={() => this.itemChecked(item)} />)}
                    
                </div>
                <div className="itemRequestBtn">
                    Request
                </div>
            </div>);
    }
}

class Checkbox extends React.Component{


    render(){
        return(
            <div className="singleItem">
                <input type="checkbox" id={this.props.label} value={this.props.label} onChange={this.props.toggleCheckBox} />
                <label htmlFor={this.props.label}>{this.props.label}</label>
            </div>);
    }
}