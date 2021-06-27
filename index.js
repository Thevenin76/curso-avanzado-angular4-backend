'use strict'

var mongoose = require ('mongoose');


mongoose.connect('mongodb://localhost:27017/zoo', (err, res) => {
     if (err){
         throw err;
     } else {
         console.log ('LA conexión a la bbdd zoo se ha realizado correctamente.')
     }
});