const { Schema, model } = require("mongoose");

const ratingSchema = new Schema(
	{
		ratingValue: {
			type: Number,
			required: true,
		},
		customerId: {
			type: String,
			required: true,
		},
		hotelId: {
			type: String,
			required: true,
		},
		comment: {
			type: String,
			default: "",
		},
	},
	{
		timestamps: true,
	}
);

const Rating = model("Rating", ratingSchema);

module.exports = Rating;
