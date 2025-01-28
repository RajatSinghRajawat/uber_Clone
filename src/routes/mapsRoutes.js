const express = require('express')
const Mrouter = express.Router()
const { verificationuser } = require('../middlware/verify')
const { getCordinate, getDistance, suggestions } = require('../controller/mapsController')
const { query } = require('express-validator')


Mrouter.get('/get-coordinates',
    query('address').isString().isLength({ min: 3 }).withMessage('address must be atLeast 3 char')
    ,
    getCordinate)

Mrouter.get('/get-distance-time',
    query('origin').isString().isLength({ min: 3 }).withMessage('origin must be atLeast 3 char'),
    query('destination').isString().isLength({ min: 3 }).withMessage('destination must be atLeast 3 char')
    ,
    getDistance)

Mrouter.get('/get-suggestions',
    query('input').isString().isLength({ min: 3 }).withMessage('input must be atLeast 3 char'),
    suggestions)



module.exports = Mrouter