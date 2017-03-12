import React from "react"

export default class NoUser extends React.Component {
	render() {
		return(
			<div>
				<div className="profilePic noProfile" />
				<div className="usename noName">
					Your Name
				</div>
				<div className="description noDesc" >
					Description
					<div className="no-input"></div>
				</div>
				<div className="wrapPriceBtn">
				<div className="priceRange">
					<div className="range-div">Price Range</div>
					<div className="lowRange">
						<div className="minRange noMinRange" />Low
					</div>
					 - 
					<div className="highRange">
						<div className="maxRange noMaxRange" />High
					</div>
				</div>
				<div className="requestBtn disableReq" >
					Request
				</div>
				</div>
			</div>
		)
	}
}