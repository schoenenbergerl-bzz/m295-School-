const fs = require('node:fs').promises;  // Verwenden der Promise-basierten API von fs
function leseDateiInhalt(filepath) {
    return fs.readFile(filepath, 'utf8');
}

leseDateiInhalt('beispiel.txt')
    .then(inhalt => {
        console.log('Die Länge des Dateiinhalts beträgt:', inhalt.length);
    })
    .catch(err => {
        console.error('Fehler beim Lesen der Datei:', err);
    });
