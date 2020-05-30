const mongoose = require('mongoose')

const ReceipeSchema = mongoose.Schema({
    receipeName: {
      type: String,
      unique : true
    },
    receipeOfferQuantity :{
      type: String,
    },  
    receipeAvailablity : {
     type : Boolean,
     default : true,
    },
    receipePrice:{
      type: Number,
      default : 20,
    },
  })

  module.exports = mongoose.model('ReceipeDetails', ReceipeSchema);