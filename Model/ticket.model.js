const mongoose = require('mongoose');
const User = require('./user.model');

const ticketSchema = new mongoose.Schema({
    userId:{type:mongoose.Schema.Types.ObjectId,ref:User},
    tickets: [[]],
});

const Ticket = mongoose.model('tickets', ticketSchema);

module.exports = Ticket;