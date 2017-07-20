import React from 'react'


class PageSelector extends React.Component{

	render() {
		return (
		<div className="page-selector">
			<form>
			<select name="page">
				{
					this.props.pages.map((val) => {
							return (
							<option key={val.id} value={val.id}>{val.name}</option>
						)
					})
				}
			
				
		</select>
		
			</form>
		</div>
		)
	}

}

export default PageSelector
