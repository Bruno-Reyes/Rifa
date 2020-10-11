const mongoose = require('mongoose')
const config = require('./keys')

const dbOptions= {
    useNewUrlParser : true,
    useUnifiedTopology : true
}

mongoose.connect(config.URI, dbOptions)

const connection = mongoose.connection

connection.once('open', () => {
    console.log('MongoDB connection stablished')
})

connection.on('error', err => {
    console.log(err)
    process.exit(0)  
})