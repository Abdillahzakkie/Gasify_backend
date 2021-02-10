const mongoose = require('mongoose');

const newUserSchema = new mongoose.Schema({
    user: {
        type: String,
        required: true
    },
    referralID: {
        type: String,
        required: true
    }
}, {
    timestamps: true
});


module.exports = new mongoose.model("ReferralRegistrgation", newUserSchema);