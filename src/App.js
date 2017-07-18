import React, { Component } from 'react';
import FacebookLogin from 'react-facebook-login'
import {Facebook} from 'fb'

import './App.css';

const fb = new Facebook()

class App extends Component {
	constructor() {
		super()

		this.responseFacebook = this.responseFacebook.bind(this)
	}

async responseFacebook (res) {
	console.log('=======FB RES', res)
	const accounts = await fb.api('me/accounts', { access_token: res.accessToken })
	// now that I have the pages list
	// user needs to select their page to manage
	const pages = accounts.data
	this.setState({ pages })
	
}

state = {
	pages: []
}
  render() {
    return (
      <div className="App">
		<FacebookLogin
			appId='801527833349607'
			autoLoad={true}
			fields="name,email"
			scope="manage_pages"
			callback={this.responseFacebook} />
		<div className="page-selector">
			<form>
			<select name="page">
				{
					this.state.pages.map((val) => {
							return (
							<option key={val.id} value={val.id}>{val.name}</option>
						)
					})
				}
			
				
		</select>
		
			</form>
		</div>
      </div>
    );
  }
}

export default App;
