import React from 'react'

class BotSelector extends React.Component{

	constructor() {
		super() 
		this.click = this.botClick.bind(this)
	}

	botClick(e) {
		e.preventDefault()
		console.log({e})

	}

	render() {
		return (
			<div className="bot-selector ui column">
			{
				this.props.bots.map((el) => {
				return (
					<a onClick={(e) => this.botClick(e) }>{el.name}</a>
				)
				} )
			}
			</div>
		)
	}

}

export default BotSelector
