import React from 'react'

class BotSelector extends React.Component{

	render() {
		return (
			<div className="bot-selector ui column">
				<ul>
			{
				this.props.bots.map((el) => {
				return (
					<li key={el._id}> 
					<a onClick={(e) => this.props.select(e)} key={el.name} >{el.name}</a> 
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
