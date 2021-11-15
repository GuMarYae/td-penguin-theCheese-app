//////////////////////////////////
// Dependencies
/////////////////////////////////
// get .env variables
require("dotenv").config()
// pull PORT from .env, give it a default of 3000 (object destructuring)
const {PORT = 3001, DATABASE_URL} = process.env
// import express
const express = require("express")
// create the application object
const app = express()
// import mongoose
const mongoose = require("mongoose")
// import middleware
const cors = require("cors")
const morgan = require("morgan")


/////////////////////////////////
// Database Connection
////////////////////////////////
// establish connection
mongoose.connect(DATABASE_URL, {
    useUnifiedTopology: true,
    useNewUrlParser: true
})
//////////////////////////////
// Models this mode  is cheese
//////////////////////////////
// the cheese schema
const CheeseSchema = new mongoose.Schema({
    name: String,
    image: String,
    originated: String
}, {timestamps: true})

const Cheese = mongoose.model("Cheese", CheeseSchema)

/////////////////////////////////
//Middleware
//////////////////////////////////
app.use(cors()) // prevent cors errors, opens up access for frontend
app.use(morgan("dev")) //logging
app.use(express.json()) // parse json bodies


////////////////////////////////
// Routes this will show the log. so everything is working thus far
////////////////////////////////
// create a test route
app.get("/", (req, res) => {
    res.send("wS' POPPIN World!! I got the 🧀 🧀 🧀 🧀 !!.. Its lit!! 🔥 🔥 🔥 🔥 🔥 🔥 🔥 🔥 🔥 🔥 🔥 ")
})

// Cheese index route  // in the thunder client, this should show an empty array when typing the url
// get request to /cheese, returns all cheese as json
app.get("/cheese", async (req, res) => {
    try {
      // send all cheese
      res.json(await Cheese.find({}));
    } catch (error) {
      res.status(400).json({ error });
    }
  });

   // Cheese create route  this will pust the objects created in the thunder client so you can look for them inthe url
// post request to /cheese, uses request body to make new cheese
app.post("/cheese", async (req, res) => {
    try {
      // screate a new person
      res.json(await Cheese.create(req.body));
    } catch (error) {
      res.status(400).json({ error });
    }
  });

    // Cheese update  route
// put request /cheese/:id, updates person based on id with request body
app.put("/cheese/:id", async (req, res) => {
    try {
        // update a person
        res.json(await Cheese.findByIdAndUpdate(req.params.id, req.body, {new: true}));
      } catch (error) {
        res.status(400).json({ error });
      }
})
// Destroy Route 
// delete request to /cheese/:id, deletes the person specified
app.delete("/cheese/:id", async (req, res) => {
    try {
        // delete a person
        res.json(await Cheese.findByIdAndRemove(req.params.id));
      } catch (error) {
        res.status(400).json({ error });
      }
})



/////////////////////////////////
// Server Listener
/////////////////////////////////
app.listen(PORT, () => {console.log(`listening on PORT ${PORT}`)})