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

const GuestBillSchema = mongoose.Schema({
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
    class : {
      type : String,
      default : "Air Conditioned",
    }
  })

  module.exports = mongoose.model('GuestBillDetails', GuestBillSchema);