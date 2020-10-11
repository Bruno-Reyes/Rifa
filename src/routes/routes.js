const {Router} = require('express')
const router = Router()
const validator = require('validator')
const Ticket = require('../models/ticket')

router.get('/list', async (req,res) => {
    let tickets = await Ticket.find()
    res.send(tickets)
})

router.post('/ticket', async (req,res) => {
    let {name,letter,number} = req.body
    let mensaje = {}
    let tick = await Ticket.find({coord:letter+number}).exec()
    if(validator.isEmpty(tick[0].owner)){
        await Ticket.update({coord:tick[0].coord},{owner:name,price:tick[0].price,coord:tick[0].coord})
        mensaje.message = 'Buena suerte! <3'
        mensaje.color = 'success'
        mensaje.title = '¡VENDIDO!'
    }else{
        mensaje.message = 'Este boleto ya fue vendido , intenta con otro :('
        mensaje.color = 'error'
        mensaje.title = '¡PROBLEMA!'
    }
    res.json(mensaje)
})

module.exports = router
