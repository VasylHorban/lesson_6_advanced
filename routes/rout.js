const express = require('express');
const router = express.Router();
const currencyController = require('../controller/converter');

router.get('/', (req, res)=> {
    res.render('index')
})

router.post('/', (req, res) =>{
    currencyController.get_currency(req, res);
})

router.use((req, res) => {
    res.status(404).render('404')
})

module.exports = router;