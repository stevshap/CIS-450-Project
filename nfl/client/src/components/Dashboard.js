import React from 'react';
import '../style/Dashboard.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import PageNavbar from './PageNavbar';
import ItemButton from './ItemButton';
import Autocomplete from './Autocomplete';


export default class Dashboard extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      teams:[],
      displayName: "Choose a filter to see dataset",
      displayData: ["_", "_", "_", "_", "_", "_", "_", "_","_", "_", "_", "_", "_", "_", "_","_", "_", "_", "_", "_", "_", "_","_", "_", "_", "_", "_", "_"],
    }

    this.filterByTeams = this.filterByTeams.bind(this);
    this.filterByPlayers = this.filterByPlayers.bind(this);
    this.filterByColleges = this.filterByColleges.bind(this);
    this.filterByHometowns = this.filterByHometowns.bind(this);
    this.showPlayers = this.showPlayers.bind(this);
  }

  filterByTeams() {
    // Send an HTTP request to the server.
    fetch("http://localhost:8081/teams", {
      method: 'GET' // The type of HTTP request.
    })
      .then(res => res.json()) // Convert the response data to a JSON.
      .then(teamList => {
        if (!teamList) return;
        // Map each teamObj in teamList to an HTML element:
        // A button which triggers the showMovies function for each team.
        let teamDivs = teamList.map((teamObj, i) =>
          <ItemButton id={"button-" + teamObj.name} onClick={() => this.showPlayers(teamObj.name)} item={teamObj.name} />
        );

        // Set the state of the teams list to the value returned by the HTTP response from the server.
        this.setState({
          displayName: "NFL Teams",
          displayData: teamDivs
        })
      })
      .catch(err => console.log(err))	// Print the error if there is one.

  }

  filterByPlayers() {
    // Send an HTTP request to the server.
    fetch("http://localhost:8081/players", {
      method: 'GET' // The type of HTTP request.
    })
      .then(res => res.json()) // Convert the response data to a JSON.
      .then(playerList => {
        if (!playerList) return;
        // Map each teamObj in teamList to an HTML element:
        // A button which triggers the showMovies function for each team.
        let playerDivs = playerList.map((playerObj, i) =>
          <ItemButton id={"button-" + playerObj.name} onClick={() => this.showPlayers(playerObj.name)} item={playerObj.name} />
        );

        // Set the state of the teams list to the value returned by the HTTP response from the server.
        this.setState({
          displayName: "NFL Players",
          displayData: playerDivs
        })
      })
      .catch(err => console.log(err))	// Print the error if there is one.

  }


  filterByColleges() {
    // Send an HTTP request to the server.
    fetch("http://localhost:8081/colleges", {
      method: 'GET' // The type of HTTP request.
    })
      .then(res => res.json()) // Convert the response data to a JSON.
      .then(collegeList => {
        if (!collegeList) return;
        // Map each teamObj in teamList to an HTML element:
        // A button which triggers the showMovies function for each team.
        let collegeDivs = collegeList.map((collegeObj, i) =>
          <ItemButton id={"button-" + collegeObj.name} onClick={() => this.showPlayers(collegeObj.name)} item={collegeObj.name} />
        );

        // Set the state of the teams list to the value returned by the HTTP response from the server.
        this.setState({
          displayName: "College Teams",
          displayData: collegeDivs
        })
      })
      .catch(err => console.log(err))	// Print the error if there is one.

  }

  filterByHometowns() {
    // Send an HTTP request to the server.
    fetch("http://localhost:8081/hometowns", {
      method: 'GET' // The type of HTTP request.
    })
      .then(res => res.json()) // Convert the response data to a JSON.
      .then(hometownList => {
        if (!hometownList) return;
        // Map each teamObj in teamList to an HTML element:
        // A button which triggers the showMovies function for each team.
        let hometownDivs = hometownList.map((hometownObj, i) =>
          <ItemButton id={"button-" + hometownObj.name} onClick={() => this.showPlayers(hometownObj.name)} item={hometownObj.name} />
        );

        // Set the state of the teams list to the value returned by the HTTP response from the server.
        this.setState({
          displayName: "NFL Player Hometowns",
          displayData: hometownDivs
        })
      })
      .catch(err => console.log(err))	// Print the error if there is one.

  }

  showPlayers(team) {
  }

  // /playersMostTeamsPlayed

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
        let teamDivs = teamList.map((teamObj, i) =>
          <ItemButton id={"button-" + teamObj.name} onClick={() => this.showPlayers(teamObj.name)} item={teamObj.name} />
        );

        // Set the state of the teams list to the value returned by the HTTP response from the server.
        this.setState({
          displayName: "NFL Teams",
          displayData: teamDivs
        })
      })
      .catch(err => console.log(err))	// Print the error if there is one.


  }


  render() {    
    return (
      <div className="Dashboard">
        <PageNavbar active="dashboard" />
        <br></br>
        <br></br>
        <br></br>
        <div className="container categories-container">
        <div className="row">
        <div class="col-md-4">
          <div className="jumbotron bg-dark box text-white">
            <div className="h5">Choose a Filter: </div>
            <div className="items-container">
            <ItemButton id={"filter-players"} onClick={() => this.filterByPlayers()} item={"Players"}/>
            <ItemButton id={"filter-teams"} onClick={() => this.filterByTeams()} item={"Teams"}/>
            <ItemButton id={"filter-colleges"} onClick={() => this.filterByColleges()} item={"Colleges"}/>
            <ItemButton id={"filter-hometowns"} onClick={() => this.filterByHometowns()} item={"Hometowns"}/>
            </div>
          </div>
          </div>
          <div class="col-md-8">
          <div className="jumbotron">
            <div className="h5">{this.state.displayName}</div>
              <div className="items-container">
              {this.state.displayData}
              </div>
            </div>
          </div>
          </div>
          </div>
        </div>
    );
  }
}