import React from 'react'
import ReactDOM, { render } from 'react-dom'
import { Router, Route, hashHistory } from 'react-router'

import Home from './containers/Home.jsx'
import Sample from './containers/Sample'
import Login from './containers/Login.jsx'
import Signup from './containers/Signup.jsx'
import BasePage from './components/BasePage.jsx'


class Root extends React.Component {
	render() {
		return(
			<Router history={ hashHistory }>

				<Route path='/' component={ Home } />
				<Route path='/login' component={ Login } />
				<Route path='/signup' component={ Signup } />		
				<Route path='/sample' component={ Sample } />			
			</Router>
		)
	}
}

ReactDOM.render(<Root />, document.getElementById('app'))