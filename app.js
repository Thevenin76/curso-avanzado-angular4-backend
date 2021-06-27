'use strict'

var express = require ('express');
//var bodyParser = require ('body-parser');

var app = express();

// Cargar rutas
var user_routes = require('./routes/user');

// Middelwares de body-parser
app.use(express.urlencoded({ extended: true }));

app.use(express.json());

// Configurar cabeceras y cors

// Rutas 
app.use('/api', user_routes)

/*
app.get ('/probando', (req, res)=>{
    res.status(200).send({message: 'Este es el método probando'});
})*/

module.exports = app;