import React, { Component } from 'react';
import FacebookLogin from 'react-facebook-login'
import {Facebook} from 'fb'

import './App.css';
import 'react-select/dist/react-select.css'

import Select from 'react-select'
import BotSelector from './BotSelector'
import BotConfig from './BotConfig'

const requestPromise = require('request-promise')
const rp = requestPromise.defaults({ json: true })
const fb = new Facebook()

const api_root = 'http://localhost:3001'

class App extends Component {
	constructor() {
		super()

		this.responseFacebook = this.responseFacebook.bind(this)
		// this.formSubmit = this.formSubmit.bind(this)
		this.pageSelect = this.pageSelect.bind(this)
		this.botSelected = this.botSelected.bind(this)
		this.saveBot = this.saveBot.bind(this)
	}

async responseFacebook (res) {
	console.log('=======FB RES', res)
	const accounts = await fb.api('me/accounts', { access_token: res.accessToken })
	// now that I have the pages list
	// user needs to select their page to manage
	const pages = accounts.data
	console.log({pages})

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

	 const botConfig = await rp.get(`${api_root}/config`)
	 console.log({botConfig})
	 this.setState({ botConfig })

	 

	 // const webhook = await rp.post(`https://graph.facebook.com/v2.6/me/subscribed_apps?access_token=${config.access_token}`)
	// console.log({webhook})

 }

async botSelected(config) {
	this.setState({ botSelected: config })
}

async saveBot(config) {
	console.log('heard save bot!', config)
	// is this a new bot or an update?
	const newBot = ''
	const bot = await rp.post({
		url: `${api_root}/bot`,
		body: config
	}) 
}


state = {
	pages: [],
	pageSelectOptions: [],
	pageSelected: false,
	botConfig: []
}

  render() {
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
		options={
			this.state.pages.map(
				(elem) => {return {value: elem.id, label: elem.name}}
			)}
		onChange={this.pageSelect}
		/>
		}
		<BotSelector 
			bots={this.state.botConfig}
			select={this.botSelected}
		/>
		{
			!this.state.botSelected ? null :
			<BotConfig 
				bot={this.state.botSelected || [] }
				save={this.saveBot}
			
			/>
		}
      </div> 
    );
  }
}

export default App;
