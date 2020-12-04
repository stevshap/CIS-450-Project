import React from 'react';
import '../style/Dashboard.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import PageNavbar from './PageNavbar';
import FilterButton from './FilterButton';


export default class Dashboard extends React.Component {
  constructor(props) {
    super(props);

    // The state maintained by this React Component. This component maintains the list of genres,
    // and a list of movies for a specified genre.
    this.state = {
      filters:["Player History", "Season", "Play Stats", "NFL Teams", "College Teams", "Hometown"]
    }

    this.filterBy = this.filterBy.bind(this);
  }

  filterBy(filter) {
  }

  render() {    
    return (
      <div className="Dashboard">

        <PageNavbar active="dashboard" />

        <br></br>
        <div className="container categories-container">
        <div class="row">
          <div className="jumbotron col-md-6 box">
            <div className="h5">Sort Player Stats by Category</div>
            <div className="filters-container">
            {this.state.filters.map(filter=> (<FilterButton id={"button-" + filter} onClick={() => this.filterBy(filter)} filter={filter}/>))}
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