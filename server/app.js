require('dotenv').config()
const express = require('express'),
    app = express(),
    port = process.env.PORT || 5000,
    cors = require('cors'),
    mongoose = require('mongoose'),
    router = require('./routes/routers')

mongoose.connect('mongodb://localhost:27017/classic_fox_live_code_1', { useNewUrlParser: true })
app.use(express.urlencoded({ extended: false }))
app.use(express.json())
app.use(cors())

app.use('/', router)

app.listen(port, function () {
    console.log('Listening on port: ', port)
})