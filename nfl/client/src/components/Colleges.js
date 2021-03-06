import React from 'react';
import '../style/Dashboard.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import PageNavbar from './PageNavbar';
import ItemButton from './ItemButton';
import Autocomplete from './Autocomplete';
import Button from 'react-bootstrap/Button';



export default class Colleges extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      displayData: [],
      displayName: "",
      colleges: [],
    }

    this.collegeAndPositionToPlayInNFL = this.collegeAndPositionToPlayInNFL.bind(this);
    this.collegesByNumberOfPros = this.collegesByNumberOfPros.bind(this);
    this.getAllColleges = this.getAllColleges.bind(this);
    this.handleInput = this.handleInput.bind(this);
    this.handleSearch = this.handleSearch.bind(this);
  }

  handleInput(event) {
    //not  implemented but can be based on handleSearch() in Hometown.js
  }

  handleSearch() {
    //not  implemented but can be based on handleSearch() in Hometown.js
  }

  getAllColleges() {
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
          colleges: collegeDivs
        })
      })
      .catch(err => console.log(err))	// Print the error if there is one.

  }
  collegesByNumberOfPros() {
    // Send an HTTP request to the server.
    fetch("http://localhost:8081/collegesByNumberOfPros", {
      method: 'GET' // The type of HTTP request.
    })
      .then(res => res.json()) // Convert the response data to a JSON.
      .then(collegeList => {
        if (!collegeList) return;
        // Map each teamObj in teamList to an HTML element:
        // A button which triggers the showMovies function for each team.
        let collegeDivs = collegeList.map((collegeObj, i) =>
          <ItemButton id={"button-" + collegeObj.college} onClick={() => this.showPlayers(collegeObj.college)} item={collegeObj.college + ": " + collegeObj.playerCount} />
        );

        // Set the state of the teams list to the value returned by the HTTP response from the server.
        this.setState({
          displayData: collegeDivs,
          displayName: "Colleges Ranked by NFL Players Produced"
        })
      })
      .catch(err => console.log(err))	// Print the error if there is one.
  }

  collegeAndPositionToPlayInNFL() {
    // Send an HTTP request to the server.
    fetch("http://localhost:8081/collegeAndPositionToPlayInNFL", {
      method: 'GET' // The type of HTTP request.
    })
      .then(res => res.json()) // Convert the response data to a JSON.
      .then(playerList => {
        if (!playerList) return;
        // Map each teamObj in teamList to an HTML element:
        // A button which triggers the showMovies function for each team.
        let playerDivs = playerList.map((playerObj, i) =>
          <ItemButton id={"button-" + playerObj.name} onClick={() => this.showPlayers(playerObj.name)} item={playerObj.name + " - " + playerObj.teamName} />
        );

        // Set the state of the teams list to the value returned by the HTTP response from the server.
        this.setState({
          displayData: playerDivs,
          displayName: "UPenn Linebackers Now Playing in the NFL"
        })
      })
      .catch(err => console.log(err))	// Print the error if there is one.
  }




  componentDidMount() {
    this.getAllColleges();
    // Send an HTTP request to the server.
    fetch("http://localhost:8081/collegesByNumberOfPros", {
      method: 'GET' // The type of HTTP request.
    })
      .then(res => res.json()) // Convert the response data to a JSON.
      .then(collegeList => {
        if (!collegeList) return;
        // Map each teamObj in teamList to an HTML element:
        // A button which triggers the showMovies function for each team.
        let collegeDivs = collegeList.map((collegeObj, i) =>
          <ItemButton id={"button-" + collegeObj.college} onClick={() => this.showPlayers(collegeObj.college)} item={collegeObj.college + ": " + collegeObj.playerCount} />
        );

        // Set the state of the teams list to the value returned by the HTTP response from the server.
        this.setState({
          displayData: collegeDivs,
          displayName: "Colleges Ranked by NFL Players Produced"
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
            <div className="h5">Search for Colleges: </div>
            <div className="row">
            <Autocomplete suggestions={this.state.colleges}/>
            <Button variant="success" onClick={this.handleSearch}>Search</Button>
            </div>
            <div className="items-container">
            <ItemButton id={"query-collegesByNumberOfPros"} onClick={() => this.collegesByNumberOfPros()} item={"Colleges Ranked by NFL Players Produced"}/>
            <ItemButton id={"query-collegeAndPositionToPlayInNFL"} onClick={() => this.collegeAndPositionToPlayInNFL()} item={"UPenn Linebackers Now Playing in the NFL"}/>
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