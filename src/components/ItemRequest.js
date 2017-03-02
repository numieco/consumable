import React from "react";

export default class ItemRequest extends React.Component{
    constructor(){
        super();
    }
    render(){
        return(
            <div className="category">
                <div className="itemRequest">
                    <div className="singleItem">
                        <input type="checkbox" id="ckbx1" value="Botique" />
                        <label htmlFor="ckbx1">Botique</label>
                    </div>
                    <div className="singleItem">
                        <input type="checkbox" id="ckbx1" value="Botique" />
                        <label htmlFor="ckbx1">Baby Items</label>
                    </div>
                    <div className="singleItem">
                        <input type="checkbox" id="ckbx1" value="Botique" />
                        <label htmlFor="ckbx1">Others</label>
                    </div>

                </div>
                <div className="itemRequestBtn disableReq">
                    Request
                </div>
            </div>);
    }
}