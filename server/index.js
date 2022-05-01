const express = require("express");
var bodyParser = require('body-parser')

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

const PORT = process.env.PORT || 3001;

const app = express();

// Set body parser
// parse various different custom JSON types as JSON
app.use(bodyParser.json({ type: 'application/json' }))
// End set body parser

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

// Update an investment by ID
app.put("/api/investments", (req, res) => {
  console.log(res.body)
  const investment = investments_data.find(investment => investment.id === parseInt(req.body.id));
  if (!investment) {
    return res.status(404).send("The investment with the given ID was not found.");
  }

  investment.value = req.body.value;

  res.json(investments_data);
})

// (there is no user but this should be by user ID) Get the user list of investments
app.get("/api/holdings", (req, res) => {
  let responseJson = {
    investments: [],
    cash: userData.cash,
  };

  userData.investments.forEach((invesment) => {
    let investmentData = investments_data.find(investment => investment.id === invesment.id);
    let newUserInvestment = {
      id: investmentData.id,
      name: investmentData.name,
      type: investmentData.type,
      holdings: invesment.holdings,
    }
    responseJson.investments.push(newUserInvestment);
  })

  res.json(responseJson);
});

// Operate user investment
// I tried to use the body here but it does not work, the body comes empty and I do not know why, so i use query string instead
app.post("/api/holdings/", (req, res) => {
  let userInvestment = userData.investments.find(investment => investment.id === parseInt(req.body.id));
  
  if (userInvestment) {
    userInvestment.holdings += parseInt(req.body.amount);
    // All the holdings where sold, so we need to remove the investment from the user investments
    if (userInvestment.holdings === 0) {
      userData.investments = userData.investments.filter(investment => investment.id !== parseInt(req.body.id));
    }
  } else {
    userData.investments.push({
      id: parseInt(req.body.id),
      holdings: parseInt(req.body.amount)
    });
  }

  res.json(userData);
})

app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});