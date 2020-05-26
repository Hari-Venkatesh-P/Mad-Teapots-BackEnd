const router = require('express').Router()

const RoomService = require('../services/roomservice')

router.post("/book",RoomService.bookRoom)
router.post("/vacate/:roomid/:date/:name",RoomService.vacateRoom)
router.get("/getallroomsontype/:type",RoomService.getAllRoomsBasedonRoomType)
router.get("/getguestdetails/:roomid/:checkindate/:name",RoomService.getGuestDetails)
router.get("/getroomledgerdetails",RoomService.getAllRoomLedgerDetails)
router.get("/getroomdetails",RoomService.getRooms)

module.exports = router;