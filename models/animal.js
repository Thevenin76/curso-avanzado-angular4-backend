'use strict'

var moongose = require ('moongoose');

var Schema = moongose.Schema;

var AnimalSchema = Schema({
    name: String,
    description: String,
    year: Number,
    image: String,
    user: {type: Schema.ObjectId, ref: 'User'}
 });
 
 module.exports = mongoose.model('Animal', AnimalSchema);
