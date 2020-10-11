const { Schema, model } = require('mongoose')

const ticketSchema = new Schema({
    owner: String,
    coord: String,
    price: String
})

module.exports = model('Ticket', ticketSchema)