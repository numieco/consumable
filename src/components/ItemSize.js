import React from "react"
import ReactDOM from "react-dom"
import $ from "jquery"

const size = ["XS","S","M","L","XL","2XL","None"]

export default class ItemSize extends React.Component{
    constructor(props){
        super(props)
        this.state = {
            size : "",
            static: this.props.staticSize ? true : false
        }  
        this.clearStates.bind(this)

        console.log(this.props.staticSize)
    }

    componentWillMount () {
        //if(this.props.staticSize)
    }
    
    componentWillReceiveProps(nextProps){
        if(nextProps == this.props.staticSize){
            let sizeSelected = nextProps.staticSize
            updateSize(sizeSelected)
            let className = "buttonFor"+sizeSelected
            $("."+className).css({
                "background-color": "#609dff",
                "color": "white"
            });
        }
    }


    updateSize(sizeSelected){
        this.setState({
            size : sizeSelected
        });
        console.log("It enters the updateSize fn" + sizeSelected)

        this.props.returnSize(sizeSelected)
    }

    clearStates = () => {
        this.setState({
            size : ""
        });
        // In order change the colour of the button once the request button is clicked
        $(".itemSize button").css({
            "background-color": "white",
            "color": "#609dff"
        })
    }


    render(){
        return(
            <div className="itemSize">
                <div className="itemButtons">
                    {size.map((value) => <Button static={ value == this.props.staticSize ? true : false } selectingSize = {() => this.updateSize(value)} key={value} sizeValue={value}/>)}
                </div>
            </div>
        )
    }
}

class Button extends React.Component{

    constructor (props) {
        super (props)
        console.log(this.props.static)
        console.log('this.props.static')

    }

    selected(){
        console.log("it reaches here")
        if ( localStorage.getItem('userType') !== 'seller' ) {
            $(".itemSize button").css({
                "background-color": "white",
                "color": "#609dff"
            })
            this.className = "buttonFor"+this.props.sizeValue;
            $("."+this.className).css({
                "background-color": "#609dff",
                "color": "white"
            })
            this.props.selectingSize()
        }
    }
    
    render(){
        
        return(
            <button className={ this.props.static ? ("staticButton buttonFor"+this.props.sizeValue) : ("buttonFor"+this.props.sizeValue)} onClick={() => this.selected()}>{this.props.sizeValue}</button>
        )
    }
}
