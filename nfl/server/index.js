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






/* ---- Q1b (Dashboard) ---- */
app.get('/genres/:genre', routes.getTopInGenre); // Hint: Replace () => {} with the appropriate route handler.








/* ---- Q2 (Recommendations) ---- */
app.get('/recommendations/:name', routes.getRecs);





/* ---- (Best Genre) ---- */
app.get('/decades', routes.getDecades);






/* ---- Q3b (Best Genre) ---- */
app.get('/decades/:decade', routes.bestGenresPerDecade);







app.listen(8081, () => {
	console.log(`Server listening on PORT 8081`);
});