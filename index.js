const express = require('express')
const app = express()
const router = require('express').Router()
const cors = require('cors')
const bodyparser = require('body-parser')
const mongoose = require('mongoose')

app.use(cors());

app.use(bodyparser.json())
app.use(bodyparser.urlencoded({ extended: true }));

const PORT =  4000;

const URL = 'mongodb://127.0.0.1:27017/restaurant';

mongoose.connect(URL, {useNewUrlParser : true},(err) => {
    if (err) {
    	console.log(err)
        console.log('Error while Connecting!')
    } else {
        console.log('Connected to Mongo DB')
    }
})

const RoomRoute = require('./routes/roomroute');
app.use('/room', RoomRoute);

const ReceipeRoute = require('./routes/receiperoute');
app.use('/receipe', ReceipeRoute);

app.listen(PORT, () => {
    console.log('Server Started on PORT ' + PORT)
})