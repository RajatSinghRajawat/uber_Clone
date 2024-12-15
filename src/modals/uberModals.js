const mongoose = require('mongoose');

const UBerSchema = new mongoose.Schema({
    fullName: {
        firstName: { type: String, required: true },
        lastName: { type: String, required: true }
    },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true }
}, {
    timestamps: true
});
const uberModel = mongoose.model('UBer', UBerSchema);


module.exports = uberModel