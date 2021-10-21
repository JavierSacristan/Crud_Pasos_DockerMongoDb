'use strict'
const mongoose = require('mongoose')
const Schema = mongoose.Schema
const PasosSchema = Schema({
idRegistro: String,
direccion: String,
latitud: String,
longitud: String,

})
module.exports = mongoose.model('Pasos',PasosSchema)