'use strict'

var mongoose = require ('mongoose');

mongoose.Promise = global.Promise;

mongoose.set('useNewUrlParser', true);
mongoose.set('useFindAndModify', false);
mongoose.set('useCreateIndex', true);
mongoose.set('useUnifiedTopology', true);

mongoose.connect('mongodb://localhost:27017/zoo')
        .then( () => {            
           console.log ('LA conexión a la bbdd zoo se ha realizado correctamente.')
       })
       .catch (err=>console.log('err'));