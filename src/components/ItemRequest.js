import React from "react"
import $ from "jquery"

const items = ["Botique", "Others"]

export default class ItemRequest extends React.Component{
    constructor(){
        super();
        this.state = {
            item : []
        }
        console.log("itemrequest re-renddered")
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
        if(this.props.userType == 'customer'){
            this.props.storeData()
        }
        $("input").prop("checked", false)
        
    }
        

    render(){
        console.log("item req renders")
        return(
            <div className="category">
                <div className="itemRequest">
                    
                    {items.map((item)=> (<div className="singleItem" key={item}>
                                            <input class="reg-checkbox" type="checkbox" id={item} value={item} onChange={() => this.itemChecked(item)} />
                                            <label htmlFor={item}>{item}</label>
                                         </div>))}
                    
                </div>

                {
                    this.props.userType == 'customer'
                    ? <div className="itemRequestBtn" onClick={this.clearState.bind(this)} > Request </div>
                    : (
                        this.props.userType == 'seller'
                        ? <div className="itemRequestBtn" onClick={this.props.showSpecificReq} > Search </div>
                        : <div> </div>
                      )
                }

            </div>
        )
    }
}
