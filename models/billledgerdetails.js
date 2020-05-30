const mongoose = require('mongoose')

const OrderItemsSchema = mongoose.Schema({
  receipeName: {
    type: String,
    unique : true
  },
  receipeCount:{
    type: Number,
    default : 1,
  },
  receipePrice:{
    type: Number,
    default : 10,
  },
})

const BillLedgerSchema = mongoose.Schema({
    tableNumber : {
        type: String,
    },
    userName: {
      type: String,
      default : "",
    },
    orderItems : {
     type :  [OrderItemsSchema],
     default : [],
    },  
    billAmount : {
     type : Number,
     default : 0,
    },
    starttime : {
        type : String,
        default : "",
    },
    endtime : {
        type : String,
        default : "",
    },
    date :  {
        type : String,
        default : Date.now(),
    },
    class : {
      type : String,
      default : "Air Conditioned",
    },
    status : {
        type : String,
        default : "",
    }
  })

  module.exports = mongoose.model('BillLedgerDetails', BillLedgerSchema);