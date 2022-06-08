const express = require("express");
const methodOverride = require('method-override');
const Pokemon = require('/models/pokemon.js')
const pokemon = require('./models/pokemon')

const app = express();


const PORT = 3000

app.use(methodOverride('_method'));
app.use(express.urlencoded({ extended: false}));



app.get('/', (req, res)=> {
    res.send('Helo world');
});

app.get('/pokedex',(req, res) => {
    res.render('index.ejs', { Pokemon: pokemon});
});

app.get('/pokedex/new', (req, res)=> {
    res.render('new.ejs')
    });


app.delete('/pokedex/:id', (req, res) => {
    pokemon.splice(req.params.id, 1);
    res.redirect('/pokedex');
    });


app.put('/pokemon/:id', (req, res)=> {
    req.body.stats ={};
    req.body.stats.hp = req.body.hp;
    req.body.stats.attack = req.body.attack;
    req.body.stats.defense = req.body.defense;
   
    console.log(req.body);
    Pokemon[req.params.id] = req.body;
    res.redirect('/pokemon');
});

app.put('/pokedex/:id', (req, res) => {
    pokemon[req.params.id] = req.body;
    res.redirect('/pokedex');
});

app.post('/pokemon', (req, res)=> {
    req.body.stats ={};
    req.body.stats.hp = req.body.hp;
    req.body.stats.attack = req.body.attack;
    req.body.stats.defense = req.body.defense;
    console.log(req.body);
    Pokemon.push(req.body);
    res.redirect('/pokemon');
    });



 app.get('/pokedex/:id/', (req, res)=> {
     res.render('show.ejs', {
         Pokemon: Pokemon[req.params.id] });
 });


app.listen(PORT, () => {
    console.log(`app listeningon port ${PORT}}`)
});