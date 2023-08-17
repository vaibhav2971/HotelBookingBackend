const router = require("express").Router();
let HotelRoomType = require("../models/hotelRoomType.model");
let HotelRoom = require("../models/hotelRoom.model");
let Hotel = require("../models/hotel.model");
let Customer = require("../models/customer.model");
let HotelAdministration = require("../models/hotelAdministration.model");
let Receptionist = require("../models/receptionist.model");
let Maintainer = require("../models/maintainer.model");
let Booking = require("../models/booking.model");
const md5 = require("md5");

const checkMaintainer = (email, password, res) => {
	Maintainer.find({ email: email })
		.then((maintainer) => {
			if (maintainer[0].password != password)
				res.json({ error: "Incorrect Email or Password" });
			else
				res.json({
					success: "User verified",
					type: "maintainer",
					secret: process.env.MAINTAINER_SECRET,
					id: maintainer[0]._id,
					maintainerDetails: maintainer[0],
				});
		})
		.catch((err) => res.json({ failure: "Unable to find User", error: err }));
};

const checkReceptionist = (email, password, res) => {
	Receptionist.find({ email: email })
		.then((receptionist) => {
			if (receptionist[0].password != password)
				res.json({ error: "Incorrect Email or Password" });
			else {
				Hotel.findById(receptionist[0].hotelId)
					.then((hotel) => {
						HotelRoom.find({ hotelId: receptionist[0].hotelId })
							.then((hotelRooms) => {
								HotelRoomType.find({
									hotelId: receptionist[0].hotelId,
								})
									.then((hotelRoomTypes) => {
										Booking.find({ hotelId: receptionist[0].hotelId })
											.then((bookings) => {
												res.json({
													success: "User verified",
													type: "receptionist",
													secret: process.env.RECEPTIONIST_SECRET,
													id: receptionist[0]._id,
													receptionistDetails: receptionist[0],
													hotel,
													hotelRooms,
													hotelRoomTypes,
													bookings,
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
			}
		})
		.catch((err) => checkMaintainer(email, password, res));
};

const checkHotelAdmin = (email, password, res) => {
	HotelAdministration.find({ email: email })
		.then((hotelAdministration) => {
			if (hotelAdministration[0].password != password)
				res.json({ error: "Incorrect Email or Password" });
			else {
				Hotel.findById(hotelAdministration[0].hotelId)
					.then((hotel) => {
						HotelRoom.find({ hotelId: hotelAdministration[0].hotelId })
							.then((hotelRooms) => {
								HotelRoomType.find({
									hotelId: hotelAdministration[0].hotelId,
								})
									.then((hotelRoomTypes) => {
										Receptionist.find({
											hotelId: hotelAdministration[0].hotelId,
										})
											.then((receptionists) => {
												res.json({
													success: "User verified",
													type: "hotelAdministration",
													secret: process.env.HOTELADMIN_SECRET,
													id: hotelAdministration[0]._id,
													hotelAdminDetails: hotelAdministration[0],
													hotel,
													hotelRooms,
													hotelRoomTypes,
													receptionists,
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
			}
		})
		.catch((err) => checkReceptionist(email, password, res));
};

const checkCustomer = (email, password, res) => {
	Customer.find({ email: email })
		.then((customer) => {
			// console.log(customer);
			if (customer[0].password != password)
				res.json({ error: "Incorrect Email or Password" });
			else {
				pastBookings = [];
				upcomingBookings = [];

				pbIds = customer[0].previousBookingIds;
				ubIds = customer[0].upcomingBookingIds;

				Booking.find({ _id: pbIds })
					.then((bookings1) => {
						pastBookings = bookings1;
						Booking.find({ _id: ubIds })
							.then((bookings) => {
								upcomingBookings = bookings;

								Hotel.find()
									.then((hotels) => {
										HotelRoomType.find()
											.then((hotelRoomTypes) => {
												HotelRoom.find()
													.then((hotelRooms) => {
														res.json({
															success: "User verified",
															type: "customer",
															secret: process.env.CUSTOMER_SECRET,
															id: customer[0]._id,
															customerDetails: customer[0],
															pastBookings: pastBookings,
															upcomingBookings: upcomingBookings,
															hotels,
															hotelRoomTypes,
															hotelRooms,
														});
													})
													.catch((err) =>
														res.json({
															failure:
																"Unable to find hotel rooms' details",
															error: err,
														})
													);
											})
											.catch((err) =>
												res.json({
													failure:
														"Unable to find hotel room types' details",
													error: err,
												})
											);
									})
									.catch((err) =>
										res.json({
											failure: "Unable to find hotels' details",
											error: err,
										})
									);
							})
							.catch((err) =>
								res.json({ failure: "Unable to find customer details", error: err })
							);
					})
					.catch((err) =>
						res.json({ failure: "Unable to find customer details", error: err })
					);
			}
		})
		.catch((err) => checkHotelAdmin(email, password, res));
};

router.route("/findHotelRoomTypes").post((req, res) => {
	HotelRoom.find()
		.then((hotelRooms) => {
			var i = 0;
			var hotelTypeIds = [];
			var hotelIds = [];
			var k = 0;

			while (hotelRooms[i]) {
				var valid = 1;
				var j = 0;

				bookingDates = hotelRooms[i].bookingDates;
				sd = new Date(req.body.startDate);
				ed = new Date(req.body.endDate);

				while (bookingDates[j]) {
					bsd = new Date(bookingDates[j].startDate);
					bed = new Date(bookingDates[j].endDate);
					j++;
					if (
						(bsd <= sd && sd <= bed) ||
						(bsd <= ed && ed <= bed) ||
						(sd <= bsd && bsd <= ed) ||
						(sd <= bed && bed <= ed)
					) {
						valid = 0;
						break;
					}
				}

				if (j == 0) valid = 1;

				if (valid) {
					hotelTypeIds[k] = hotelRooms[i].hotelRoomTypeId;
					hotelIds[k] = hotelRooms[i].hotelId;
					k++;
				}

				i++;
			}

			HotelRoomType.find({ _id: hotelTypeIds })
				.then((hotelRoomTypes) => {
					Hotel.find({ _id: hotelIds })
						.then((hotels) => {
							let hotelDetails = {};
							var i = 0;
							while (hotels[i]) {
								hotelDetails[hotels[i]._id] = {
									name: hotels[i].hotelName,
									address: hotels[i].address,
								};
								i++;
							}

							res.json({
								hotelDetails,
								hotelRoomTypes,
							});
						})
						.catch((err) => res.json({ failure: "Unable to find hotel", error: err }));
				})
				.catch((err) => res.json({ failure: "Unable to find room type", error: err }));
		})
		.catch((err) => res.json({ failure: "Unable to find rooms", error: err }));
});

router.route("/login").post((req, res) => {
	email = req.body.email;
	password = md5(req.body.password);
	checkCustomer(email, password, res);
});

router.route("/registerCustomer").post((req, res) => {
	const customer = {
		name: {
			firstName: req.body.firstName,
			lastName: req.body.lastName,
		},
		email: req.body.email,
		password: md5(req.body.password),
	};
	const newCustomer = new Customer(customer);

	newCustomer
		.save()
		.then(() => res.json({ success: "Customer created!" }))
		.catch((err) => res.json({ failure: "Unable to create customer", error: err }));
});

router.route("/registerMaintainer").post((req, res) => {
	const maintainer = {
		name: {
			firstName: req.body.firstName,
			lastName: req.body.lastName,
		},
		email: req.body.email,
		password: md5(req.body.password),
	};
	const newMaintainer = new Maintainer(maintainer);

	newMaintainer
		.save()
		.then(() => res.json({ success: "Maintainer created!" }))
		.catch((err) => res.json({ failure: "Unable to create Maintainer", error: err }));
});

module.exports = router;
