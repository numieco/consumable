import React from "react";

const items = ["Botique", "Others"];

export default class ItemRequest extends React.Component{
    constructor(){
        super();
        this.state = {
            item : [],
            resetChkBoxVal : false
        }
        // this.itemChecked = this.itemChecked.bind(this)
    }
    
    componentWillMount(){
        this.selectedItems = [];
    }

    itemChecked(itmselectd){
        if (this.selectedItems.indexOf(itmselectd) !== -1) {
            this.selectedItems.pop(itmselectd)
        } else {
            this.selectedItems.push(itmselectd)
            this.setState({
                item : this.selectedItems
            }, () => {
                console.log('this.state.item')
                console.log(this.state.item) 
                this.props.returnCategory(this.state.item)
            })
        }

    }

    clearState(){
        let item = this.state.item;
        console.log("the item is "+item)
        this.setState({
            item : ""
        })
        this.setState({resetChkBoxVal : true})
        this.props.storeData(item)
    }

    render(){
        return(
            <div className="category">
                <div className="itemRequest">
                    {items.map((item)=> <Checkbox resetValue={this.state.resetChkBoxVal} label={item} key={item} toggleCheckBox={() => this.itemChecked(item)} />)}
                    
                </div>
                <div className="itemRequestBtn" onClick={this.clearState.bind(this)}>
                    {(this.props.userType == 'customer') ? 'Request' : 'Search'}
                </div>
            </div>
        )
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
        this.props.toggleCheckBox()
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