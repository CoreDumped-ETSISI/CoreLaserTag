
'use strict'

const Shot = require ('../Models/Shot')
const Match = require ('../Models/Match')
const User = require ('../Models/User')
const config = require('../config')

function getShots (req, res) {
  Shot.find({}, (err, shots) => {
    if(err) return res.status(500).send({message: `Error while processing request`})
    if(!shots) return res.status(404).send({message: `No shots found`})

    res.status(200).send({shots})
  })
}


function getShot (req,res){
  Shot.find({idEmisor: req.query.idEmisor},(err, shot)=> {
    if(err) return res.status(500).send({message: `Error while processing request`})
    if(!shot) return res.status(404).send({message: `No shots found`})
    res.status(200).send({shot})
  })
}


function createShot (req, res) {
  let shot = new Shot ()
  shot.idEmisor=req.body.idEmisor;
  shot.idReceptor=req.body.idReceptor;

  var userShotDown = User.find({idUser: idReceptor}, (err, userShot) => {
    if(err) return res.status(500).send({message: `Error while processing gunned down man search: ${err}`});
    if(!userShot) return res.status(404).send({message: `It seems like no one was shot here. User not found`})
    userShot.lp -= config.damage

  }).then(
    userShot.save(function (err, userShotSaved) {
      if(err) return res.status(500).send({message: `Error saving the shot down poor buddy`})
    })
  )

  var userWhoShoots = User.find({idUser: idEmisor} , (err, gunner) => {
    if(err) return res.status(500).send({message: `Error processing gunner search`})
    if(!gunner) return res.status(500).send({message: `It seems like nobody shot here`})
    gunner.point += config.pointsPerShot

  }).then(
    gunner.save(function (err, gunnerSaved) {
      if(err) return res.status(500).send({message: `Error saving gunner new stats`})
    })

  ).then(
    shot.save(function (err, shotSaved) {
      if(err) return res.status(500).send({message: `Error saving shot. Someone shot just nothing. Billy died because he wanted to`})
      else {
        var stillActive = 1
        if(userShotDown.lp <= 0) stillActive = 0
        return res.status(200).send({stillActive})
        //If stillActive is 1, user can still play (still has hitpoints). If it's 0, he's definitively dead.
      }
    })
  )
}



function deleteShot (req, res) {
  let idEmisor = req.body.idEmisor

  if(idEmisor == undefined)
    return res.status(404).send({message: 'Error shot undefined'})

  Shot.findOne({idEmisor: idEmisor}, (err, shots) => {
    if(err) return res.status (500).send({message:`Error while processing request`})
    if(!shots) return res.status(404).send({message: 'Shot not in database'})

    Shot.remove({idEmisor: idEmisor}).exec((err, shotDeleted) => {
      if(err) return res.status(500).send({message: `Error while processing request: ${err}`})
      if(!shotDeleted) return res.status(404).send({message: ''})

      res.status(200).send({message: `Shot deleted`})
    })
  })
}


function deleteAllShot (req, res) {

  Shot.find({}, (err, shots) => {
    if(err) return res.status (500).send({message:`Error while processing request`})
    if(!shots) return res.status(404).send({message: 'Shot not in database'})

    Shot.remove(shots).exec((err, shotDeleted) => {
      if(err) return res.status(500).send({message: `Error while processing request: ${err}`})
      if(!shotDeleted) return res.status(404).send({message: 'Not shot in database'})

      res.status(200).send({message: `All shot deleted`})
    })
  })
}


module.exports = {
  getShots,
  getShot,
  createShot,
  deleteShot,
  deleteAllShot
}
