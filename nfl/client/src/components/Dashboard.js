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


  // React function that is called when the page load.
  componentDidMount() {
    // Send an HTTP request to the server.
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
          <ItemButton id={"button-" + teamObj.name} onClick={() => this.showPlayers(teamObj.name)} item={teamObj.name} />
        );

        // Set the state of the teams list to the value returned by the HTTP response from the server.
        this.setState({
          teams: teamDivs
        })
        console.log("checking curr state teams");
        console.log(this.state.teams);
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
              NFL TEAM STATISTICS
            </div>
            <div class="menu">
              <ul>
                 <li>Filter by:</li>
                  <li><a href="#">Players</a></li>
                  <li><a href="#">Teams</a></li>
                  <li><a href="#">Hometowns</a></li>
              </ul>
            </div>
        </nav>
        <div className="jumbotron">
        </div>
        <br></br>
        <div className="container categories-container">
        <div className="col">
          <div className="jumbotron box">
            <div className="h5">Sort Player Stats by Category</div>
            <div className="items-container">
            {this.state.filters.map(filter=> (
            <ItemButton id={"button-" + filter} onClick={() => this.filterBy(filter)} item={filter}/>
            ))}
            </div>
          </div>

          <br></br>
          <div className="jumbotron box">
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