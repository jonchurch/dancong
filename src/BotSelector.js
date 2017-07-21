import React from 'react'

class BotSelector extends React.Component{

	constructor() {
		super() 
		this.botClick = this.botClick.bind(this)
	}

	botClick(e) {
		e.preventDefault()

		console.log({e})

	}

	componentWillMount() {
	}

	render() {
		return (
			<div className="bot-selector ui column">
				<ul>
			{
				this.props.bots.map((el) => {
				return (
					<li key={el._id}> 
					<a onClick={(e) => this.botClick(e)} key={el.name} >{el.name}</a> 
					</li>
				)
				} )
			}
			</ul>
			</div>
		)
	}

}

export default BotSelector
