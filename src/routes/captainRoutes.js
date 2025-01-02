const express = require('express')

const { body } = require('express-validator')
const { registerUser, loginUser, getProfile, logout } = require('../controller/uberController')
const { validationResult } = require('express-validator')
// const verificationCaptain = require('../middlware/verify')
const {registerCaptain ,loginCaptain, logoutCaptain, getprofileCaptain} = require('../controller/capitainController')
const { verificationCaptain } = require('../middlware/verify')

const captainrouter = express.Router()
// captainrouter.post('/register', registerCaptain)
captainrouter.post('/register', [
    body('email').isEmail().withMessage('Invalid Email'),
    body('fullName.firstName').isLength({ min: 3 }).withMessage('firstName is required'),
    body('password').isLength({ min: 6 }).withMessage('password must be 6 number'),
    body('vehicle.color').isLength({ min: 3 }).withMessage('colour must be 3 char'),
    body('vehicle.capacity').isLength({ min: 1 }).withMessage('capacity must be 3 char'),
    body('vehicle.plate').isLength({ min: 1}).withMessage('plate must be atleast 1 integer'),
    body('vehicle.vehicleType').isIn(['car','bike','auto']).withMessage('invalid vehicleType'),


], registerCaptain)


captainrouter.post('/loginCaptain', [
    body('email').isEmail().withMessage('Invalid Email'),
    body('password').isLength({ min: 6 }).withMessage('password must be atLeast 6 number')

], loginCaptain)

captainrouter.get('/profile', verificationCaptain , getprofileCaptain)
captainrouter.post('/logoutCaptain' , logoutCaptain)




//captainroutes

module.exports = captainrouter