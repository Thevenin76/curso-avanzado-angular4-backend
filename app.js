'use strict'

var express = require ('express');
//var bodyParser = require ('body-parser');

var app = express();

// Cargar rutas

// Middelwares de body-parser
app.use(express.urlencoded({ extended: true }));

app.use(express.json());

// Configurar cabeceras y cors
// Rutas body-parser

app.get ('/probando', (req, res)=>{
    res.status(200).send({message: 'Este es el método probando'});
})

module.exports = app;