import React, { Component } from 'react';
import FacebookLogin from 'react-facebook-login'
import {Facebook} from 'fb'

import './App.css';
import 'react-select/dist/react-select.css'

import Select from 'react-select'

const fb = new Facebook()

class App extends Component {
	constructor() {
		super()

		this.responseFacebook = this.responseFacebook.bind(this)
		// this.formSubmit = this.formSubmit.bind(this)
		this.pageSelect = this.pageSelect.bind(this)
	}

async responseFacebook (res) {
	console.log('=======FB RES', res)
	const accounts = await fb.api('me/accounts', { access_token: res.accessToken })
	// now that I have the pages list
	// user needs to select their page to manage
	const pages = accounts.data
	console.log({pages})

	const selectOptions = accounts.data.map((elem) => {
		return {value: elem.id, label: elem.name} 
	})
	this.setState({ selectOptions })

	this.setState({ pages })
	
}

 pageSelect(e) {
	 console.log(e)
 }


state = {
	pages: [],
	selectOptions: []
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
		<Select
		name="Select Page"
		value="Pages"
		options={this.state.selectOptions}
		onChange={this.pageSelect}
		/>
      </div>
    );
  }
}

export default App;
