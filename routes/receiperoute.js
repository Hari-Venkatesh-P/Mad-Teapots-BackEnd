const router = require('express').Router()

const ReceipeService = require('../services/receipeservice')

router.post("/addreceipe",ReceipeService.addReceipe)
router.post("/addreceipetobill",ReceipeService.addReceipeToBill)
router.post("/addtable",ReceipeService.addTable)
router.get("/getalltables",ReceipeService.getAllTable)
router.get("/gettablebyid",ReceipeService.getTableById)
router.post("/receipeavailablitytoggle",ReceipeService.receipeAvailablityToogle)
router.post("/registerguest",ReceipeService.registerGuest)
router.post("/paybill",ReceipeService.payBill)
router.get("/getallreceipe",ReceipeService.getAllReceipe)
router.post("/deletereceipebyid",ReceipeService.deleteReceipe)

module.exports = router;