'use strict'

var jwt = require ('jwt-simple');

var moment = require('moment');

var secret = 'clave_secreta_de_curso_angular4_avanzado';

exports.ensureAuth = function (req, res, next){
   if (!req.headers.authorization){
       return res.status(403).send({message: 'Falta cabecera de autenticación'});
   }
   var token = req.headers.authorization.replace(/['"]+/g, '');
   
   try {
     var payload = jwt.decode(token, secret);

     if ( payload.exp <= moment().unix()){
         return res.status(401).send({
             message: 'Token expirado',
             payload: payload
         });
     }
   }
   catch (ex){
    return res.status(404).send({
        message: 'El token NO es válido'
    });
   }

   req.user = payload;

   next();

}