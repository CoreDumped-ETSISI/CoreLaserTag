'use strict'


const mongoose = require ('mongoose')
const Schema = mongoose.Schema


const ShotSchema = new Schema({
  idEmisor: String,
  idReceptor: String
});

module.exports= mongoose.model('Shot', ShotSchema)
