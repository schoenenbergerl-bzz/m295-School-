const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
    res.send('Liste der ausgeliehenen Artikel');
});


module.exports = router;
