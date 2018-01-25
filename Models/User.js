'use strict'

const mongoose = require ('mongoose')
const Schema = mongoose.Schema

const UserSchema = new Schema({
  lp: Number, //lifepoints
  nickname: String,
  point: Number //userPoints
});

module.exports = mongoose.model('User', UserSchema)
