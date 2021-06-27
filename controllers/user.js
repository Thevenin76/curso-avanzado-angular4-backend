'use strict'

function pruebas (req, res){
    res.status(200).send({
        message: 'Probando el controlador de usuarios y la acción pruebas'
    });
}

function saveUser(req, res){
    res.status(200).send({
        message: 'Metodo de Registro'
    });
}

module.exports = {
    pruebas,
    saveUser
}
