const mongoose = require('mongoose')

const tickets = new mongoose.Schema({
    ticketNumber: {
        type: Number,
        required: true
    },
    subject: {
        type: String,
        required: true
    },
    problem: {
        type: String,
        required: true
    },
    solution: {
        type: String,
        required: false
    },
    callerName: {
        type: String,
        required: false,
        default: null
    },
    createdAt: {
        type: Date,
        required: true,
        default: Date.now
    },
    closedAt: {
        type: Date,
        required: false,
        default: null
    },
    ackTime: {
        type: Date,
        required: false
    },
    assignedEng: {
        type: Number,
        required: false
    },
    nextSteps: {
        type: Array,
        required: false
    },
    age: {
        type: Number,
        required: false
    },
    project: {
        type: Boolean,
        required: true,
        default: false
    }
})

module.exports = mongoose.model('tickets', tickets)