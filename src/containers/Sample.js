import React from "react"
import ItemSize from "../components/ItemSize"
import ItemRequest from "../components/ItemRequest"

require("../sass/index.scss")

export default class Sample extends React.Component {
	render() {
		return(
			<div className="container">
				<ItemSize />
                <ItemRequest />
			</div>
		)
	}
}