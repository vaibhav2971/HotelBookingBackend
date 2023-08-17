const { Schema, model } = require("mongoose");

const hotelRoomTypeSchema = new Schema(
	{
		type: {
			type: String,
			required: true,
		},
		price: {
			type: Number,
			required: true,
		},
		facilities: {
			ac_or_not: {
				type: Boolean,
				default: false,
			},
			wifi_or_not: {
				type: Boolean,
				default: false,
			},
			max_no_of_people: {
				type: Number,
				required: true,
			},
		},
		imgURLs: { type: [String], default: [] },
		hotelId: {
			type: String,
			required: true,
		},
	},
	{
		timestamps: true,
	}
);

const HotelRoomType = model("HotelRoomType", hotelRoomTypeSchema);

module.exports = HotelRoomType;
