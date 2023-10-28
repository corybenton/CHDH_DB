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
        agesOfKids: [{
            type: Number,
        }],
        payer: {
            type: Boolean,
            default: true,
        },
        notes: {
            type: String,
        }
    }
)

const Members = mongoose.model('members', memberSchema);

module.exports = Members;