import React, { Component } from 'react';
import FacebookLogin from 'react-facebook-login'
// import {Facebook} from 'fb'

import './App.css';
import 'react-select/dist/react-select.css'

import Select from 'react-select'
import BotSelector from './BotSelector'
import BotConfig from './BotConfig'

const requestPromise = require('request-promise')
const rp = requestPromise.defaults({ json: true })
// const fb = new Facebook()

const api_root = 'http://localhost:3001'

class App extends Component {
	constructor() {
		super()

		this.responseFacebook = this.responseFacebook.bind(this)
		this.pageSelect = this.pageSelect.bind(this)
		this.botSelected = this.botSelected.bind(this)
		this.saveBot = this.saveBot.bind(this)
	}

async responseFacebook (res) {
	console.log('=======FB RES', res)
	// exchange shortlived token for longlived
	const token = await rp.post({
		url: `${api_root}/token`,
		body: {token: res.accessToken}
	})
	
	// const accounts = await fb.api('me/accounts', { access_token: token.access_token})
	const accounts = await rp.get(`https://graph.facebook.com/v2.6/me/accounts?access_token=${token.access_token}`)
	// now that I have the pages list
	// user needs to select their page to manage
	const pages = accounts.data

	this.setState({ pages })
	
}

 async pageSelect(e) {

	 const page = this.state.pages.find((ele) => ele.id == e.value)
	 let pageRec = await rp.get(`${api_root}/page/${page.id}`)

	 if (! pageRec) {
			pageRec = {
			id: page.id,
			name: page.name,
			access_token: page.access_token,
			bots: []
		}
	 }

	 this.setState({ pageSelected: pageRec })

	 const botConfig = await rp.get(`${api_root}/config`)
	 this.setState({ botConfig })

 }

async botSelected(config) {
	
	const pageBot = this.state.pageSelected.bots.find((ele) => ele.name === config.name)

	// populate the form with either empty config or our page's saved config
	this.setState({ botSelected: pageBot ? pageBot : config })
}

async saveBot(config) {
	// create page if it doesnt exist already
	const page = await rp.post({
		url: `${api_root}/page/${this.state.pageSelected.id}`,
		body: this.state.pageSelected
	})

	// save the bot config
	const bot = await rp.post({
		url: `${api_root}/bot/${this.state.pageSelected.id}`,
		body: config
	}) 

	const access_token = this.state.pageSelected.access_token
	const subscribe = await rp.post({
		url: `https://graph.facebook.com/v2.6/me/subscribed_apps?access_token=${access_token}`
	})
		if (subscribe) {
			this.success.hidden = false
			setTimeout(() => this.success.hidden = true, 3000)
		}
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
			autoLoad={false}
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

			<div hidden="true" ref={i => this.success = i} id="success">
				<p>Saved bot!</p>
			</div>
      </div> 
    );
  }
}

export default App;