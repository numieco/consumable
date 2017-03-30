import React from "react"
import SingleRequest from "../components/SingleRequest"
import Auth from '../server/auth/authUserCheck'
import $ from "jquery"

let socket = io.connect()
let returnedResults = []

export default class AllRequest extends React.Component {

	constructor(props) {
		super(props)

		this.state = {
			allReq: '',
            sellerEmail: '',
            everyoneReq : true,
            invidualReq : false,
            sellerSearch : false
		}

		this.refreshData = this.refreshData.bind(this)
        
	}

	componentDidMount() {
		this.refreshData()

            console.log("going here")


        if(Auth.isUserAuthenticated() 
            && localStorage.getItem('userType') === 'seller') {

            this.setState({

                sellerEmail: localStorage.getItem('sellerEmail')

            }, () => localStorage.removeItem('sellerEmail'))
        }
	}

	refreshData = () => {

		const xhr = new XMLHttpRequest()
		xhr.open('post', '/allRecords')
		xhr.setRequestHeader('Content-type', 'application/json')
		xhr.responseType = 'json'
		xhr.addEventListener('load', () => {
			if(xhr.status === 200) {
				this.setState({
  					allReq: xhr.response
  				})
			} else {
				console.log(xhr.response.error)
			}
		})
		xhr.send()
	}

    everyoneRequest = () => {
        // if everone tab is clicked, it sets the corresponding varible to true 
        this.setState({
            everyoneReq : true,
            invidualReq : false
        })

        // changing the color inorder show it is selected
        $(".everybody").css({
            "color" : "#609dff",
            "border-color" : "#609dff"
        })

        $(".individual").css({
            "color" : "black",
            "border-color" : "black"
        })
    }

    individualRequest = () => {
        // if individual tab is clicked, it sets the corresponding varible to true
        this.setState({
            invidualReq : true,
            everyoneReq : false
        }) 

        // changing the color inorder show it is selected
        $(".individual").css({
            "color" : "#609dff",
            "border-color" : "#609dff"
        })

        $(".everybody").css({
            "color" : "black",
            "border-color" : "black"
        })
    }

    sellerSearchedData (searchText, category){
        console.log("searchText" + searchText + "category" + category)
        socket.emit('searchedWords', {searchText : searchText, category : category})
        socket.on('searchresults', (data) => {
            console.log(data)
            data.forEach((item) =>{
                returnedResults.push(item)
            })
            console.log(returnedResults)
            this.setState({
                sellerSearch : true
            })
        })


    }
	render() {
        // checking if the everyone tab is clicked or individual tab is clicked. If everyone is true then all the request is listed 
        // else if individual is true only the request made by current user is listed
    	if (this.state.allReq) {
            let list
            if (this.state.everyoneReq) {
        		list = this.state.allReq.requests.map((data, i) => {
                    if(this.state.sellerSearch){
                        let searchList = returnedResults.map((item) => {
                                    if(item._id == data._id){
                                        return (
                                            <div key={i}> 
                                                <SingleRequest 
                                                    photo={ data.photo } 
                                                    name={ data.name } 
                                                    desc={ data.itemDesc } 
                                                    min={ data.min }
                                                    max={ data.max }
                                                    size={ data.size}
                                                    timestamp={ data.timestamp }
                                                    email={ data.email }
                                                    key={ i }
                                                    details={ this.props.details }
                                                    sellerEmail={ this.state.sellerEmail }
                                                /> 
                                            </div>
                                        )
                                    }
                                })
                        return searchList

                    }else {
                        return (
                            <div key={i}> 
                                <SingleRequest 
                                    photo={ data.photo } 
                                    name={ data.name } 
                                    desc={ data.itemDesc } 
                                    min={ data.min }
                                    max={ data.max }
                                    size={ data.size}
                                    timestamp={ data.timestamp }
                                    email={ data.email }
                                    key={ i }
                                    details={ this.props.details }
                                    sellerEmail={ this.state.sellerEmail }
                                /> 
                            </div>
                        )
                    }	
        		}).reverse()

            } else if (this.state.invidualReq) {
                list = this.state.allReq.requests.map((data, i) => {
                    if (data.email == this.props.details.email) {
                        return (
                            <div key={i}> 
                                <SingleRequest 
                                    individual= "true"
                                    seller={data.sellers}
                                    photo={ data.photo } 
                                    name={ data.name } 
                                    desc={ data.itemDesc } 
                                    min={ data.min }
                                    max={ data.max }
                                    size={ data.size }
                                    timestamp={ data.timestamp }
                                    email={ data.email }
                                    key={ i }
                                    details={ this.props.details }
                                    sellerEmail={ this.state.sellerEmail }
                                /> 
                            </div>
                        ) 
                    }
                }).reverse()
            }
    		return (
                <div>
                {(Auth.isUserAuthenticated() && localStorage.getItem('userType') === 'seller') ?
                    <span> </span> : 
                    <div className="requestSelector">
                        <div className="everybody" onClick={this.everyoneRequest.bind(this)}> Everyone </div>
                        <div className="individual" onClick={this.individualRequest.bind(this)}> Individual </div>
                    </div>
                }
    			<div className="list-requests">{list}</div>
                </div>
    		)
    	}
    	else {
    		return(
    			<div> no data </div>
    		)
    	}
	}
}