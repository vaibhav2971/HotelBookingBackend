const router = require("express").Router();
let Hotel = require("../models/hotel.model");
let Booking = require("../models/booking.model");
let HotelRoom = require("../models/hotelRoom.model");
let Receptionist = require("../models/receptionist.model");
const md5 = require("md5");

// add RECEPTIONIST_SECRET to env file!!
const checkLogin = (userType, userSecret) => {
	if (userType == "receptionist" && userSecret == process.env.RECEPTIONIST_SECRET) return true;
	else return false;
};

router.route("/myDetails").post((req, res) => {
	if (checkLogin(req.headers.usertype, req.headers.usersecret)) {
		Receptionist.findById(req.body.id)
			.then((receptionist1) => {
				Hotel.findById(receptionist1.hotelId)
					.then((hotel1) => {
						HotelRoom.find({ hotelId: receptionist1.hotelId })
							.then((hotelRooms1) => {
								HotelRoomType.find({
									hotelId: receptionist1.hotelId,
								})
									.then((hotelRoomTypes1) => {
										Booking.find({ hotelId: receptionist1.hotelId })
											.then((bookings1) => {
												res.json({
													success: "User verified",
													type: "receptionist",
													secret: process.env.RECEPTIONIST_SECRET,
													id: receptionist1._id,
													receptionistDetails: receptionist1,
													hotel: hotel1,
													hotelRooms: hotelRooms1,
													hotelRoomTypes: hotelRoomTypes1,
													bookings: bookings1,
												});
											})
											.catch((err) =>
												res.json({
													failure: "Unable to find booking details",
													error: err,
												})
											);
									})
									.catch((err) =>
										res.json({
											failure: "Unable to find hotel room type details",
											error: err,
										})
									);
							})
							.catch((err) =>
								res.json({
									failure: "Unable to find hotel room details",
									error: err,
								})
							);
					})
					.catch((err) =>
						res.json({ failure: "Unable to find hotel details", error: err })
					);
			})
			.catch((err) =>
				res.json({ failure: "Unable to find receptionist details", error: err })
			);
	} else {
		res.json({ failure: "Access Denied" });
	}
});

router.route("/changePassword").post((req, res) => {
	if (checkLogin(req.headers.usertype, req.headers.usersecret)) {
		Receptionist.findOne({
			_id: req.body.id,
			password: md5(req.body.oldPassword),
		})
			.then((receptionist) => {
				receptionist.password = md5(req.body.newPassword);
				receptionist
					.save()
					.then(() => res.json({ success: "Password updated successfully" }))
					.catch((err) =>
						res.json({
							failure: "Unable to update password",
							error: err,
						})
					);
			})
			.catch((err) =>
				res.json({ failure: "Unable to find user with given credentials", error: err })
			);
	} else {
		res.json({ failure: "Access Denied" });
	}
});

router.route("/getBookings").post((req, res) => {
	if (checkLogin(req.headers.usertype, req.headers.usersecret)) {
		Receptionist.findOne({ _id: req.body.receptionistId, hotelId: req.body.hotelId })
			.then(() => {
				Booking.find({ hotelId: req.body.hotelId, status: false })
					.then((bookings1) => {
						res.json(bookings1);
					})
					.catch((err) =>
						res.json({ failure: "Unable to find booking details", error: err })
					);
			})
			.catch((err) =>
				res.json({ failure: "Unable to find receptionist details", error: err })
			);
	} else {
		res.json({ failure: "Access Denied" });
	}
});

//Confirm booking or update status in booking
router.route("/updateStatus/:id").put((req, res) => {
	console.log(req.headers.usersecret);
	console.log(req.headers.usertype);
	if (checkLogin(req.headers.usertype, req.headers.usersecret)) {
		Receptionist.findOne({ _id: req.body.receptionistId, hotelId: req.body.hotelId })
			.then(() => {
				Booking.findOne({ _id: req.params.id, hotelId: req.body.hotelId })
					.then((booking) => {
						booking.status = true;
						booking
							.save()
							.then(() => res.json({ success: "hotel room is confirmed!" }))
							.catch((err) =>
								res.json({ failure: "Unable to confirm hotel room", error: err })
							);
					})
					.catch((err) =>
						res.json({
							failure: "Unable to find particular booking with given id",
							error: err,
						})
					);
			})
			.catch((err) => res.json({ failure: "Unable to find hotel", error: err }));
	} else {
		res.json({ failure: "Access Denied" });
	}
});

module.exports = router;
