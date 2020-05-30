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
                    receipeAvailablity : req.body.receipeAvailablity,
                    receipePrice : req.body.receipePrice,
                })
                receipe.save((err,docs=>{
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
                }))
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
                guestBill.save((err,docs=>{
                    if(err){
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
                }))
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
                    success:false,
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

function getTableById(req,res){
    console.log("API hit to find table by id method")
    try{
        GuestBill.findOne({_id : req.body._id},function (err, guestbill){
            if(!guestbill){
              res.status(201).json({
                  success:false,
                  message:"No Tables with specified id"
              })
            }else{
                res.status(200).json({
                    success:false,
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

function registerGuest(req,res){
    console.log("API hit to register guest method")
    try{
        GuestBill.findOne({class : req.body.class , userName: '' },function (err, table){
            console.log(table)
            if(!table || err){
              res.status(201).json({
                  success:false,
                  message:"Tables Occupied in this class"
              })
            }else{
                table.userName = req.body.userName
                table.save((err,savedtables=>{
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
                            status : 'Pending'
                         })
                         billledger.save((err,ledger)=>{
                             if(!err){
                                res.status(200).json({
                                    success:true,
                                    tableNumber : table.tableNumber,
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
                        res.status(201).json({
                            success:false,
                            message:"Cannot Register the table  to the Guest"
                        })
                    }
                }))
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
            console.log(table)
            temptable  = table
            console.log(temptable)
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
                            console.log(temptable.tableNumber)
                            console.log(temptable.class)
                            console.log(temptable.userName)
                            BillLedger.findOne({tableNumber : temptable.tableNumber,class : temptable.class,userName : temptable.userName},(err,ledger)=>{
                                    console.log(ledger)
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

module.exports = {
    addReceipe,
    addReceipeToBill,
    addTable,
    getAllTable,
    getTableById,
    receipeAvailablityToogle,
    registerGuest,
    payBill,
}
