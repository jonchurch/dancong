import React from 'react'

class BotSelector extends React.Component{

	constructor() {
		super() 
		this.clicked = this.clicked.bind(this)
	}

	clicked(e, data) {
		console.log('got clicked')
		this.props.select(data)
	}

	render() {
		return (
			<div className="bot-selector ui column">
				<ul>
			{
				this.props.bots.map((el) => {
				return (
					<li key={el._id}> 
					<a onClick={(e) => this.clicked(e, el)} key={el.name} >{el.name}</a> 
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
