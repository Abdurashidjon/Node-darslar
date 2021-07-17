const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
    res.sender('index', {
        title: 'my express app',
        greeting: 'Assalomu alaykum'
    })
}); 
module.exports = router;