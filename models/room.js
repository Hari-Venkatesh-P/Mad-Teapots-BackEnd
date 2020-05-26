const mongoose = require('mongoose')

const RoomSchema = mongoose.Schema({
    roomId: {
      type: String,
      unique : true
    },
    roomType :{
      type: String,
    },  
    userName : {
     type : String,
    },
    availablity:{
      type: Boolean,
    },
    inPersons: {
      type: Number,
    },
    checkInDate: {
      type: String,
      default : Date.now(),
    },
    expectedCheckOutDate: {
        type: String,
        default : Date.now(),
      },
  })

  module.exports = mongoose.model('RoomDetails', RoomSchema);