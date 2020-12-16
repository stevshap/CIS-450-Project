import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../style/PageNavbar.css';

export default class PageNavbar extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			navDivs: []
		}
	}

	componentDidMount() {
		//const pageList = ['dashboard', 'recommendations', 'bestgenres'];
		const pageList = ['dashboard', 'performance', 'players', 'teams'];
		let navbarDivs = pageList.map((page, i) => {
			if (this.props.active === page) {
				return (
					<a className="nav-item nav-link active" key={i} href={"/" + page}>
						{page.charAt(0).toUpperCase() + page.substring(1, page.length)}
					</a>
				)
			}
			else {
				return (
					<a className="nav-item nav-link" key={i} href={"/" + page}>
						{page.charAt(0).toUpperCase() + page.substring(1, page.length)}
					</a>
				)
			}
		})

		this.setState({
			navDivs: navbarDivs
		});
	}

	render() {
		return (
			<div className="PageNavbar">
				<nav className="navbar navbar-inverse navbar-expand-lg">
				<span className="navbar-brand center"> </span>
				<span className="navbar-brand center"> </span>
					<div class="logo-image">
						<img src="https://upload.wikimedia.org/wikipedia/en/thumb/a/a2/National_Football_League_logo.svg/1200px-National_Football_League_logo.svg.png" class="img-fluid"></img>
					</div>
					<span className="navbar-brand center"> </span>
			      <span className="navbar-brand center">NFL statistics</span>
			      <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
			        <div className="navbar-nav">
			        {this.state.navDivs}
			        </div>
			      </div>
			    </nav>
			</div>
  	);
	}
}