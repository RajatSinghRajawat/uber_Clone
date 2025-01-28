const mongoose = require('mongoose')


const rideSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'UserDetails',
        required: true
    },
    captain: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'CaptainDetails'
    },
    pickup: {
        type: String,
        required: true

    },
    destination: {
        type: String,
        required: true
    },
    fare: {
        type: Number,
        required: true
    },
    status: {
        type: String,
        enum: ['pending', 'accepted', 'completed', 'cancelled'],
        default: 'pending'

    },
    duration: {
        type: Number,
    },
    distance:{
        type:Number
    },
    paymentId:{
        type: String
    },
    orderId:{
        type: String
    },
    signature:{
        type: String,
    }

})


const rideModel = mongoose.model('ride'  , rideSchema)


module.exports = rideModel