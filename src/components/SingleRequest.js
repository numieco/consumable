import React from "react"

export default class SingleRequest extends React.Component {
	
	constructor(props) {
		super(props)
	}

	render() {
		return(
			<div className="singleReq">
				<div className="singlePhoto">
					<img src={this.props.photo} alt={this.props.photo} />
				</div>
				<div className="singleName">
					{this.props.name}
				</div>
				<div className="singleDesc">
					{this.props.desc}
				</div>
				<div className="singleRange">
					${this.props.min} - ${this.props.max}
				</div>
				<div className="requestBtn connectBtn">
					Connect
				</div>
			</div>
		)
	}
}