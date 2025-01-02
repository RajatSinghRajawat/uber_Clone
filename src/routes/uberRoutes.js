const express = require('express')

const { body } = require('express-validator')
const { registerUser, loginUser, getProfile, logout } = require('../controller/uberController')
const { validationResult } = require('express-validator')
const { verificationuser } = require('../middlware/verify')
// const verification = require('../middlware/verify')

const router = express.Router()

/////register
router.post('/register', [
    body('email').isEmail().withMessage('Invalid Email'),
    body('fullName.firstName').isLength({ min: 3 }).withMessage('firstName is required'),
    body('password').isLength({ min: 6 }).withMessage('password must be 6 number')

], registerUser)


router.post('/loginuser', [
    body('email').isEmail().withMessage('Invalid Email'),
    body('password').isLength({ min: 6 }).withMessage('password must be atLeast 6 number')

], loginUser)

router.get('/profile' ,verificationuser, getProfile)
router.get('/logout' , logout)



//captainroutes

module.exports = router