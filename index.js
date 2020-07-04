const express = require('express')
const app = express()
const router = require('express').Router()
const cors = require('cors')
const bodyparser = require('body-parser')
const mongoose = require('mongoose')
const configuration = require('./configuration')

var dbdetails = configuration.dbdetails;

app.use(cors());

app.use(bodyparser.json())
app.use(bodyparser.urlencoded({ extended: true }));

const PORT =  process.env.PORT || 4000;

const URL = 'mongodb://'+dbdetails.username+':'+dbdetails.password+'@'+dbdetails.host+':'+dbdetails.port+'/'+dbdetails.database;

// const URL = 'mongodb://127.0.0.1:27017/restaurant'; //local

mongoose.connect(URL, {useNewUrlParser : true},(err) => {
    if (err) {
    	console.log(err)
        console.log('Error while Connecting!')
    } else {
        console.log('Connected to Mongo DB')
    }
})

app.get('/',function(req,res){
    res.send("Welcome to Mad Teapots Backend Services")
})

const RoomRoute = require('./routes/roomroute');
app.use('/room', RoomRoute);

const ReceipeRoute = require('./routes/receiperoute');
app.use('/receipe', ReceipeRoute);

app.listen(PORT, () => {
    console.log('Server Started on PORT ' + PORT)
})