const mongoose = require('mongoose')

const RoomLedgerSchema = mongoose.Schema({
    roomId: {
      type: String,
      unique : true
    },
    firstName : {
     type : String,
    },
    lastName : {
      type : String,
     },
     mobile : {
      type: Number,
    },
    city : {
      type: String,
    },
    address : {
      type: String,
    },
    checkInDate: {
      type: String,
      default : Date.now(),
    },
    checkOutDate : {
        type: String,
    },
    totalDaysofStay : {
        type: Number,
        default : 1,
    },
    status : {
      type: String,
      default : 'Not Vacated',
    }
  })

  module.exports = mongoose.model('RoomLedgerDetails', RoomLedgerSchema);