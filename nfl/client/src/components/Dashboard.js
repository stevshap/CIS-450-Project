import React from 'react';
import '../style/Dashboard.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import PageNavbar from './PageNavbar';
import ItemButton from './ItemButton';


export default class Dashboard extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      filters:["Player History", "Season", "Play Stats", "NFL Teams", "College Teams", "Hometown"],
      teams:[]
    }

    this.filterBy = this.filterBy.bind(this);
    this.showPlayers = this.showPlayers.bind(this);
  }

  filterBy(filter) {
  }

  showPlayers(team) {
  }

  // /playersMostTeamsPlayed

  // React function that is called when the page load.
  componentDidMount() {
    // Send an HTTP request to the server.
    console.log("jkkhk");
    fetch("http://localhost:8081/teams", {
      method: 'GET' // The type of HTTP request.
    })
      .then(res => res.json()) // Convert the response data to a JSON.
      .then(teamList => {
        if (!teamList) return;
        // Map each teamObj in teamList to an HTML element:
        // A button which triggers the showMovies function for each team.
        console.log("checking teamList");
        console.log(teamList);
        let teamDivs = teamList.map((teamObj, i) =>
          <ItemButton id={"button-" + teamObj.nickname} onClick={() => this.showPlayers(teamObj.nickname)} item={teamObj.nickname} />
        );

        // Set the state of the teams list to the value returned by the HTTP response from the server.
        this.setState({
          teams: teamDivs
        })
        console.log("checking curr state teams");
        //console.log(this.state.teams);
      })
      .catch(err => console.log(err))	// Print the error if there is one.
  }


  render() {    
    return (
      <div className="Dashboard">
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
                  <li><a href="#">Players</a></li>
                  <li><a href="#">Teams</a></li>
                  <li><a href="#">Hometowns</a></li>
              </ul>
            </div>
        </nav>

        <br></br>
        <br></br>
        <br></br>
        <br></br>
        <br></br>
        <br></br>
        <br></br>
        <div className="container categories-container">
        <div className="col">
          <div className="jumbotron bg-dark box text-white">
            <div className="h5">Sort Player Stats by Category</div>
            <div className="items-container">
            {this.state.filters.map(filter=> (
            <ItemButton id={"button-" + filter} onClick={() => this.filterBy(filter)} item={filter}/>
            ))}
            </div>
          </div>

          <br></br>
          <div className="jumbotron bg-dark box text-white">
            <div className="h5">View Stats by Team</div>
              <div className="items-container">
              {this.state.teams}
              </div>
              </div>
          </div>
        </div>
      </div>
    );
  }
}