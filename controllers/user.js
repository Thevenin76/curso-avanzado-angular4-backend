'use strict'

// Módulos
var bcrypt = require('bcrypt-nodejs');

// Modelos
var User = require ('../models/user');

// Servicio 
var jwt = require('../services/jwt');

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


        User.findOne({email: user.email.toLowerCase()}, (err, issetUser) => {

            if (err) {
                res.status(500).send({message: 'Error al comprobar el usuario'});
            }
            else {
                if (!issetUser){
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
                }
                else {
                    res.status(200).send({
                        message: 'El usuario no puede registrarse. Email: '+user.email+' ya existe.'
                    });
                }
            }
        });    
        
    } else {
        res.status(200).send({
            message: 'Introduce los datos de usuario correctamente'
        });
    }

    console.log(params);

}

function login (req, res){

    var params = req.body;

    var email = params.email;
    var password = params.password;

    User.findOne({email: email.toLowerCase()}, (err, user) => {
        if (err) {
           res.status(500).send({message: 'Error al comprobar el usuario'});
        }
        else {
            if (user){ 
                bcrypt.compare(password, user.password, (err, check)=>{
                    if (check){
                        
                        if (params.gettoken){
                            // Devolver 
                            res.status(200).send({
                                token: jwt.createToken(user)
                            })
                       } 
                       else {
                           res.status(200).send({user: userStored});
                       }
                    }
                    else {
                        res.status(400).send({message: 'El inicio de sesión no es correcto. Compruebe usuario/contraseña.'})
                    }

                });
            }
            else {            
                    res.status(404).send({message: 'el usuario o ha podido iniciar sesión.'});
            }
        }
    });
}

function updateUser(req, res){

    var userId = req.params.id;
    var update = req.body;
    console.log(userId);
    console.log(req.user.sub);
    if (userId != req.user.sub){
        return res.status(200).send({
            message: 'No tienes permisos para actualizar el usuario'
        });
    }

    User.findByIdAndUpdate(userId, update, {new: true}, (err, userUpdated) => {
        if (err){
            res.status(500).send({
                message: 'Error al actualizar el usuario'
            })
        }
        else {
            if (!userUpdated){
                res.status(404).send({
                    message: 'No se ha podido actualizar el usuario'
                });
            }
            else {
                res.status(200).send({
                    user: userUpdated
                });
            }
        }
    })


}

module.exports = {
    pruebas,
    saveUser,
    login,
    updateUser
}
