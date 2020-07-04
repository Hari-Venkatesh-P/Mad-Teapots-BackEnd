const Receipe  = require('../models/receipe')
const GuestBill  = require('../models/guestbill')
const BillLedger = require('../models/billledgerdetails')


function addReceipe(req,res){
    try{
        Receipe.findOne({receipeName : req.body.receipeName}, function (err, receipe){
            if(receipe){
              res.status(201).json({
                  success:false,
                  message:"Receipe already exists"
              })
            }else{
                receipe = new Receipe({
                    receipeName : req.body.receipeName,
                    receipeOfferQuantity : req.body.receipeOfferQuantity,
                    receipeAvailablity : true,
                    receipePrice : parseInt(req.body.receipePrice),
                })
                receipe.save((err,docs)=>{
                    if(err){
                        res.status(201).send({
                            success: false,
                            message: 'Error in saving the receipe.'
                        })
                    }else{
                        res.status(200).send({
                            success: true,
                            message: 'Receipe saved successfully.'
                        })
                    }
                })
            }
        })
    }catch(error){
        res.status(500).json({
            success:false,
            message:error
        })
    }
}

function addTable(req,res){
    console.log("API hit to add table method")
    try{
        GuestBill.findOne({tableNumber : req.body.tableNumber,class : req.body.class}, function (err, guestbill){
            if(guestbill){
              res.status(201).json({
                  success:false,
                  message:"Table already exists"
              })
            }else{
                guestBill = new GuestBill({
                    class : req.body.class,
                    tableNumber : req.body.tableNumber,
                })
                guestBill.save((err,docs)=>{
                    if(err){
                        console.log(err)
                        res.status(201).send({
                            success: false,
                            message: 'Error in creating the table.'
                        })

                    }else{
                        res.status(200).send({
                            success: true,
                            message: 'Default table Created Succeessfully.'
                        })
                    }
                })
            }
        })
    }catch(error){
        res.status(500).json({
            success:false,
            message:error
        })
    }
}


function getAllTable(req,res){
    console.log("API hit to find table method")
    try{
        GuestBill.find(function (err, guestbill){
            if(!guestbill){
              res.status(201).json({
                  success:false,
                  message:"No Tables"
              })
            }else{
                res.status(200).json({
                    success:true,
                    message:guestbill
                })
            }
        })
    }catch(error){
        res.status(500).json({
            success:false,
            message:error
        })
    }
}


function getOrderDetailsByTableId(req,res){
    console.log("API hit to find table method")
    try{
        GuestBill.findOne({_id:req.params.id},function (err, orderItemDocs){
            if(!orderItemDocs){
              res.status(201).json({
                  success:false,
                  message:"No Orders found for this table"
              })
            }else{
                res.status(200).json({
                    success:true,
                    message:orderItemDocs
                })
            }
        })
    }catch(error){
        res.status(500).json({
            success:false,
            message:error
        })
    }
}

function getTableById(req,res){
    console.log("API hit to find table by id method")
    try{
        GuestBill.findOne({_id : req.params._id},function (err, guestbill){
            if(!guestbill){
              res.status(201).json({
                  success:false,
                  message:"No Tables with specified id"
              })
            }else{
                res.status(200).json({
                    success:true,
                    message:guestbill
                })
            }
        })
    }catch(error){
        res.status(500).json({
            success:false,
            message:error
        })
    }
}


function addReceipeToBill(req,res){
    console.log("API hit to find table method")
    try{
        Receipe.findOne({receipeName : req.body.receipeName , receipeAvailablity: true}, function (err, receipe){
            console.log(receipe)
            if(!receipe){
              res.status(201).json({
                  success:false,
                  message:"Selected receipe could not be found."
              })
            }else{
                GuestBill.findOne({_id : req.body._id},function (err, guestbill){
                    console.log(guestbill)
                    if(!guestbill){
                        res.status(201).send({
                            success: false,
                            message: 'Error in finding the bill in guest bill document.'
                        })
                    }else{
                        billAmount = 0
                        alreadyExistReceipeFlag = false
                        for(i=0;i<guestbill.orderItems.length;i++){
                            if(guestbill.orderItems[i].receipeName === req.body.receipeName){
                                guestbill.orderItems[i].receipeCount =  parseInt(guestbill.orderItems[i].receipeCount) + 1
                                alreadyExistReceipeFlag = true
                            }
                        }
                        if(alreadyExistReceipeFlag == false){
                            guestbill.orderItems.push({receipeName: receipe.receipeName,receipePrice :receipe.receipePrice });
                        }
                        for(i=0;i<guestbill.orderItems.length;i++){
                            count = parseInt(guestbill.orderItems[i].receipeCount)
                            amount = parseInt(guestbill.orderItems[i].receipePrice)
                            billAmount = billAmount +(count*amount)
                        }
                        guestbill.billAmount = billAmount
                        guestbill.save((err,bills) =>{
                            if(err){
                                res.status(201).send({
                                    success: false,
                                    message: 'Error in adding the receipe to the bill'
                                })
                            }else{
                                res.status(200).send({
                                    success: true,
                                    message: 'Receipe added to bill successfully.'
                                })
                            }
                        });
                    }
                })
            }
        })
    }catch(error){
        res.status(500).json({
            success:false,
            message:error
        })
    }
}


