'use strict'

const User = require ('../Models/User')

/*
CODIGOS DE ERROR A APLICAR EN RES.STATUS:
500 - Internal Server Error, fallo del servidor, generalmente es que no se ha podido acceder a la BBDD por lo que sea.
404 - Not found, esto quiere decir que no se encuentra la información (el usuario que se busca no existe).
400 - Forbidden, no se disponen de credenciales para acceder a la info, o ésta es privada.
200 - OK, se devuelve la info solicitada junto con este código.

Hay muchos más, pero no los necesitamos en este caso concreto. Todos los métodos deben tratar estas excepciones.

(Es el único y último comentario
rs que os pongo en español, pero quería asegurarme de que lo entendiérais).
*/
function getUsers (req, res) {
  User.find({}, (err, users) => {
    if(err) return res.status(500).send({message: `Error while processing request`})
    if(!users) return res.status(404).send({message: `No users found`})

    res.status(200).send({ users })
  })
}

function getUser (req, res) {
  let nickname = req.query.nickname

  User.findOne({nickname: nickname}, (err, user) => {
    if(err) return res.status (500).send({message:`Error while processing request`})
    if(!user) return res.status(404).send({message: `No user found`});
    console.log(user)
    res.status(200).send({user})
  })
}

function createUser (req, res) {
  let user = new User ()
  user.nickname= req.body.nickname
  user.point= 0
  if(user.nickname == undefined)
    return res.status(404).send({message: 'Error user undefined'})

  User.findOne({nickname: user.nickname}, (err, users) => {
    if(err) return res.status (500).send({message:`Error while processing request`})
    if(users) return res.status(404).send({message: 'User already in database'})
    user.save(function (err, userSaved) {
      if(err) return res.status(500).send({message: `Error while processing request: ${err}`});

      res.status(200).send({message: `User created`})
    })
  })
}

function deleteUser (req, res) {
  let nickname = req.body.nickname

  if(nickname == undefined)
    return res.status(404).send({message: 'Error user undefined'})

  User.findOne({nickname: nickname}, (err, users) => {
    if(err) return res.status (500).send({message:`Error while processing request`})
    if(!users) return res.status(404).send({message: 'User not in database'})

    User.remove({nickname: nickname}).exec((err, userDeleted) => {
      if(err) return res.status(500).send({message: `Error while processing request: ${err}`})
      if(!userDeleted) return res.status(404).send({message: ''})

      res.status(200).send({message: `User deleted`})
    })
  })
}

function deleteAllUser (req, res) {

  User.find({}, (err, users) => {
    if(err) return res.status (500).send({message:`Error while processing request`})
    if(!users) return res.status(404).send({message: 'User not in database'})

    User.remove(users).exec((err, userDeleted) => {
      if(err) return res.status(500).send({message: `Error while processing request: ${err}`})
      if(!userDeleted) return res.status(404).send({message: 'Not user in database'})

      res.status(200).send({message: `All user deleted`})
    })
  })
}


module.exports = {
  getUsers,
  getUser,
  createUser,
  deleteUser,
  deleteAllUser
}
