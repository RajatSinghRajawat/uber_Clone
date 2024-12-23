const express = require('express')

const { body } = require('express-validator')
const { registerUser, loginUser, getProfile } = require('../controller/uberController')
const { validationResult } = require('express-validator')
const verification = require('../middlware/verify')

const router = express.Router()

router.post('/register', [
    body('email').isEmail().withMessage('Invalid Email'),
    body('fullName.firstName').isLength({ min: 3 }).withMessage('firstName is required'),
    body('password').isLength({ min: 6 }).withMessage('password must be 6 number')

], registerUser)


router.post('/loginuser', [
    body('email').isEmail().withMessage('Invalid Email'),
    body('password').isLength({ min: 6 }).withMessage('password must be atLeast 6 number')

], loginUser)

router.get('/profile' , verification, getProfile)


module.exports = router