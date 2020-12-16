const bodyParser = require('body-parser');
const express = require('express');
var routes = require("./routes.js");
const cors = require('cors');

const app = express();

app.use(cors({ credentials: true, origin: 'http://localhost:3000' }));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

/* ---------------------------------------------------------------- */
/* ------------------- Route handler registration ----------------- */
/* ---------------------------------------------------------------- */




/* ---- (Dashboard) ---- */
// The route localhost:8081/genres is registered to the function
// routes.getAllGenres, specified in routes.js.
app.get('/teams', routes.getAllTeams);
app.get('/players', routes.getAllPlayers);
app.get('/colleges', routes.getAllColleges);
app.get('/hometowns', routes.getAllHometowns);


app.get('/playersMostTeamsPlayed', routes.playersOnMostTeams);

app.get('/hometownsMostPassPlays', routes.hometownsWithMostNFLPassPlaysOnAvg);

app.get('/hometownsFewestRushPlays', routes.hometownsWithFewestNFLRushPlaysOnAvg);

app.get('/PosAndStateByExperience', routes.runningBacksWithMostSeasons);

app.get('/collegeAndPositionToPlayInNFL', routes.uPennLinebackersToPlayInNFL);

app.get('/collegesByNumberOfPros', routes.collegesWithMostPlayersSentToNFL);

app.get('/playersByNumberOfRunPlays', routes.playersWithMostRunPlaysExecuted);


app.get('/getPlayersFromHometown/:search',routes.getPlayersFromHometown);


app.listen(8081, () => {
	console.log(`Server listening on PORT 8081`);
});