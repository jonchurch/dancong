import React, { Component } from 'react';
import FacebookLogin from 'react-facebook-login'
import {Facebook} from 'fb'

import './App.css';

const fb = new Facebook()

class App extends Component {

async responseFacebook (res) {
	console.log('=======FB RES', res)
	const accounts = await fb.api('me/accounts', { access_token: res.accessToken })
			
	console.log('Pages:',accounts.data.length)
	
}
  render() {
	  console.log(process.env.APP_ID)
    return (
      <div className="App">
		<FacebookLogin
			appId='801527833349607'
			autoLoad={true}
			fields="name,email"
			scope="manage_pages"
			callback={this.responseFacebook} />
		{/* document.getElementById('')	*/}
      </div>
    );
  }
}

export default App;
