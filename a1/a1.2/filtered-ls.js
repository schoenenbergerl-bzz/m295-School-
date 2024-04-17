const fs = require('fs');
const path = require('path');
const dirPath = process.argv[2];
const extFilter = '.' + process.argv[3];

fs.readdir(dirPath, (err, list) => {
    if (err) return console.error(err);
    list.forEach(file => {
        if (path.extname(file) === extFilter) {
            console.log(file);
        }
    });
});
