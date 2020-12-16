import React from 'react';
import '../style/Dashboard.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import PageNavbar from './PageNavbar';
import ItemButton from './ItemButton';


export default class Teams extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      displayData: [],
    }

    this.playersMostRushesExecuted = this.playersMostRushesExecuted.bind(this);
  }

  playersMostRushesExecuted() {
    // Send an HTTP request to the server.
    fetch("http://localhost:8081/playersByNumberOfRunPlays", {
      method: 'GET' // The type of HTTP request.
    })
      .then(res => res.json()) // Convert the response data to a JSON.
      .then(playerList => {
        if (!playerList) return;
        // Map each teamObj in teamList to an HTML element:
        // A button which triggers the showMovies function for each team.
        let playerDivs = playerList.map((playerObj, i) =>
          <ItemButton id={"button-" + playerObj.name} onClick={() => this.showPlayers(playerObj.name)} item={playerObj.name + ": " + playerObj.rushes} />
        );

        // Set the state of the teams list to the value returned by the HTTP response from the server.
        this.setState({
          displayData: playerDivs
        })
      })
      .catch(err => console.log(err))	// Print the error if there is one.
  }

  // playersMostTeamsPlayed() {
  //   // Send an HTTP request to the server.
  //   fetch("http://localhost:8081/playersMostTeamsPlayed", {
  //     method: 'GET' // The type of HTTP request.
  //   })
  //     .then(res => res.json()) // Convert the response data to a JSON.
  //     .then(playerList => {
  //       if (!playerList) return;
  //       // Map each teamObj in teamList to an HTML element:
  //       // A button which triggers the showMovies function for each team.
  //       let playerDivs = playerList.map((playerObj, i) =>
  //         <ItemButton id={"button-" + playerObj.name} onClick={() => this.showPlayers(playerObj.name)} item={playerObj.name} />
  //       );

  //       // Set the state of the teams list to the value returned by the HTTP response from the server.
  //       this.setState({
  //         displayData: playerDivs
  //       })
  //     })
  //     .catch(err => console.log(err))	// Print the error if there is one.
  // }

  // SET DEFAULT
  componentDidMount() {
    // Send an HTTP request to the server.
    fetch("http://localhost:8081/playersMostTeamsPlayed", {
      method: 'GET' // The type of HTTP request.
    })
      .then(res => res.json()) // Convert the response data to a JSON.
      .then(playerList => {
        if (!playerList) return;
        // Map each teamObj in teamList to an HTML element:
        // A button which triggers the showMovies function for each team.
        let playerDivs = playerList.map((playerObj, i) =>
          <ItemButton id={"button-" + playerObj.name} onClick={() => this.showPlayers(playerObj.name)} item={playerObj.name + ": " + playerObj.num_teams_played_for} />
        );

        // Set the state of the teams list to the value returned by the HTTP response from the server.
        this.setState({
          displayData: playerDivs
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
            <div className="h5">Search for Team Stats: </div>
            <div className="items-container">
            <ItemButton id={"query-playersMostTeamsPlayed"} onClick={() => this.componentDidMount()} item={"Players Who Have Played on the Most NFL Teams"}/>
            <ItemButton id={"query-playersMostRushesExecuted"} onClick={() => this.playersMostRushesExecuted()} item={"Players With the Most Successful Rushes"}/>
            </div>
          </div>
          </div>
          <div class="col-md-8">
          <div className="jumbotron">
            <div className="h5">Players Who Have Played on the Most NFL Teams</div>
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