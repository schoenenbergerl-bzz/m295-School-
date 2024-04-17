const express = require('express');
const session = require('express-session');

const app = express();
app.use(express.json());

app.use(session({
    secret: 'Geheimnis',
    resave: false,
    saveUninitialized: false,
    cookie: { secure: false }
}));

app.post('/name', (req, res) => {
    const { name } = req.body;
    req.session.name = name;
    res.send(`Name ${name} wurde in der Session gespeichert`);
});

app.get('/name', (req, res) => {
    if (req.session.name) {
        res.send(`Name in der Session: ${req.session.name}`);
    } else {
        res.status(404).send('Kein Name in der Session gefunden');
    }
});

app.delete('/name', (req, res) => {
    req.session.destroy((err) => {
        if (err) {
            return res.status(500).send('Fehler beim Löschen der Session');
        }
        res.send('Name wurde aus der Session gelöscht');
    });
});

const port = 3000;
app.listen(port, () => console.log(`Server läuft auf http://localhost:${port}`));
