import React from 'react';
import '../style/Dashboard.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import PageNavbar from './PageNavbar';
import GenreButton from './GenreButton';
import FilterButton from './FilterButton';
import DashboardMovieRow from './DashboardMovieRow';

export default class Dashboard extends React.Component {
  constructor(props) {
    super(props);

    // The state maintained by this React Component. This component maintains the list of genres,
    // and a list of movies for a specified genre.
    this.state = {
      genres: [],
      movies: [],
      filters:["Player History", "Season", "Play Stats", "NFL Teams", "College Teams", "Hometown"]
    }

    this.showMovies = this.showMovies.bind(this);
  }

  // React function that is called when the page load.
  // componentDidMount() {
  //   // Send an HTTP request to the server.
  //   fetch("http://localhost:8081/genres", {
  //     method: 'GET' // The type of HTTP request.
  //   })
  //     .then(res => res.json()) // Convert the response data to a JSON.
  //     .then(genreList => {
  //       if (!genreList) return;
  //       // Map each genreObj in genreList to an HTML element:
  //       // A button which triggers the showMovies function for each genre.
  //       let genreDivs = genreList.map((genreObj, i) =>
  //         <GenreButton id={"button-" + genreObj.genre} onClick={() => this.showMovies(genreObj.genre)} genre={genreObj.genre} />
  //       );

  //       // Set the state of the genres list to the value returned by the HTTP response from the server.
  //       this.setState({
  //         genres: genreDivs
  //       })
  //     })
  //     .catch(err => console.log(err))	// Print the error if there is one.
  // }


  /* ---- Q1b (Dashboard) ---- */
  /* Set this.state.movies to a list of <DashboardMovieRow />'s. */
  showMovies(genre) {
    fetch("http://localhost:8081/genres/" + genre, {
      method: 'GET' // The type of HTTP request.
    }) 
        .then(res => res.json())
        .then(topInGenreList => {
          if (!topInGenreList) return;

          console.log(topInGenreList);

          let topInGenreDivs = topInGenreList.map((topMov, i) =>
            <DashboardMovieRow title={topMov.title} rating={topMov.rating} votes={topMov.vote_count}/>
          );

          this.setState({
            movies: topInGenreDivs
          });
        })
        .catch(err => console.log(err))
  }

  render() {    
    return (
      <div className="Dashboard">

        <PageNavbar active="dashboard" />

        <br></br>
        <div className="container movies-container">
        <div class="row">
          <div className="jumbotron col-md-6 box">
            <div className="h5">Sort Player Stats by Category</div>
            <div className="filters-container">
            {this.state.filters.map(filter=> (<p>{filter}</p>))}
            </div>
          </div>

          <br></br>
          <div className="jumbotron col-md-6 box">
            <div className="movies-container">
              <div className="movies-header">
                <div className="header-lg"><strong>Player</strong></div>
                <div className="header"><strong>Team</strong></div>
                <div className="header"><strong>Hometown</strong></div>
              </div>
              <div className="results-container" id="results">
              </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}