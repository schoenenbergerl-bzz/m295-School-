const express = require('express');
const app = express();
const port = 3000;

async function getTemperature(zip) {
    const response = await fetch(`https://app-prod-ws.meteoswiss-app.ch/v1/plzDetail?plz=${zip}00`)
    if(response.status !== 200) {
        throw new Error("Die Anfrage war nicht erfolgreich.")
    }
    const json = await response.json();
    return json.currentWeather.temperature;

}

app.get('/', async (request, response) => {
    const zip = request.query.plz;
    try {
        const temperature = await getTemperature(request.query.plz);
        response.send(`Aktuelle Temperatur ${zip}: ${temperature}C`)
    }  catch {
        response.send(`Ungültige Postleitzahl: ${zip}`);
    }
});

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
});