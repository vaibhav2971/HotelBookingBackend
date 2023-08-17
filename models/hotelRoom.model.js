const { Schema, model } = require("mongoose");

const hotelRoomSchema = new Schema(
	{
		roomNo: {
			type: String,
			required: true,
		},
		hotelId: {
			type: String,
			required: true,
		},
		hotelRoomTypeId: {
			type: String,
			required: true,
		},
		bookingDates: {
			type: [
				{
					startDate: {
						type: Date,
						required: true,
					},
					endDate: {
						type: Date,
						required: true,
					},
				},
			],
			default: [],
		},
	},
	{
		timestamps: true,
	}
);

const HotelRoom = model("HotelRoom", hotelRoomSchema);

module.exports = HotelRoom;
