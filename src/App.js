import React, { Component } from 'react';
import FacebookLogin from 'react-facebook-login'
import FB from 'fb'

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
			autoLoad={false}
			fields="name,email"
			scope="manage_pages"
			callback={this.responseFacebook} />
		{/* document.getElementById('')	*/}
      </div>
    );
  }
}

export default App;