function receipeAvailablityToogle(req,res){
    console.log("API hit to receipe availability toggle method")
    try{
        Receipe.findOne({_id : req.body._id},function (err, receipe){
            if(!receipe || err){
              res.status(201).json({
                  success:false,
                  message:"No Receipe Found"
              })
            }else{
                console.log(receipe.receipeAvailablity)
                if(receipe.receipeAvailablity == true){
                    console.log("Inside If")
                    receipe.receipeAvailablity = false
                }else{
                    console.log("Inside Else")
                    receipe.receipeAvailablity = true
                }
                receipe.save((err,savedreceipe)=>{
                    if(!err){
                        res.status(200).json({
                            success:true,
                            message:"Receipe availability updated successfully"
                        })
                    }else{
                        res.status(201).json({
                            success:false,
                            message:"Unable to update the availability"
                        })
                    }
                })
            }
        })
    }catch(error){
        res.status(500).json({
            success:false,
            message:error
        })
    }
}

async function getMaxLedgerId(req,res){
   await  BillLedger.find({},(err,ledgers)=>{
        if (ledgers.length==0) {
            id = 1
        } else {
            maxid = ledgers[0].ledgerid
            for(i=0;i<ledgers.length;i++){
                if(parseInt(ledgers[i].ledgerid)>maxid){
                    maxid = parseInt(ledgers[i].ledgerid)
                }
            }
        id = maxid+1
        }
    })
    console.log(id)
    res.json({
        id:id
    })
}

function registerGuest(req,res){
    console.log("API hit to register guest method")
    try{
        var id = 0
         GuestBill.findOne({class : req.body.class , userName: '' },function (err, table){
            if(!table || err){
              res.status(201).json({
                  success:false,
                  message:"Tables Occupied in this class"
              })
            }else{
                table.userName = req.body.userName
                table.save(async (err,savedtables) =>{
                    if(!err){
                        var today = new Date();
                        var date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();
                        var starttime = today.getHours()+':'+today.getMinutes()+":"+today.getSeconds();
                         billledger = new BillLedger({
                            tableNumber : table.tableNumber,
                            userName : req.body.userName,
                            class :  req.body.class,
                            date : date,
                            starttime : starttime,
                            status : 'Pending',
                         })
                         await billledger.save((err,ledger)=>{
                             if(!err){
                                res.status(200).json({
                                    success:true,
                                    tableNumber : table._id,
                                    message:"Table Successfully registered for the Guest with Ledger Entry"
                                })
                             }else{
                                res.status(201).json({
                                    success:false,
                                    message:"Table registered for the Guest without ledger entry",
                                    error : err,
                                })
                             }
                         })
                    }else{
                        console.log(err)
                        res.status(201).json({
                            success:false,
                            message:"Cannot Register the table  to the Guest"
                        })
                    }
                })
            }
        })
    }catch(error){
        res.status(500).json({
            success:false,
            message:error
        })
    }
}

