import React from 'react'

class BotConfig extends React.Component{

	render() {
			console.log(this.props)
		return (
			<div className="ui form">
			{
				this.props.bot.config_keys
					.map((ele) => {
						return(
							<div key={ele.key} className="field">
								<label>{ele.key}</label>
							<input key={ele.key} type="text" name={ele.key} placeholder={ele.value} />
							
							</div>
						)
					})
			}
			</div>
		)
	}

}

export default BotConfig
