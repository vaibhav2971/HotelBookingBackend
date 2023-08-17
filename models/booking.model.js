const { Schema, model } = require("mongoose");

const bookingSchema = new Schema(
	{
		customerId: {
			type: String,
			required: true,
		},
		hotelRoomId: {
			type: String,
			required: true,
		},
		hotelId: {
			type: String,
			required: true,
		},
		duration: {
			startDate: {
				type: Date,
				required: true,
			},
			endDate: {
				type: Date,
				required: true,
			},
		},
		status: {
			type: Boolean,
			default: false,
		},
		rating: {
			type: Boolean,
			default: false,
		},
	},
	{
		timestamps: true,
	}
);

const Booking = model("Booking", bookingSchema);

module.exports = Booking;
