const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Rout debaz pou teste server lan
app.get('/', (req, res) => {
  res.send('Backend football live ap mache! 👌');
});

// Rout matches
const matches = [
  { home: "Team A", away: "Team B", score: "2-1" },
  { home: "Team C", away: "Team D", score: "0-0" }
];

app.get('/matches', (req, res) => {
  res.json(matches);
});

// Kòmanse server sou PORT Render bay la
app.listen(PORT, () => console.log(`Server koute sou port ${PORT}`));
