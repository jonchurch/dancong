import React, { Component } from 'react';

import FacebookLogin from 'react-facebook-login'

import './App.css';

const responseFacebook = (res) => {
	console.log('=======FB RES', res)
}

class App extends Component {
  render() {
    return (
      <div className="App">
		<FacebokLogin
			appId=process.env.APP_ID
			autoLoad={true}
			fields="name,email,manage_pages"
			callback={responseFacebook} />
		{/* document.getElementById('')	*/}
      </div>
    );
  }
}

export default App;
