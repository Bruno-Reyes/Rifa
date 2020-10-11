const express = require('express')
const morgan = require('morgan')
const path = require('path')

let app = express()
require('./database')
app.set('port', process.env.PORT || 4000)
app.use(morgan('dev'))
app.use(express.json({extened:false}))
app.use(express.static(path.join(__dirname,'public')))
app.use(require('./routes/routes'))

app.listen(app.get('port') , () => {
    console.log('Servidor en el puerto: ',app.get('port'))
})