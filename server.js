// server.js
const express = require("express");
const cors = require("cors");
const axios = require("axios");

const app = express();
app.use(cors());

const PORT = process.env.PORT || 3000;

// Kle yo nan Environment Variables sou Render
const RAPIDAPI_KEY = process.env.RAPIDAPI_KEY; 
const FOOTBALLDATA_KEY = process.env.FOOTBALLDATA_KEY; 

// Route debaz pou teste si server ap mache
app.get("/", (req, res) => {
  res.send("Backend football live ap mache! 👌");
});

// Endpoint pou matches
app.get("/matches", async (req, res) => {
  try {
    // RapidAPI
    const rapidRes = await axios.get(
      "https://soccer-matches-odds-api.p.rapidapi.com/matches/live",
      {
        headers: {
          "Content-Type": "application/json",
          "x-rapidapi-key": RAPIDAPI_KEY,
          "x-rapidapi-host": "soccer-matches-odds-api.p.rapidapi.com"
        }
      }
    );

    // Football-Data
    const fdRes = await axios.get(
      "https://api.football-data.org/v4/competitions/CL/matches",
      {
        headers: {
          "X-Auth-Token": FOOTBALLDATA_KEY
        }
      }
    );

    // Konbine tout done yo
    const combinedMatches = {
      rapidAPI: rapidRes.data,
      footballData: fdRes.data
    };

    res.json(combinedMatches);

  } catch (err) {
    console.error("Erreur APIs:", err.message);
    res.status(500).json({ error: "Erreur nan APIs" });
  }
});

app.listen(PORT, () => console.log(`Server koute sou port ${PORT}`));