'use strict'

var mongoose = require ('mongoose');

var app = require('./app');

var port =3789;

mongoose.Promise = global.Promise;

mongoose.set('useNewUrlParser', true);
mongoose.set('useFindAndModify', false);
mongoose.set('useCreateIndex', true);
mongoose.set('useUnifiedTopology', true);

mongoose.connect('mongodb://localhost:27017/zoo')
       .then( () => {            
           console.log ('La conexión a la bbdd zoo se ha realizado correctamente.');
           app.listen(port, () =>{
               console.log ('El servidor local con Node y Express se está ejecutando correctamente.')
           });
       })
       .catch (err=>console.log(err));

