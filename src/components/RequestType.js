import React from "react"

export default class RequestType extends React.Component{
    constructor(){
        super();
    }

    render(){
        return(
            <div className="requestSelector">
                <div className="everybody"> Everybody </div>
                <div className="individual"> Individual </div>
            </div>)
    }
}