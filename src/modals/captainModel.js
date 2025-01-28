const mongoose = require('mongoose')


const captainSchema = new mongoose.Schema({
    fullName: {
        firstName: { type: String, required: true },
        lastName: { type: String }
    },
    email: { type: String, required: true, unique: true},
    password: { type: String, required: true  },
    socketId:{
        type:String
    },
    Status:{
        type:String,
        enum:['active','inactive'],
        defult:'inactive'
    },
    vehicle:{
        color:{
            type:String,
            required:true,
            minlength:[3,'color at least 3 characte rlong']


        },
        plate:{
            type:String,
            required:true,
            minlength:[3,'plate at least 3 haracter long']

        },
        capacity:{
            type:Number,
            required:true,
            min:[1,'capacity at least 1']
        },
        vehicleType:{
            type:String,
            required:true,
            enum:['car','bike','auto']
        }
    },
    location:{
        lat:{
            type:Number
        },
        lng:{
            type:Number
        }
    }

})

const captainModel = mongoose.model('CaptainDetails',captainSchema)

module.exports = captainModel