function payBill(req,res){
    console.log("API hit to pay bill method")
    try{
        GuestBill.findOne({_id : req.body._id },function (err, table){
            temptable  = table
            if(!table || err){
              res.status(201).json({
                  success:false,
                  message:"Tables could not be found"
              })
            }else{
                GuestBill.updateOne({_id : req.body._id},{
                    $set:{
                        userName : '',
                        orderItems : [],
                        billAmount : 0,
                    }},(err,docs)=>{
                        if(!err){
                            var today = new Date();
                            var endtime = today.getHours()+':'+today.getMinutes()+":"+today.getSeconds();
                            BillLedger.findOne({tableNumber : temptable.tableNumber,class : temptable.class,userName : temptable.userName,status:'Pending'},(err,ledger)=>{
                                    if(ledger!=null){
                                            ledger.orderItems = temptable.orderItems,
                                            ledger.billAmount = temptable.billAmount,
                                            ledger.endtime = endtime,
                                            ledger.status = 'Completed'
                                            ledger.save((err,doc)=>{
                                                if(err){
                                                    res.status(201).send({
                                                        success: false,
                                                        message: 'Bill Paid  without ledger entry'
                                                    })
                                                }else{
                                                    res.status(200).send({
                                                        success: true,
                                                        message: 'Bill Paid Succefully with ledger entry'
                                                    })
                                                }
                                            })
                                    }else{
                                        res.status(201).send({
                                            success: false,
                                            message: 'Ledger Not found'
                                        })
                                    }

                                })
                        }else{
                            res.status(201).send({
                                success: false,
                                message: 'Unable to Bill Pay'
                            })
                        }
                    })
            }
        })
    }catch(error){
        res.status(500).json({
            success:false,
            message:error
        })
    }
}  


function getAllReceipe(req,res){
    console.log("API hit to get all receipe method")
    try{
        Receipe.find({},function (err, receipe){
            if(!receipe){
              res.status(201).json({
                  success:false,
                  message:"No Receipes"
              })
            }else{
                res.status(200).json({
                    success:true,
                    message:receipe
                })
            }
        })
    }catch(error){
        res.status(500).json({
            success:false,
            message:error
        })
    }
}

function getAllAvailableReceipe(req,res){
    console.log("API hit to get all available receipe method")
    try{
        Receipe.find({receipeAvailablity:true},function (err, receipe){
            if(!receipe){
              res.status(201).json({
                  success:false,
                  message:"No Receipes"
              })
            }else{
                res.status(200).json({
                    success:true,
                    message:receipe
                })
            }
        })
    }catch(error){
        res.status(500).json({
            success:false,
            message:error
        })
    }
}


function deleteReceipe(req,res){
    console.log("API hit to delete receipe method")
    try{
        Receipe.findOneAndRemove({_id:req.body._id},function (err, receipe){
            console.log(receipe)
            if(err){
              res.status(201).json({
                  success:false,
                  message:"No Receipes"
              })
            }else{
                res.status(200).json({
                    success:true,
                    message:"Receipe deleted successfully"
                })
            }
        })
    }catch(error){
        res.status(500).json({
            success:false,
            message:error
        })
    }
}

function getAllBillLedgerDetails(req,res){
    console.log("API hit to get all bill ledgers method")
    try{
        BillLedger.find(function (err, billledgers){
            if(!billledgers){
              res.status(201).json({
                  success:false,
                  message:"No Bill ledgers found"
              })
            }else{
                res.status(200).json({
                    success:true,
                    message:billledgers
                })
            }
        })
    }catch(error){
        res.status(500).json({
            success:false,
            message:error
        })
    }
}

function getBillLedgerDetailsById(req,res){
    console.log("API hit to get BillLedger Details By Id method")
    try{
        BillLedger.findOne({_id:req.params.id},function (err, billledgers){
            if(!billledgers){
              res.status(201).json({
                  success:false,
                  message:"No Bill ledgers found"
              })
            }else{
                res.status(200).json({
                    success:true,
                    message:billledgers
                })
            }
        })
    }catch(error){
        console.log(error)
        res.status(500).json({
            success:false,
            message:error
        })
    }
}

function getReceipeById(req,res){
    console.log("API hit to get all receipe method")
    try{
        Receipe.findOne({_id:req.params.id},function (err, receipe){
            if(!receipe || err){
              res.status(201).json({
                  success:false,
                  message:"No Receipes"
              })
            }else{
                res.status(200).json({
                    success:true,
                    message:receipe
                })
            }
        })
    }catch(error){
        res.status(500).json({
            success:false,
            message:error
        })
    }
}

module.exports = {
    addReceipe,
    addReceipeToBill,
    addTable,
    getAllTable,
    getOrderDetailsByTableId,
    getTableById,
    receipeAvailablityToogle,
    registerGuest,
    payBill,
    getAllReceipe,
    getReceipeById,
    deleteReceipe,
    getAllAvailableReceipe,
    getAllBillLedgerDetails,
    getBillLedgerDetailsById,
}
