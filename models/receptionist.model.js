const { Schema, model } = require("mongoose");

const receptionistSchema = new Schema(
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

const Receptionist = model("Receptionist", receptionistSchema);

module.exports = Receptionist;
