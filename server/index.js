const express = require("express");

const PORT = process.env.PORT || 3001;

const app = express();
// Application data, this one should be persisted in a database
let investments_data = [
  {
    id: 1,
    name: "Coca Cola",
    type: "STOCK",
    value: 2000,
  },
  {
    id: 2,
    name: "Apple",
    type: "STOCK",
    value: 5000
  },
  {
    id: 3,
    name: "Microsoft",
    type: "STOCK",
    value: 1500
  },
  {
    id: 4,
    name: "Google",
    type: "STOCK",
    value: 3000
  },
  {
    id: 5,
    name: "Bono A23",
    type: "BOND",
    value: 100,
  },
  {
    id: 6,
    name: "Bono E45",
    type: "BOND",
    value: 540,
  },
  {
    id: 7,
    name: "Bono F54",
    type: "BOND",
    value: 432,
  },
  {
    id: 8,
    name: "Bono T30",
    type: "BOND",
    value: 240,
  },

]

let userData = {
  "investments": [
    {
      "id": 1,
      "holdings": 200,
    },
    {
      "id": 5,
      "holdings": 3000,
    }
  ],
  "cash": 50000,
}

// End of Application data

// Return the available stocks
app.get("/api/investments", (req, res) => {
  res.json(investments_data);
});

// Return an investment by ID
app.get("/api/investments/:id", (req, res) => {
  const investment = investments_data.find(investment => investment.id === parseInt(req.params.id));
  if (!investment) {
    return res.status(404).send("The investment with the given ID was not found.");
  }
  res.json(investment);
});

// (there is no user but this should be by user ID)
app.get("/api/holdings", (req, res) => {
  let responseJson = userData;

  responseJson.investments.forEach((invesment, idx) => {
    let investmentData = investments_data.find(investment => investment.id === invesment.id);
    responseJson.investments[idx].name = investmentData.name;
    responseJson.investments[idx].type = investmentData.type;
  })

  res.json(responseJson);
});

app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});