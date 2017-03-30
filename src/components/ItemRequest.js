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
        var index = this.selectedItems.indexOf(itmselectd)

        if (index !== -1) {
            this.selectedItems.splice(index, 1)
            this.setState({
                item : this.selectedItems
            }, ()=> {
                this.props.returnCategory(this.state.item)
            })
            
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
        this.setState({
            item : ""
        })
        this.setState({resetChkBoxVal : true})
        if(this.props.userType == 'customer'){
            this.props.storeData()
        }else if(this.props.userType == 'seller'){
            this.props.showSpecificReq()
        }
        
    }

    render(){
        return(
            <div className="category">
                <div className="itemRequest">
                    {items.map((item)=> <Checkbox resetValue={this.state.resetChkBoxVal} label={item} key={item} toggleCheckBox={() => this.itemChecked(item)} />)}
                    
                </div>

                {
                    this.props.userType == 'customer'
                    ? <div className="itemRequestBtn" onClick={this.clearState.bind(this)} > Request </div>
                    : (
                        this.props.userType == 'seller'
                        ? <div className="itemRequestBtn" onClick={this.clearState.bind(this)} > Search </div>
                        : <div> </div>
                      )
                }

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