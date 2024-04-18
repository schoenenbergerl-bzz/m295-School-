require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const session = require('express-session');
const bodyParser = require('body-parser');
const User = require('./models/User');

const app = express();
const port = process.env.PORT || 3000;

// Datenbankverbindung
mongoose.connect('mongodb://127.0.0.1:27017/library')
    .then(() => console.log('MongoDB verbunden'))
    .catch(err => console.error('MongoDB Verbindungsfehler:', err));


app.use(bodyParser.json());
app.use(session({
    secret: 'geheim',
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false }
}));

// Hier Ihre Route-Definitionen
// Beispiel: POST /login, GET /verify, DELETE /logout

app.listen(port, () => console.log(`Server hört auf Port ${port}`));
