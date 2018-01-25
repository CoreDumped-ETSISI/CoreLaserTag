'use strict'

const Match = require ('../Models/Match')
const moment = require ("moment")
const User = require ("../Models/User")

function getMatches (req, res) {
  Match.find({}, (err, idMatchs) => {
    if(err) return res.status(500).send({message: `Error while processing request`})
    if(!idMatchs) return res.status(404).send({message: `No match found`})

    res.status(200).send({ idMatchs })
  })
}


function getMatch (req, res){
  let idMatch = req.query.idMatch
  Match.find({_id: idMatch}, (err, match) => {
    if(err) return res.status (500).send({message:`Error while processing request`})
    if(!match) return res.status(404).send({message: `No match found`});

    res.status(200).send({match})
  })
}

function createMatch (req, res) {
  let match = new Match()
  let user = new User()
  match.time = moment().add(1.5, "minutes").unix()
  match.duration = req.body.time
  match.teams = req.body.teams
  var users = []
  for (var i = 0; i < req.body.teams.length; i++) {
    users.push(req.body.teams[i].idUser)
  }
  User.update({_id: {$in: users}}, { lp: req.body.life }, {multi: true}, (err, users) => {

  })

  match.save(function (err, matchSaved) {
    if(err) return res.status(500).send({message: `Error while processing request: ${err}`});
    return res.status(200).send({message: `Match created`})

  })
}

function deleteMatch (req, res) {
  let idMatch = req.body.idMatch

  if(idMatch == undefined)
    return res.status(404).send({message: 'Error match undefined'})

  Match.findOne({_id: idMatch}, (err, match) => {
    if(err) return res.status (500).send({message:`Error while processing request`})
    if(!match) return res.status(404).send({message: 'Match not in database'})

    Match.remove({_id: idMatch}).exec((err, matchDeleted) => {
      if(err) return res.status(500).send({message: `Error while processing request: ${err}`})
      if(!matchDeleted) return res.status(404).send({message: ''})

      res.status(200).send({message: `match deleted`})
    })
  })
}

function deleteAllMatch (req, res) {

  Match.find({}, (err, matchs) => {
    if(err) return res.status (500).send({message:`Error while processing request`})
    if(!matchs) return res.status(404).send({message: 'Match not in database'})

    Match.remove(matchs).exec((err, matchDeleted) => {
      if(err) return res.status(500).send({message: `Error while processing request: ${err}`})
      if(!matchDeleted) return res.status(404).send({message: 'Not match in database'})

      res.status(200).send({message: `All matchs deleted`})
    })
  })
}

module.exports = {
  getMatches,
  getMatch,
  createMatch,
  deleteMatch,
  deleteAllMatch
}
