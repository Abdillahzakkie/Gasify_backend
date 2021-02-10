const mongoose = require('mongoose');

const GenerateReferralID = new mongoose.Schema({
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

module.exports = mongoose.model("GenerateReferralID", GenerateReferralID);