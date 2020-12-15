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
		const pageList = ['performance', 'players', 'teams'];
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
			<nav>
				<div class="menu-icon">
				  <i class="fa fa-bars fa-2x"></i>
				</div>
				<div class="logo">
				  <img width="10%" src="https://upload.wikimedia.org/wikipedia/en/thumb/a/a2/National_Football_League_logo.svg/1200px-National_Football_League_logo.svg.png" class="img-fluid"></img>
				</div>
				<div class="menu">
				  <ul>
					 <li>Filter NFL statistics by:</li>
					  <li><div className="nav-item nav-link active" key={"players"} href="/PlayersPage">Players</div></li>
					  <li><a href="#">Teams</a></li>
					  <li><a href="#">Hometowns</a></li>
				  </ul>
				</div>
			</nav>
  	);
	}
}