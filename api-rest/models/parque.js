'use strict'
const mongoose = require('mongoose')
const Schema = mongoose.Schema
const ParquesSchema = Schema({
codigo: String,
longitud: String,
latitud: String,
nombre: String,
calle: String,
})
module.exports = mongoose.model('Parques',ParquesSchema)