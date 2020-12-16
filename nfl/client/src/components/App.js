import React from 'react';
import {
	BrowserRouter as Router,
	Route,
	Switch
} from 'react-router-dom';
import Dashboard from './Dashboard';
import Players from './Players';
import Teams from './Teams';

export default class App extends React.Component {

	render() {
		return (
			<div className="App">
				<Router>
					<Switch>
						<Route
							exact
							path="/"
							render={() => (
								<Dashboard />
							)}
						/>
						<Route
							exact
							path="/dashboard"
							render={() => (
								<Dashboard />
							)}
						/>
			
						<Route
							path="/players"
							render={() => (
								<Players />
							)}
						/>
						<Route
							path="/teams"
							render={() => (
								<Teams />
							)}
						/>
							
					</Switch>
				</Router>
			</div>
		);
	}
}