import React, { Component } from 'react';
import FacebookLogin from 'react-facebook-login'
import {Facebook} from 'fb'

import './App.css';
import 'react-select/dist/react-select.css'

import Select from 'react-select'
import BotSelector from './BotSelector'

const rp = require('request-promise')
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

 async pageSelect(e) {
	 console.log(e)

	 const page = this.state.pages.find((ele) => ele.id == e.value)
	 console.log(this.state.pages)

	 // here is the config to make the subscribe call!
	 const config = {
		 id: page.id,
		 name: page.name,
		 access_token: page.access_token
	 }

	 this.setState({ pageSelected: config })

	 // const webhook = await rp.post(`https://graph.facebook.com/v2.6/me/subscribed_apps?access_token=${config.access_token}`)
	// console.log({webhook})

 }


state = {
	pages: [],
	selectOptions: [],
	pageSelected: false
}

  render() {
	  console.log(this.state)
    return (
      <div className="App">
		<FacebookLogin
			appId='801527833349607'
			autoLoad={true}
			fields="name,email"
			scope="manage_pages,pages_messaging"
			callback={this.responseFacebook} />
		{ 
			this.state.pageSelected ? <p>You selected {this.state.pageSelected.name}</p> : <Select
		name="Select Page"
		value="Pages"
		options={this.state.selectOptions}
		onChange={this.pageSelect}
		/>
		}
		<BotSelector bots={[{name: 'Pizza Bot'}]}/>
      </div> 
    );
  }
}

export default App;
