// Setup empty JS object to act as endpoint for all routes
projectData = {};

// Require Express to run server and routes
const express = require("express");
var cors = require("cors");

// Start up an instance of app
const app = express();

/* Middleware*/
//Here we are configuring express to use body-parser as middle-ware.
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Cors for cross origin allowance
app.use(cors());

// Initialize the main project folder
app.use(express.static("website"));

// Setup Server
// GET Route to retrieve projectData
app.get("/api/projectdata", (req, res) => {
  res.status(200).send(projectData);
});

// POST Route to store date, temp and user input in projectData
app.post("/api/projectdata", (req, res) => {
  projectData = req.body;
  res.status(201).send();
});

app.listen(3000);
