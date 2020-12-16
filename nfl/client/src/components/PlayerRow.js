import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

export default class PlayerRow extends React.Component {
	constructor(props) {
		super(props);
	}

	render() {
		return (
			<div className="playerResults row">
				<div className="col-md-6">
				<div className="name">{this.props.name}</div>
				</div>
				<div className="col-md-6">
				<div className="value">{this.props.value}</div>
				</div>
				<br></br>
			</div>
		);
	}
}
