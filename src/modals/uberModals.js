const mongoose = require('mongoose');

const UBerSchema = new mongoose.Schema({
    fullName: {
        firstName: { type: String, required: true },
        lastName: { type: String, required: true,  }
    },
    email: { type: String, required: true, unique: true , select:false },
    password: { type: String, required: true }
}, {
    timestamps: true
});
const uberModel = mongoose.model('Uber', UBerSchema);


module.exports = uberModel