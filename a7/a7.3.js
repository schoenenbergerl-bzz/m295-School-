const express = require('express');
const session = require('express-session');
const bodyParser = require('body-parser');

const app = express();
const port = 3000;

app.use(bodyParser.json());
app.use(session({
    secret: 'geheim',
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false }
}));

const user = {
    email: "desk@library.example",
    password: "m295"
};

app.post('/login', (req, res) => {
    const { email, password } = req.body;
    if (email === user.email && password === user.password) {
        req.session.authenticated = true;
        req.session.user = email;
        res.status(201).send({ email });
    } else {
        res.status(401).send("Unauthorized");
    }
});

app.get('/verify', (req, res) => {
    if (req.session.authenticated) {
        res.status(200).send(req.session.user);
    } else {
        res.status(401).send("Unauthorized");
    }
});

app.delete('/logout', (req, res) => {
    req.session.destroy();
    res.status(204).send();
});

function checkAuth(req, res, next) {
    if (req.session.authenticated) {
        next();
    } else {
        res.status(401).send('Unauthorized');
    }
}

app.get('/lends', checkAuth, (req, res) => {
    res.send("Zugriff auf Lends nur mit Authentifizierung.");
});

const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/library')
    .then(() => console.log('MongoDB verbunden'))
    .catch(err => console.error('MongoDB Verbindungsfehler:', err));


app.listen(port, () => console.log(`Server hört auf Port ${port}`));
