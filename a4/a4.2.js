const express = require('express');
const app = express();
app.use(express.json());
app.use(express.urlencoded({extended: true}))
const port = 3000;
const path = require("path")
const {get} = require("request");




app.get('/now', async (req, res) => {
    const tz = req.query.tz;
    const now = new Date().toLocaleTimeString('de-CH', {timeZone: tz})
    res.send(now);
});


const names = [
    "Franz",
    "Raul",
    "Jan",
    "Luca"
]

app.post('/names', (req, res) => {
    names.push(req.body.name);
    res.send(names)
})

app.delete('/names', (req, res) => {
    const dn = req.query.dn;
    const index = names.indexOf(dn)
    if (index > -1) {
        names.splice(index, 1)
        res.sendStatus(204)
    } else {
        res.status(404).send('Name nicht gefunden');
    }

})

app.get('/secret2', (req, res) => {
    const authheader = req.headers.authorization;
    const expectedheader = "Basic aGFja2VyOjEyMzQ=";
    if (authheader === expectedheader) {
        res.sendStatus(200)
    } else {
        res.sendStatus(401)
    }
})

app.get("/chuck", async (req, res) =>  {
    const name = req.query.name
    let data = await fetch("https://api.chucknorris.io/jokes/random")
    let joke = await data.json()
    res.send(joke.value.replace("Chuck Norris", name))
})



let me = {
    Vorname: "Max",
    Nachname: "Mustermann",
    Alter: 28,
    Wohnort: "Musterstadt",
    Augenfarbe: "Blau"
};

app.get('/me', (req, res) => {
    res.send(me)
})

app.patch('/me', (req, res) => {
    res.send({...me, ...req.body})
});




app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
});