const mongoose = require('mongoose');

const UBerSchema = new mongoose.Schema({
    fullName: {
        firstName: { type: String, required: true },
        lastName: { type: String, required: true,  }
    },
    email: { type: String, required: true, unique: true},
    password: { type: String, required: true  },
    socketId:{
        type:String
    }
}, {
    timestamps: true
});
const uberModel = mongoose.model('UserDetails', UBerSchema);


module.exports = uberModel