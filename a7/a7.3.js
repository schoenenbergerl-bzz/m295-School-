//Nur diese Datei, das File lendRoutes.js und das login.html sind relevant für diese Aufgabe.
//Denzusatz mit MongoDB habe ich nicht hingekriegt.

const express = require('express');
const session = require('express-session');
const bodyParser = require('body-parser');

const app = express();
const port = 3000;

app.use(session({
    secret: 'geheimerSchlüssel',
    resave: false,
    saveUninitialized: false,
    cookie: { secure: false }
}));

app.use(bodyParser.json());

const requireAuth = (req, res, next) => {
    if (!req.session.authenticated) {
        return res.status(401).send('Unauthorized');
    }
    next();
};

app.post('/login', (req, res) => {
    const { email, password } = req.body;
    if (email === 'desk@library.example' && password === 'm295') {
        req.session.authenticated = true;
        req.session.user = email;
        res.status(201).send({ email });
    } else {
        res.status(401).send('Unauthorized');
    }
});

app.get('/verify', (req, res) => {
    if (req.session.authenticated) {
        res.status(200).send(req.session.user);
    } else {
        res.status(401).send('Unauthorized');
    }
});

app.delete('/logout', (req, res) => {
    req.session.destroy(() => {
        res.status(204).send();
    });
});

const lendRoutes = express.Router();

lendRoutes.get('/', (req, res) => {
    res.send('Liste der ausgeliehenen Artikel');
});

app.use('/lends', requireAuth, lendRoutes);

app.listen(port, () => console.log(`Server läuft auf http://localhost:${port}`));
