const express = require('express');
const app = express();
const port = 3000;
const path = require("path")









app.get('/now', async (_, res) => {
    const now = new Date().toLocaleTimeString();
    res.send(now);
});

app.get('/zli', async (req, res) => {
    const zliUrl = 'https://www.zli.ch'
    res.redirect(301, zliUrl)
});

app.get('/name', async (request, response) => {
    const randomInt = Math.floor(Math.random() * 21);
    const names = [
        "Alice", "Bob", "Charlie", "David", "Eve", "Frank",
        "Grace", "Hannah", "Ivan", "Julia", "Kevin", "Laura",
        "Michael", "Nora", "Oliver", "Pamela", "Quentin",
        "Rachel", "Steve", "Tina"
    ];
    response.send(names[randomInt]);
});

app.get('/html', async (request, response) => {
    response.sendFile(path.join(__dirname, 'exampleHtml.html'));
})

app.get('/image', async (request, response) => {
    response.sendFile(path.join(__dirname, 'exampleimage.jpg'));
})

app.get('/teapot', async (request, response) => {
    response.sendStatus(418);
})

app.get('/user-agent', async (request, response) => {
    response.send(request.rawHeaders[15]);
})

app.get('/secret', async (request, response) => {
    response.sendStatus(403);
})

app.get('/xml', async (request, response) => {
    response.sendFile(path.join(__dirname, 'xml.xml'));
})

app.get('/me', async (request, response) => {
    const myInfo = {
        Vorname: "Max",
        Nachname: "Mustermann",
        Alter: 28,
        Wohnort: "Musterstadt",
        Augenfarbe: "Blau"
    };
    response.json(myInfo);
})


app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
});