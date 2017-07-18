import React, { Component } from 'react';

import FacebookLogin from 'react-facebook-login'

import './App.css';


class App extends Component {


responseFacebook (res) {
	console.log('=======FB RES', res)
}
  render() {
	  console.log(process.env.APP_ID)
    return (
      <div className="App">
		<FacebookLogin
			appId='801527833349607'
			autoLoad
			fields="name,email"
			scope="manage_pages"
			callback={this.responseFacebook} />
		{/* document.getElementById('')	*/}
      </div>
    );
  }
}

export default App;
