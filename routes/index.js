'use strict'

const express = require ('express')
const api = express.Router()

const UserController = require ('../Controllers/UserController')
const MatchController = require ('../Controllers/MatchController')
const GunsController = require ('../Controllers/GunController')
const ShotController = require ('../Controllers/ShotController')

//DEFINED ROUTES TO API METHODS

//Users
api.get('/getUsers', UserController.getUsers)
api.get('/getUser', UserController.getUser)
api.post('/createUser', UserController.createUser)
api.post('/deleteUser', UserController.deleteUser)
api.get('/deleteAllUser', UserController.deleteAllUser)

//Match
api.get('/getMatches', MatchController.getMatches)
api.get('/getMatch', MatchController.getMatch)
api.post('/createMatch', MatchController.createMatch)
api.post('/deleteMatch', MatchController.deleteMatch)
api.get('/deleteAllMatch', MatchController.deleteAllMatch)

//Guns
api.get('/getGuns', GunsController.getGuns)
api.get('/getGun', GunsController.getGun)
api.post('/createGun', GunsController.createGun)
api.put('/updateGun', GunsController.updateGun)
api.delete('/deleteGun', GunsController.deleteGun)
api.delete('/deleteAllGuns', GunsController.deleteAllGuns)

//Shots
api.get('/getShots', ShotController.getShots)
api.get('/getShot', ShotController.getShot)
api.post('/createShot', ShotController.createShot)
api.post('/deleteShot', ShotController.deleteShot)
api.get('/deleteAllShot', ShotController.deleteAllShot)

module.exports = api
