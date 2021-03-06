import React from 'react';
import '../style/Dashboard.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import PageNavbar from './PageNavbar';
import ItemButton from './ItemButton';
import Autocomplete from './Autocomplete';
import Button from 'react-bootstrap/Button';



export default class Hometowns extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      displayData: [],
      displayName: "",
      search: "", 
      hometowns: [],
    }

    this.runningBacksWithMostSeasons = this.runningBacksWithMostSeasons.bind(this);
    this.hometownsMostPassPlays = this.hometownsMostPassPlays.bind(this);
    this.hometownsFewestRushPlays = this.hometownsFewestRushPlays.bind(this);
    this.getAllHometowns = this.getAllHometowns.bind(this);
    this.handleInput = this.handleInput.bind(this);
    this.handleSearch = this.handleSearch.bind(this);
  }

  handleInput(event) {
    this.setState({search: event.target.value});
  }

  handleSearch() {
    fetch("http://localhost:8081/getPlayersFromHometown/" + this.state.search, {
      		method: 'GET'
    	})
	      .then(res => res.json()) 
	      .then(searchList => {
	        if (searchList.length===0){
            this.setState({
              displayData: <ItemButton item={"No Search Results Found"}/>
            });

          } else{
	        let searchListDiv = searchList.map((searchObj, i) => (
	          <ItemButton id={searchObj.home_town+"-i"} item={searchObj.name}/>
          ));
          
	        this.setState({
                displayName: "Players from " + this.state.search,
	            displayData: searchListDiv
	        })}
          })
          .catch(err => console.log(err)) 
          console.log("dshf");
  }

  getAllHometowns() {
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
          hometowns: hometownDivs
        })
      })
      .catch(err => console.log(err))	// Print the error if there is one.

  }

  runningBacksWithMostSeasons() {
    // Send an HTTP request to the server.
    fetch("http://localhost:8081/PosAndStateByExperience", {
      method: 'GET' // The type of HTTP request.
    })
      .then(res => res.json()) // Convert the response data to a JSON.
      .then(playerList => {
        if (!playerList) return;
        // Map each teamObj in teamList to an HTML element:
        // A button which triggers the showMovies function for each team.
        let playerDivs = playerList.map((playerObj, i) =>
          <ItemButton id={"button-" + playerObj.name} onClick={() => this.showPlayers(playerObj.name)} item={playerObj.name + ": " + playerObj.num_years_played} />
        );

        // Set the state of the teams list to the value returned by the HTTP response from the server.
        this.setState({
          displayData: playerDivs,
          displayName: "Top 5 California Running Back Season Counts"
        })
      })
      .catch(err => console.log(err))	// Print the error if there is one.
  }

  hometownsMostPassPlays() {
    // Send an HTTP request to the server.
    fetch("http://localhost:8081/hometownsMostPassPlays", {
      method: 'GET' // The type of HTTP request.
    })
      .then(res => res.json()) // Convert the response data to a JSON.
      .then(hometownList => {
        if (!hometownList) return;
        // Map each teamObj in teamList to an HTML element:
        // A button which triggers the showMovies function for each team.
        let hometownDivs = hometownList.map((hometownObj, i) =>
          <ItemButton id={"button-" + hometownObj.name} onClick={() => this.showHometowns(hometownObj.name)} item={hometownObj.home_town + ": " + hometownObj.avg_passer_plays} />
        );

        // Set the state of the teams list to the value returned by the HTTP response from the server.
        this.setState({
          displayData: hometownDivs,
          displayName: "Hometowns With the Most NFL Pass Plays On Average"
        })
      })
      .catch(err => console.log(err))	// Print the error if there is one.
  }

  hometownsFewestRushPlays() {
    // Send an HTTP request to the server.
    fetch("http://localhost:8081/hometownsFewestRushPlays", {
      method: 'GET' // The type of HTTP request.
    })
      .then(res => res.json()) // Convert the response data to a JSON.
      .then(hometownList => {
        if (!hometownList) return;
        // Map each teamObj in teamList to an HTML element:
        // A button which triggers the showMovies function for each team.
        let hometownDivs = hometownList.map((hometownObj, i) =>
          <ItemButton id={"button-" + hometownObj.name} onClick={() => this.showHometowns(hometownObj.name)} item={hometownObj.home_town + ": " + hometownObj.avg_rusher_plays} />
        );

        // Set the state of the teams list to the value returned by the HTTP response from the server.
        this.setState({
          displayData: hometownDivs,
          displayName: "Hometowns With the Fewest NFL Pass Plays On Average"
        })
      })
      .catch(err => console.log(err))	// Print the error if there is one.
  }

  // SET DEFAULT
  componentDidMount() {
        this.getAllHometowns();
        // Send an HTTP request to the server.
        fetch("http://localhost:8081/hometownsMostPassPlays", {
            method: 'GET' // The type of HTTP request.
          })
            .then(res => res.json()) // Convert the response data to a JSON.
            .then(hometownList => {
              if (!hometownList) return;
              // Map each teamObj in teamList to an HTML element:
              // A button which triggers the showMovies function for each team.
              let hometownDivs = hometownList.map((hometownObj, i) =>
                <ItemButton id={"button-" + hometownObj.name} onClick={() => this.showHometowns(hometownObj.name)} item={hometownObj.home_town + ": " + hometownObj.avg_passer_plays} />
              );
      
              // Set the state of the teams list to the value returned by the HTTP response from the server.
              this.setState({
                displayData: hometownDivs,
                displayName: "Hometowns With the Most NFL Pass Plays On Average"
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
            <div className="h5">Search for Hometowns: </div>

            <div className="row">
            <input type='text'id="search-form" value={this.state.search} onChange={this.handleInput} suggestions={this.state.hometowns}/>
            <Button variant="success" onClick={this.handleSearch}>Search</Button>
            </div>
            
            <div className="items-container">
            <ItemButton id={"query-hometownsMostPassPlays"} onClick={() => this.hometownsMostPassPlays()} item={"Hometowns With the Most NFL Pass Plays On Average"}/>
            <ItemButton id={"query-hometownsFewestRushPlays"} onClick={() => this.hometownsFewestRushPlays()} item={"Hometowns With the Fewest NFL Rush Plays On Average"}/>
            <ItemButton id={"query-runningBacksWithMostSeasons"} onClick={() => this.runningBacksWithMostSeasons()} item={"Top 5 California Running Back Season Counts"}/>
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