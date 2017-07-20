import React from 'react'


class PageSelector extends React.Component{
	constructor() {
		super() 

		this.selectPages = this.selectPages.bind(this)
	}

	async selectPage(e) {
		e.preventDefault()
		console.log({e})
	}

	render() {
		return (
		<div className="page-selector" />
			<form onSubmit={(e) => this.selectPage(e)} />
			<select ref={(input) => this.page = input } name="page" />
				{
					this.props.pages.map((val) => {
							return (
							<option key={val.id} value={val.id}>{val.name}</option>
						)
					})
				}
		</select>
			<input type="submit" value="Submit" />
			</form>
		</div>
		)
	}

}

export default PageSelector
