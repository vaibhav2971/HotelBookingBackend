const { Schema, model } = require("mongoose");

const hotelSchema = new Schema(
	{
		hotelName: {
			type: String,
			required: true,
		},
		address: {
			street: {
				type: String,
				required: true,
			},
			city: {
				type: String,
				required: true,
			},
			pinCode: {
				type: Number,
				required: true,
			},
		},
		roomIds: { type: [String], default: [] },
		imgURLs: { type: [String], default: [] },
	},
	{
		timestamps: true,
	}
);

const Hotel = model("Hotel", hotelSchema);

module.exports = Hotel;
