const router = require("express").Router();
let HotelAdministration = require("../models/hotelAdministration.model");
let Receptionist = require("../models/receptionist.model");
let HotelRoom = require("../models/hotelRoom.model");
let HotelRoomType = require("../models/hotelRoomType.model");
let Hotel = require("../models/hotel.model");
const md5 = require("md5");

const checkLogin = (userType, userSecret) => {
	if (userType == "hotelAdministration" && userSecret == process.env.HOTELADMIN_SECRET)
		return true;
	else return false;
};

router.route("/myDetails").post((req, res) => {
	if (checkLogin(req.headers.usertype, req.headers.usersecret)) {
		HotelAdministration.findById(String(req.body.id))
			.then((hotelAdministration1) => {
				Hotel.findById(hotelAdministration1.hotelId)
					.then((hotel1) => {
						HotelRoom.find({ hotelId: hotelAdministration1.hotelId })
							.then((hotelRooms1) => {
								HotelRoomType.find({
									hotelId: hotelAdministration1.hotelId,
								})
									.then((hotelRoomTypes1) => {
										Receptionist.find({
											hotelId: hotelAdministration1.hotelId,
										})
											.then((receptionists1) => {
												res.json({
													success: "User verified",
													type: "hotelAdministration",
													secret: process.env.HOTELADMIN_SECRET,
													id: hotelAdministration1._id,
													hotelAdminDetails: hotelAdministration1,
													hotel: hotel1,
													hotelRooms: hotelRooms1,
													hotelRoomTypes: hotelRoomTypes1,
													receptionists: receptionists1,
												});
											})
											.catch((err) =>
												res.json({
													failure: "Unable to find receptionist details",
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
				res.json({ failure: "Unable to find hotel admin details", error: err })
			);
	} else {
		res.json({ failure: "Access Denied" });
	}
});

router.route("/changePassword").post((req, res) => {
	if (checkLogin(req.headers.usertype, req.headers.usersecret)) {
		HotelAdministration.findOne({
			_id: req.body.id,
			password: md5(req.body.oldPassword),
		})
			.then((hotelAdmin) => {
				hotelAdmin.password = md5(req.body.newPassword);
				hotelAdmin
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

//adds what facilities a room contains
router.route("/addHotelType").post((req, res) => {
	if (checkLogin(req.headers.usertype, req.headers.usersecret)) {
		hotelRoomType = {
			type: req.body.type,
			price: Number(req.body.price),
			facilities: {
				ac_or_not: Boolean(Number(req.body.ac_or_not)),
				wifi_or_not: Boolean(Number(req.body.wifi_or_not)),
				max_no_of_people: Number(req.body.max_no_of_people),
			},
			imgURLs: [req.body.imgURLs] || [],
			hotelId: req.body.hotelId,
		};

		const newHotelRoomType = new HotelRoomType(hotelRoomType);

		HotelAdministration.findOne({ _id: req.body.hotelAdminId, hotelId: req.body.hotelId })
			.then(() => {
				Hotel.findById(req.body.hotelId)
					.then(() => {
						newHotelRoomType
							.save()
							.then(() => res.json({ success: "Hotel Room Type added successfully" }))
							.catch((err) =>
								res.json({ failure: "Unable to add hotel room type", error: err })
							);
					})
					.catch((err) => res.json({ failure: "Unable to find hotel", error: err }));
			})
			.catch((err) => res.json({ failure: "Unable to find hotel", error: err }));
	} else {
		res.json({ failure: "Access Denied" });
	}
});

//adding room functionality
router.route("/addRoom").post((req, res) => {
	if (checkLogin(req.headers.usertype, req.headers.usersecret)) {
		hotelRoom = {
			hotelRoomTypeId: req.body.hotelRoomTypeId,
			hotelId: req.body.hotelId,
			roomNo: req.body.roomNo,
		};

		const newRoom = new HotelRoom(hotelRoom);

		HotelAdministration.findOne({ _id: req.body.hotelAdminId, hotelId: req.body.hotelId })
			.then(() => {
				Hotel.findById(req.body.hotelId)
					.then(() => {
						HotelRoomType.find({
							_id: req.body.hotelRoomTypeId,
							hotelId: req.body.hotelId,
						})
							.then(() => {
								newRoom
									.save()
									.then(() => res.json({ success: "Room added successfully" }))
									.catch((err) =>
										res.json({ failure: "Unable to add room", error: err })
									);
							})
							.catch((err) =>
								res.json({ failure: "Unable to find hotel room type", error: err })
							);
					})
					.catch((err) => res.json({ failure: "Unable to find hotel", error: err }));
			})
			.catch((err) => res.json({ failure: "Unable to find hotel", error: err }));
	} else {
		res.json({ failure: "Access Denied" });
	}
});
//deletes room
router.route("/deleteRoom/:id").delete((req, res) => {
	if (checkLogin(req.headers.usertype, req.headers.usersecret)) {
		HotelAdministration.findOne({ _id: req.headers.hotelAdminId, hotelId: req.headers.hotelId })
			.then(() => {
				HotelRoom.findByIdAndDelete(req.params.id)
					.then(() => res.json("Removed hotel room!"))
					.catch((err) =>
						res.json({ failure: "Unable to remove hotel room", error: err })
					);
			})
			.catch((err) => res.json({ failure: "Unable to find hotel", error: err }));
	} else {
		res.json({ failure: "Access Denied" });
	}
});
// Hotel admin adds receptionist
router.route("/addReceptionist").post((req, res) => {
	if (checkLogin(req.headers.usertype, req.headers.usersecret)) {
		receptionist = {
			name: { firstName: req.body.firstName, lastName: req.body.lastName },
			email: req.body.email,
			password: md5(req.body.password),
			hotelId: req.body.hotelId,
		};

		const newReceptionist = new Receptionist(receptionist);

		HotelAdministration.findOne({ _id: req.body.hotelAdminId, hotelId: req.body.hotelId })
			.then(() => {
				newReceptionist
					.save()
					.then(() => res.json({ success: "Receptionist added successfully" }))
					.catch((err) =>
						res.json({ failure: "Unable to add receptionist", error: err })
					);
			})
			.catch((err) => res.json({ failure: "Unable to find hotel", error: err }));
	} else {
		res.json({ failure: "Access Denied" });
	}
});
// Hotel admin removes receptionist
router.route("/removeReceptionist/:id").delete((req, res) => {
	if (checkLogin(req.headers.usertype, req.headers.usersecret)) {
		HotelAdministration.findOne({
			_id: String(req.headers.hoteladminid),
			hotelId: req.headers.hotelid,
		})
			.then(() => {
				Receptionist.findOneAndDelete({
					_id: String(req.params.id),
					hotelId: req.headers.hotelid,
				})
					.then(() => {
						res.json("Removed receptionist!");
					})
					.catch((err) =>
						res.json({ failure: "Unable to remove receptionist", error: err })
					);
			})
			.catch((err) => res.json({ failure: "Unable to find hotel", error: err }));
	} else {
		res.json({ failure: "Access Denied" });
	}
});
// Hotel admin updates facilities of room type
router.route("/updateHotelRoomType/:id").put((req, res) => {
	if (checkLogin(req.headers.usertype, req.headers.usersecret)) {
		HotelAdministration.findOne({ _id: req.body.hotelAdminId, hotelId: req.body.hotelId })
			.then(() => {
				HotelRoomType.findOne({ _id: req.params.id, hotelId: req.body.hotelId })
					.then((hotelRoomType) => {
						hotelRoomType.price = Number(req.body.price);
						hotelRoomType.facilities.ac_or_not = Boolean(Number(req.body.ac_or_not));
						hotelRoomType.facilities.wifi_or_not = Boolean(
							Number(req.body.wifi_or_not)
						);
						hotelRoomType.facilities.max_no_of_people = Number(
							req.body.max_no_of_people
						);
						if (req.body.imgURLs !== "") hotelRoomType.imgURLs = [req.body.imgURLs];
						hotelRoomType
							.save()
							.then(() => res.json({ success: "Type of hotel room updated!" }))
							.catch((err) =>
								res.json({ failure: "Unable to update hotel type", error: err })
							);
					})
					.catch((err) =>
						res.json({
							failure: "Unable to find hotel room type with specified Id",
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
