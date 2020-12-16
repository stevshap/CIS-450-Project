var config = require('./db-config.js');
var mysql = require('mysql');

config.connectionLimit = 10;
var connection = mysql.createPool(config);

/* -------------------------------------------------- */
/* ------------------- Route Handlers --------------- */
/* -------------------------------------------------- */


/* ---- get teams *TEST QUERY (Dashboard) ---- */
function getAllTeams(req, res) {
    var query = `
    SELECT DISTINCT nickname AS name
    FROM Teams
  `;
  connection.query(query, function(err, rows, fields) {
    if (err) console.log(err);
    else {
      res.json(rows);
    }
  });
};

/* ---- get players *TEST QUERY (Dashboard) ---- */
function getAllPlayers(req, res) {
  var query = `
  SELECT DISTINCT name
  FROM Players
`;
connection.query(query, function(err, rows, fields) {
  if (err) console.log(err);
  else {
    res.json(rows);
  }
});
};

/* ---- get colleges *TEST QUERY (Dashboard) ---- */
function getAllColleges(req, res) {
  var query = `
  SELECT DISTINCT college AS name
  FROM Players
`;
connection.query(query, function(err, rows, fields) {
  if (err) console.log(err);
  else {
    res.json(rows);
  }
});
};

/* ---- get hometown *TEST QUERY (Dashboard) ---- */
function getAllHometowns(req, res) {
  var query = `
  SELECT DISTINCT home_town AS name
  FROM Players
  WHERE home_town != ""
`;
connection.query(query, function(err, rows, fields) {
  if (err) console.log(err);
  else {
    res.json(rows);
  }
});
};


/* ---- PLAYERS PAGE  ---- */

//write a query to enable people to search for a player?

/* ---- Q1: get players who have played on the most teams ---- */
function playersOnMostTeams(req, res) {
    var query = `
    SELECT nfl_iD,
    name,
    team_id,
    COUNT(*) AS num_teams_played_for
    FROM Players
    GROUP BY nfl_iD
    ORDER BY num_teams_played_for DESC
  `;
  connection.query(query, function(err, rows, fields) {
    if (err) console.log(err);
    else {
      console.log("made");
      console.log(rows);
      res.json(rows);
    }
  });

};

// /* ---- Q4: 4. RBs (make position field selectable by user) who have played the most games ---- */
// function RBsWithMostGamesPlayed(req, res) {
//     var query = `
//     SELECT nfl_iD,
//     name,
//     team_id,
//     COUNT(*) AS num_teams_played_for
//     FROM Players
//     GROUP BY nfl_iD
//     ORDER BY num_teams_played_for DESC;
//   `;
//   connection.query(query, function(err, rows, fields) {
//     if (err) console.log(err);
//     else {
//       //console.log(rows);
//       res.json(rows);
//     }
//   });

// };


/* ---- get top 5 hometowns based on which have the most NFL pass plays executed ---- */
function hometownsWithMostNFLPassPlaysOnAvg(req, res) {
  var query = `
  WITH Top5HomeCities AS (
    SELECT home_town,
        COUNT(*) AS num_players_produced
    FROM Players
    WHERE home_town <> ''
    GROUP BY home_town
    ORDER BY num_players_produced DESC
  ),
  PasserPlaysFromTop5 AS (
      SELECT t.home_town,
          COUNT(*) AS num_passer_plays
      From Players p
          JOIN Top5HomeCities t ON p.home_town = t.home_town
          JOIN Plays play ON p.global_id = play.passer_id
      GROUP BY t.home_town
  )
  SELECT t.home_town,
      AVG(p.num_passer_plays) AS avg_passer_plays
  FROM Top5HomeCities t
      JOIN PasserPlaysFromTop5 p ON t.home_town = p.home_town
  GROUP BY t.home_town
`;
connection.query(query, function(err, rows, fields) {
  if (err) console.log(err);
  else {
    //console.log(rows);
    res.json(rows);
  }
});
};

/* ---- get bottom 5 hometowns based on which have the fewest NFL rushes executed ---- */
function hometownsWithFewestNFLRushPlaysOnAvg(req, res) {
var query = `
  WITH Lowest5HomeCities AS (
    SELECT home_town,
        COUNT(*) AS num_players_produced
    FROM Players
    WHERE home_town <> ''
    GROUP BY home_town
    ORDER BY num_players_produced
  ),
  RusherPlaysFromLow5 AS (
      SELECT t.home_town,
          COUNT(*) AS num_rusher_plays
      From Players p
          JOIN Lowest5HomeCities t ON p.home_town = t.home_town
          JOIN Plays play ON p.global_id = play.rusher_id
      GROUP BY t.home_town
  )
  SELECT t.home_town,
      AVG(ru.num_rusher_plays) AS avg_rusher_plays
  FROM Lowest5HomeCities t
      JOIN RusherPlaysFromLow5 ru ON t.home_town = ru.home_town
  GROUP BY t.home_town
`;
connection.query(query, function(err, rows, fields) {
if (err) console.log(err);
else {
  //console.log(rows);
  res.json(rows);
}
});
};


