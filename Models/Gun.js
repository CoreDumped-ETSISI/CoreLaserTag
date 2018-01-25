'use strict'

const mongoose = require ('mongoose')
const Schema = mongoose.Schema

const GunSchema = new Schema({
  idGun: String,
  damage: Number
});

module.exports = mongoose.model('Gun', GunSchema)
