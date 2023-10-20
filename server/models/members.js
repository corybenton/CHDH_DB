const mongoose = require('mongoose');

const memberSchema = new mongoose.Schema(
    {
        memberName: [{
            type: String,
            required: true,
            unique: true,
            trim: true,
        }],
        email: [{
            type: String,
            required: true,
            unique: true, 
            trim: true,
        }],
        memberYears: [{
            type: Number,
            required: true,
        }],
        address: {
            type: String,
            unique: true,
            trim: true,
        },
        numberKids: {
            type: Number,
        },
        payer: {
            type: Boolean,
            default: true,
        }
    }
)

const Members = mongoose.model('members', memberSchema);

module.exports = Members;