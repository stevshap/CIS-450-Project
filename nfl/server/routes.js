var config = require('./db-config.js');
var mysql = require('mysql');

config.connectionLimit = 10;
var connection = mysql.createPool(config);

/* -------------------------------------------------- */
/* ------------------- Route Handlers --------------- */
/* -------------------------------------------------- */


/* ---- get teams (Dashboard) ---- */
function getAllTeams(req, res) {
    var query = `
    SELECT DISTINCT nickname
    FROM Teams
  `;
  connection.query(query, function(err, rows, fields) {
    if (err) console.log(err);
    else {
      res.json(rows);
    }
  });
};


/* ---- get top 5 (Dashboard) ---- */
function PlayersOnMostTeams(req, res) {
    var query = `
    SELECT nfl_iD,
    name,
    team_id,
    COUNT(*) AS num_teams_played_for
    FROM Players
    GROUP BY nfl_iD
    ORDER BY num_teams_played_for DESC;
  `;
  connection.query(query, function(err, rows, fields) {
    if (err) console.log(err);
    else {
      //console.log(rows);
      res.json(rows);
    }
  });


  // var inputGenre = req.params.genre;
  // //console.log(inputGenre);
  // var query = `
  //   SELECT m.title, m.rating, m.vote_count
  //   FROM Genres g JOIN Movies m ON g.movie_id = m.id
  //   WHERE genre = '${inputGenre}'
  //   ORDER BY rating DESC, vote_count DESC
  //   LIMIT 10;
  // `;
  // connection.query(query, function(err, rows, fields) {
  //   if (err) console.log(err);
  //   else {
  //     //console.log(rows);
  //     res.json(rows);
  //   }
  // });
};

/* ---- Q2 (Recommendations) ---- */
function getRecs(req, res) {
  //console.log("hi");
  var inputName = req.params.name;
  //console.log(inputName);
  var query = `
    WITH ThisMovGenres AS (
      SELECT m.title, m.id, g.genre
      FROM Genres g JOIN Movies m ON m.id = g.movie_id
      WHERE m.title = '${inputName}'
    ),
    ThisGenreCount AS (
      SELECT title, id, COUNT(*) as numGenres
      FROM ThisMovGenres
      GROUP BY title
    ),
    MatchesByGenre AS (
      SELECT m.title, m.id, m.rating, m.vote_count, COUNT(*) as numGenres
      FROM Movies m JOIN Genres g ON m.id = g.movie_id
      JOIN ThisMovGenres mg ON g.genre = mg.genre
      WHERE m.id <> mg.id
      GROUP BY m.id 
    )

    SELECT m1.title, m1.id, m1.rating, m1.vote_count
    FROM MatchesByGenre m1 JOIN ThisGenreCount m2 ON m1.numGenres = m2.numGenres
    ORDER BY m1.rating DESC, m1.vote_count DESC
    LIMIT 5;

  `;
  connection.query(query, function(err, rows, fields) {
    if (err) console.log(err);
    else {
      //console.log(rows);
      res.json(rows);
    }
  });
};

/* ---- (Best Genres) ---- */
function getDecades(req, res) {
	var query = `
    SELECT DISTINCT (FLOOR(year/10)*10) AS decade
    FROM (
      SELECT DISTINCT release_year as year
      FROM Movies
      ORDER BY release_year
    ) y
  `;
  connection.query(query, function(err, rows, fields) {
    if (err) console.log(err);
    else {
      res.json(rows);
    }
  });
}

/* ---- Q3 (Best Genres) ---- */
function bestGenresPerDecade(req, res) {
  var inputDecade = req.params.decade;
  //console.log(inputName);
  var query = `
  WITH MoviesFromDecade AS (
    SELECT g.genre, m.rating
    FROM Movies m JOIN Genres g ON m.id = g.movie_id
    WHERE m.release_year >= ${inputDecade} AND m.release_year <= ${inputDecade} + 9
    ),
    GenreList AS (
      SELECT DISTINCT genre
      FROM Genres
    )
    SELECT g.genre, IFNULL(AVG(md.rating),0) as avg_rating
    FROM MoviesFromDecade md RIGHT JOIN GenreList g ON md.genre = g.genre
    GROUP BY g.genre
    ORDER BY avg_rating DESC, g.genre;
  `;
  connection.query(query, function(err, rows, fields) {
    if (err) console.log(err);
    else {
      res.json(rows);
    }
  });
};

// The exported functions, which can be accessed in index.js.
module.exports = {
	getAllTeams: getAllTeams,
	getTopInGenre: getTopInGenre,
	getRecs: getRecs,
	getDecades: getDecades,
  bestGenresPerDecade: bestGenresPerDecade
}