/* ---- get top 5 running backs from California by number of NFL seasons played (descending) ---- */
function runningBacksWithMostSeasons(req, res) {
var query = `
SELECT nfl_iD,
  season,
  name,
  COUNT(*) AS num_years_played
FROM Players
WHERE position = 'RB'
  AND home_town LIKE '%CA'
GROUP BY nfl_iD
ORDER BY num_years_played DESC
LIMIT 5
`;
connection.query(query, function(err, rows, fields) {
if (err) console.log(err);
else {
  //console.log(rows);
  res.json(rows);
}
});
};


/* ---- hometown search for players ---- */
function getPlayersFromHometown(req, res) {
  //console.log("hi");
  var search= req.params.search;
  //console.log(inputName);
  var query = `
    SELECT DISTINCT nfl_iD,
      season,
      name,
      COUNT(*) AS num_years_played
    FROM Players
    WHERE home_town LIKE '%${search}'
    `;
    connection.query(query, function(err, rows, fields) {
    if (err) console.log(err);
    else {
      //console.log(rows);
      res.json(rows);
}
});
};

/* ---- get all linebackers from UPenn who played in the NFL  ---- */
function uPennLinebackersToPlayInNFL(req, res) {
var query = `
WITH UPennLinebackers AS (
  SELECT nfl_id,
      season,
      team_id,
      name
  FROM Players
  WHERE college LIKE 'Pennsylvania'
      AND position = 'LB'
)
SELECT DISTINCT upenn.name,
  t.nickname AS teamName
FROM UPennLinebackers upenn
  JOIN Teams t ON t.team_id = upenn.team_id
`;
connection.query(query, function(err, rows, fields) {
if (err) console.log(err);
else {
  //console.log(rows);
  res.json(rows);
}
});
};


/* ---- get the 10 colleges with the most players sent to the NFL ---- */
function collegesWithMostPlayersSentToNFL(req, res) {
var query = `
WITH ActivePlayers AS (
  SELECT *
  FROM Players
  WHERE status = 'ACT'
),
UniquePlayers AS (
    SELECT *
    FROM ActivePlayers
    GROUP BY nfl_id
)
SELECT college,
    COUNT(*) AS playerCount
FROM UniquePlayers
GROUP BY college
ORDER BY playerCount DESC
LIMIT 10
`;
connection.query(query, function(err, rows, fields) {
if (err) console.log(err);
else {
  //console.log(rows);
  res.json(rows);
}
});
};

/* ---- get the 10 rushers with the most NFL rush attempts ---- */
function playersWithMostRunPlaysExecuted(req, res) {
var query = `
WITH Runs AS (
  SELECT rusher_id,
      COUNT(*) as count
  From Plays
  WHERE play_type = 'run'
  GROUP BY rusher_id
)
SELECT Players.name as name,
    Runs.count AS rushes
FROM Runs
    JOIN Players ON Runs.rusher_id = Players.global_id
ORDER BY count DESC
LIMIT 10
`;
connection.query(query, function(err, rows, fields) {
if (err) console.log(err);
else {
  //console.log(rows);
  res.json(rows);
}
});
};

// The exported functions, which can be accessed in index.js.
module.exports = {
  getAllTeams: getAllTeams,
  getAllPlayers: getAllPlayers,
  getAllColleges: getAllColleges,
  getAllHometowns: getAllHometowns,
  playersOnMostTeams: playersOnMostTeams,
  hometownsWithMostNFLPassPlaysOnAvg: hometownsWithMostNFLPassPlaysOnAvg,
  hometownsWithFewestNFLRushPlaysOnAvg: hometownsWithFewestNFLRushPlaysOnAvg,
  runningBacksWithMostSeasons: runningBacksWithMostSeasons,
  uPennLinebackersToPlayInNFL: uPennLinebackersToPlayInNFL,
  collegesWithMostPlayersSentToNFL: collegesWithMostPlayersSentToNFL,
  playersWithMostRunPlaysExecuted: playersWithMostRunPlaysExecuted,
  getPlayersFromHometown: getPlayersFromHometown,

}