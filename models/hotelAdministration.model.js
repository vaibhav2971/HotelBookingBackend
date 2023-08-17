const { Schema, model } = require("mongoose");

const hotelAdministrationSchema = new Schema(
	{
		name: {
			firstName: {
				type: String,
				required: true,
			},
			lastName: {
				type: String,
				default: "",
			},
		},
		email: {
			type: String,
			required: true,
		},
		password: {
			type: String,
			required: true,
		},
		hotelId: {
			type: String,
			required: true,
		},
	},
	{
		timestamps: true,
	}
);

const HotelAdministration = model("HotelAdministration", hotelAdministrationSchema);

module.exports = HotelAdministration;
