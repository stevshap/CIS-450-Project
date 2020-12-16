import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

export default class PlayerRow extends React.Component {
	constructor(props) {
		super(props);
	}

	render() {
		return (
			<div className="playerResults">
				<div className="name">{this.props.name}</div>
				<div className="value">{this.props.value}</div>
			</div>
		);
	}
}
