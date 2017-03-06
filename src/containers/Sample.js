import React from "react"
import ItemSize from "../components/ItemSize"
import ItemRequest from "../components/ItemRequest"
import ImageBox from "../components/ImageBox"

require("../sass/index.scss")

export default class Sample extends React.Component {
	render() {
		return(
			<div className="container">
				<ItemSize />
                <ItemRequest />
                <div className="image-container">
                <ImageBox />
                <ImageBox />
                <ImageBox />
                </div>
			</div>
		)
	}
}