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
				<ul>
			{
				this.props.bots.map((el) => {
				return (
					<div key={el.id}>
					<li key={el.id}> 
					<a onClick={(e) => this.botClick(e) } key={el.id} >{el.name}</a> 
					</li>
					</div>
				)
				} )
			}
			</ul>
			</div>
		)
	}

}

export default BotSelector
