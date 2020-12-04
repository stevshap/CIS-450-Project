import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

export default class ItemButton extends React.Component {
	constructor(props) {
		super(props);

		/* props looks like:
		{
			id
			onClick
			genre
		}
		*/
	}

	render() {
		return (
			<div className="item" id={this.props.id} onClick={this.props.onClick}>
				{this.props.item}
			</div>
		);
	}
}
