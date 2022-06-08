const express = require("express");
const pokemon = require("./models/pokemon.js");

const methodOverride = require("method-override");

// const Pokemon = require('./models/pokemon');

const app = express();

const PORT = 3000;

app.use(express.urlencoded({ extended: false }));
app.use(methodOverride("_method"));

// app.get('/', (req, res)=> {
//     res.send('Helo world');
// });
//index page
app.get("/pokedex", (req, res) => {
  res.render("index.ejs", { pokemon: pokemon });
});
//new
app.get("/pokedex/new", (req, res) => {
  res.render("new.ejs");
});
//delete
app.delete("/pokedex/:id", (req, res) => {
  pokemon.splice(req.params.id, 1);
  res.redirect("/pokedex");
});
//update
app.put("/pokedex/:id", (req, res) => {
  pokemon[req.params.id] = req.body;
  req.body.stats = {};
  req.body.stats.hp = req.body.hp;
  req.body.stats.attack = req.body.attack;
  req.body.stats.defense = req.body.defense;

  console.log(req.body);
  res.redirect("/pokedex");
});
//create
app.post("/pokedex", (req, res) => {
  req.body.stats = {};
  req.body.stats.hp = req.body.hp;
  req.body.stats.attack = req.body.attack;
  req.body.stats.defense = req.body.defense;
  console.log(req.body);
  pokemon.push(req.body);
  res.redirect("/pokedex");
});

//edit
app.get("/pokedex/:id/edit", (req, res) => {
  res.render("edit.ejs", {
    pokemon: pokemon[req.params.id],
    index: req.params.id,
  });
});

//show
app.get("/pokedex/:id", (req, res) => {
  res.render("show.ejs", {
    pokemon: pokemon[req.params.id],
  });
});

app.listen(PORT, () => {
  console.log(`app listeningon port ${PORT}}`);
});
