import React from "react";

const items = ["Botique","Baby Items", "Others"];

export default class ItemRequest extends React.Component{
    constructor(){
        super();
        console.log(items);
        this.state = {
            item : "",
            resetChkBoxVal : false
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

    clearState(){
        this.setState({
            item : ""
        });
        this.setState({resetChkBoxVal : true})
        this.props.storeData(this.state.item)
    }

    render(){
        return(
            <div className="category">
                <div className="itemRequest">
                    {items.map((item)=> <Checkbox resetValue={this.state.resetChkBoxVal} label={item} key={item} toggleCheckBox={() => this.itemChecked(item)} />)}
                    
                </div>
                <div className="itemRequestBtn" onClick={this.clearState.bind(this)}>
                    Request
                </div>
            </div>);
    }
}

class Checkbox extends React.Component{
    constructor(){
        super();
        this.state = {
            isChecked : false
        }
    }

    changeChkState(){
        this.setState({
            isChecked : !(this.state.isChecked)
        });
        this.props.toggleCheckBox
    }

    componentWillReceiveProps(nextProps){
        if(nextProps.resetValue == true){
            this.setState({
                isChecked : false
            });
        }
        

    }
    render(){
       
        return(
            <div className="singleItem">
                <input type="checkbox" id={this.props.label} value={this.props.label} checked={this.state.isChecked} onChange={this.changeChkState.bind(this)} />
                <label htmlFor={this.props.label}>{this.props.label}</label>
            </div>);
    }
}