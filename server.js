const express = require("express");
const cors = require("cors");
const axios = require("axios");

const app = express();
app.use(cors());

const PORT = process.env.PORT || 3000;

const API_KEY = "METE_API_KEY_OU_ISIT";

app.get("/live", async (req, res) => {
  try {
    const response = await axios.get(
      "https://v3.football.api-sports.io/fixtures?live=all",
      {
        headers: {
          "x-apisports-key": API_KEY,
        },
      }
    );

    res.json(response.data);
  } catch (error) {
    res.status(500).json({ error: "Erreur API" });
  }
});

app.listen(PORT, () => {
  console.log("Server ap kouri");
});
