import React from 'react';
import '../style/Dashboard.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import PageNavbar from './PageNavbar';
import ItemButton from './ItemButton';


export default class PlayersPage extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
    //   filters:["Player History", "Season", "Play Stats", "NFL players", "College players", "Hometown"],
    //   players:[]
        players:[],
    }
    this.filterBy = this.filterBy.bind(this);
    this.showPlayers = this.showPlayers.bind(this);
  }

  filterBy(filter) {
  }

  showPlayers(player) {
  }

  // /playersMostplayersPlayed

  // React function that is called when the page load.
  componentDidMount() {
    // Send an HTTP request to the server.
    //console.log("jkkhk");
    fetch("http://localhost:8081/playersMostTeamsPlayed", {
      method: 'GET' // The type of HTTP request.
    })
      .then(res => res.json()) // Convert the response data to a JSON.
      .then(playerList => {
        if (!playerList) return;
        // Map each playerObj in playerList to an HTML element:
        // A button which triggers the showMovies function for each player.
        console.log("checking playerList");
        console.log(playerList);
        let playerDivs = playerList.map((playerObj, i) =>
          <ItemButton id={"button-" + playerObj.nfl_iD} onClick={() => this.showPlayers(playerObj.name)} item={playerObj.nfl_iD} />
        );

        // Set the state of the players list to the value returned by the HTTP response from the server.
        this.setState({
          players: playerDivs
        })
        console.log("checking curr state players");
        //console.log(this.state.players);
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
                  <li><a href="/PlayersPage">Players</a></li>
                  <li><a href="#">Plays</a></li>
                  <li><a href="#">Hometowns</a></li>
              </ul>
            </div>
        </nav>

        <br></br>
        <br></br>
        <br></br>
        <br></br>
        <br></br>
          <div className="jumbotron bg-dark box text-white">
            <div className="h5">View Stats by Player</div>
              <div className="items-container">
              {this.state.players}
              </div>
            </div>
        </div>
    );
  }
}