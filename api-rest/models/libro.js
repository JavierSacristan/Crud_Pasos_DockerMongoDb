'use strict'
const mongoose = require('mongoose')
const Schema = mongoose.Schema
const LibrosSchema = Schema({
isbn: String,
titulo: String,
autor: String,
editorial: String,
paginas:Number
})
module.exports = mongoose.model('Libros',LibrosSchema)