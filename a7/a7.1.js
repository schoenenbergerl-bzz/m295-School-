const express = require('express');
const basicAuth = require('basic-auth');
require('dotenv').config();

const app = express();
const port = 3000;

const AUTH_USER = process.env.AUTH_USER || 'zli';
const AUTH_PASS = process.env.AUTH_PASS || 'zli1234';

const authMiddleware = (req, res, next) => {
    const user = basicAuth(req);
    if (!user || user.name !== AUTH_USER || user.pass !== AUTH_PASS) {
        res.setHeader('WWW-Authenticate', 'Basic realm="401"');
        res.sendStatus(401);
        return;
    }
    next();
};

app.get('/public', (req, res) => {
    res.send('Dies ist ein öffentlicher Bereich. Kein Login erforderlich.');
});

app.get('/private', authMiddleware, (req, res) => {
    res.send('Dies ist ein privater Bereich. Sie sind eingeloggt.');
});

app.listen(port, () => {
    console.log(`Server läuft auf http://localhost:${port}`);
});
