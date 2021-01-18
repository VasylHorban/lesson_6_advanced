const express = require('express');
const bodiParser = require('body-parser');
const PORT = process.env.PORT || 3000;

const app = express();

app.use(bodiParser.json())
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs')
app.use(express.static(__dirname + '/public'));

const router = require('./routes/rout');

app.listen(PORT, ()=>{
    console.log('Server listening port : ' + PORT)
})
app.use(router);


