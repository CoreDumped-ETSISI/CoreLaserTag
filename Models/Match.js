'use strict'

const mongoose = require ('mongoose')
const Schema = mongoose.Schema

const MatchSchema = new Schema({
  time: String,
  duration: Number,
  teams: [{}],
  type: String
});

module.exports = mongoose.model('Match', MatchSchema)
