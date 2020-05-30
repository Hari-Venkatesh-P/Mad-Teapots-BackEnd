const Room  = require('../models/room')
const RoomLedger  = require('../models/roomledger')

function bookRoom(req,res){
    console.log("Api hit to book room method")
    console.log(req.body)
    try{
          Room.findOne({availablity:true , roomType : req.body.roomType}, function (err, room){
              if(!room){
                res.status(201).json({
                    success:false,
                    message:"Room Not Available"
                })
              }
              else{
                Room.updateOne({roomId:room.roomId},{
                    $set: {
                     userName: req.body.firstName,
                     inPersons : parseInt(req.body.inPersons),
                     checkInDate : req.body.checkindate,
                     expectedCheckOutDate : req.body.expectedCheckOutDate,
                     availablity:false,
                    }},(err, docs) => {
                    if (!err) {
                        const roomledger = new RoomLedger({
                            roomId : room.roomId,
                            firstName : req.body.firstName,
                            lastName : req.body.lastName,
                            city:req.body.city,
                            address : req.body.address,
                            mobile : parseInt(req.body.mobile),
                            checkInDate : req.body.checkindate,
                            checkOutDate : req.body.expectedCheckOutDate,
                            status : 'Not Vacated'
                        })
                        roomledger.save((err,docs=>{
                            if(err){
                                res.status(201).send({
                                    success: true,
                                    message: 'Room Booked.Ledger Entry not made.'
                                })
                            }else{
                                res.status(200).send({
                                    success: true,
                                    message: 'Room Successfully Booked with Ledger Entry.'
                                })
                            }
                        }))
                    } else {
                        res.status(201).send({
                            success: false,
                            message: 'Unable to book room.'
                        })
                    }
                })
              }
          });
    }catch(error){
        res.status(500).json({
            success:false,
            message:error
        })
    }
}


function vacateRoom(req,res){
    try{
        Room.updateOne({roomId:req.params.roomid},{
            $set: {
             userName:"",
             inPersons : 0,
             checkInDate : "", 
             expectedCheckOutDate : "",
             availablity : true,
            }},(err,room)=>{
                if(!err){
                    var today = new Date();
                    var date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();
                    RoomLedger.updateOne({roomId:req.params.roomid,checkInDate:req.params.date,firstName:req.params.name},{
                        $set:{
                            status : 'Vacated',
                            checkOutDate : date,
                        }},(err,docs)=>{
                            if(!err){
                                res.status(200).send({
                                    success: true,
                                    message: 'Room Vacated Successfully '
                                })
                            }else{
                                res.status(200).send({
                                    success: true,
                                    message: 'Room Vacated without Ledger Entry'
                                })
                            }
                        })
                }else{
                    res.status(201).send({
                        success: false,
                        message: 'Problem in vacating the room'
                    })
                }
            })
    }
    catch(error){
        res.status(500).send({
            success: false,
            message: error
        })
    }
    
}

function getRoomById(req,res){
    console.log("Api hit to get room by id method")
    try{
          Room.findOne({id:req.params.roomid}, function (err, room){
              if(!room){
                res.status(201).json({
                    success:false,
                    message:"Unable to fetch room details"
                })
              }
              else{
                res.status(200).json({
                    success:true,
                    message:room
                })
              }
          });
    }catch(error){
        console.log(error)
        res.status(500).json({
            success:false,
            message:"Internal Server Error"
        })
    }
}

function getRooms(req,res){
    console.log("Api hit to get rooms method")
    try{
          Room.find({}, function (err, room){
              if(!room){
                res.status(201).json({
                    success:false,
                    message:"Unable to fetch room details"
                })
              }
              else{
                res.status(200).json({
                    success:true,
                    message:room
                })
              }
          });
    }catch(error){
        console.log(error)
        res.status(500).json({
            success:false,
            message:"Internal Server Error"
        })
    }
}



async function getAllRoomsBasedonRoomType(req,res){
    console.log("Api hit to getAllRoomsBasedonRoomType  method")
    try{
          await Room.find({roomType:req.params.type}, function (err, rooms){
              if(!rooms){
                res.status(201).json({
                    success:false,
                    message:"Unable to fetch room details"
                })
              }
              else{
                res.status(200).json({
                    success:true,
                    message:rooms
                })
              }
          });
    }catch(error){
        console.log(error)
        res.status(500).json({
            success:false,
            message:"Internal Server Error"
        })
    }
}


async function getGuestDetails(req,res){
    console.log("Api hit to getGuestDetails method")
    try{
        console.log(req.params.roomid)
        console.log(req.params.checkindate)
        console.log(req.params.name)
          await RoomLedger.findOne({roomId:req.params.roomid,checkInDate : req.params.checkindate,firstName : req.params.name}, function (err, roomledger){
            console.log(roomledger)  
            if(!roomledger){
                res.status(201).json({
                    success:false,
                    message:"Unable to fetch room details"
                })
              }
              else{
                const guest = {
                    firstName : roomledger.firstName,
                    lastName : roomledger.lastName,
                    city : roomledger.city,
                    address : roomledger.address,
                    mobile : roomledger.mobile,
                }
                res.status(200).json({
                    success:true,
                    message:guest
                })
              }
          });
    }catch(error){
        console.log(error)
        res.status(500).json({
            success:false,
            message:"Internal Server Error"
        })
    }
}


async function getAllRoomLedgerDetails(req,res){
    console.log("Api hit to getAllRoomLedgerDetails method")
    try{
          await RoomLedger.find({}, function (err, roomledger){
              if(!roomledger){
                res.status(201).json({
                    success:false,
                    message:"No Room Leger Details Found"
                })
              }
              else{
                res.status(200).json({
                    success:true,
                    message:roomledger
                })
              }
          });
    }catch(error){
        console.log(error)
        res.status(500).json({
            success:false,
            message:"Internal Server Error"
        })
    }
}

module.exports = {
    bookRoom,
    vacateRoom,
    getRoomById,
    getRooms,
    getAllRoomsBasedonRoomType,
    getGuestDetails,
    getAllRoomLedgerDetails,
}