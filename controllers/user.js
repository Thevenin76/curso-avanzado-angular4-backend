'use strict'

// Módulos
var bcrypt = require('bcrypt-nodejs');

// Modelos
var User = require ('../models/user');

// Acciones
function pruebas (req, res){
    res.status(200).send({
        message: 'Probando el controlador de usuarios y la acción pruebas'
    });
}

function saveUser(req, res){
    
    // Crear objeto de usuario
    var user = new User();

    // Recoger Parametros peticion
    var params = req.body;

      

    if (params.password && params.name && params.surname && params.email){
        user.name = params.name;
        user.surname = params.surname;
        user.email = params.email;
        user.role = 'ROLE_USER';
        user.image = null;

        // Cifrar la contraseña
        bcrypt.hash(params.password, null, null, function(error, hash){
            user.password = hash;

            // Guardo el usurario en la bbdd
            user.save((err, userStored) => {

                if (err){
                    res.status(500).send({message: 'Error al guardar del usuario'});
                } else {
                    if (!userStored){
                        res.status(500).send({message: 'No se ha registrado el usuario'});
                    } else {
                        res.status(200).send({user: userStored});
                    }
                }

            })
        });
    } else {
        res.status(200).send({
            message: 'Introduce los datos de usuario correctamente'
        });
    }

    console.log(params);

}

module.exports = {
    pruebas,
    saveUser
}
