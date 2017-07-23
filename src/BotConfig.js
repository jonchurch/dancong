import React from 'react'

class BotConfig extends React.Component{
	constructor() {
		super()
		this.formSubmit = this.formSubmit.bind(this)
	}
	
	formSubmit(e) {
		// on submit I need to get the data from the form
		// then post it to the server
		e.preventDefault()
		// const form = Object.keys(this.configForm.elements)//.splice(-1,1)
		const formArr = [... this.configForm.getElementsByClassName("config")]
		// const active = this.configForm.getElementsByClassName("active").checked
		const active = this.checkbox.checked
		const config = {
			_id: this.props.bot._id,
			name: this.props.bot.name,
			desc: this.props.bot.desc,
			active: active,
			config_keys: formArr.map((ele) => {return {key: ele.name, value: ele.value}})
		}
		this.props.save(config)
	}

	render() {
		return (
			<div className="ui form" >
			<form 
			ref={(input) => this.configForm = input} 
			onSubmit={(e) => this.formSubmit(e)}
			>
			<div className="ui checkbox">
				<input ref={(el) => this.checkbox = el} id="active" type="checkbox" name="active" defaultChecked={this.props.bot.active} />
				<label>Active</label>
			</div>
			{
				this.props.bot.config_keys
					.map((ele) => {
						console.log({ele})
						return(
							<div key={ele.key} className="field">
								<label>{ele.key}</label>
							<input key={ele.key} className="config" type="text" name={ele.key} defaultValue={ele.value} />
							</div>
						)
					})
			}
			<button className="ui button" type="submit">Save</button>
			</form>
			</div>
		)
	}

}

export default BotConfig
