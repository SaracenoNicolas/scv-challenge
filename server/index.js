const express = require("express");

const PORT = process.env.PORT || 3001;

const app = express();

let stockValues = [
  {
    id: 1,
    name: "Coca Cola",
    value: 0.5,
  },
  {
    id: 2,
    name: "Apple",
    value: 1.0
  },
  {
    id: 3,
    name: "Microsoft",
    value: 1.5
  },
  {
    id: 4,
    name: "Google",
    value: 2.0
  }
]

let bondValues = [
  {
    id: 1,
    name: "Bono A23",
    value: 200,
  },
  {
    id: 2,
    name: "Bono E45",
    value: 540,
  },
  {
    id: 3,
    name: "Bono F54",
    value: 432,
  },
  {
    id: 4,
    name: "Bono T30",
    value: 111,
  },
]

let userData = {
  "stocks": [
    {
      "id": 1,
      "holdings": 200,
    }
  ],
  "bonds": [
    {
      "id": 1,
      "holdings": 3000,
    }
  ],
  "cash": 5000,
}

// Return the available stocks
app.get("/api/stocks", (req, res) => {
  res.json(stockValues);
});

// Return the available bonds
app.get("/api/bonds", (req, res) => {
  res.json(bondValues);
});

// Return the user holdings
app.get("/api/holdings", (req, res) => {
  res.json(userData);
});

app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});