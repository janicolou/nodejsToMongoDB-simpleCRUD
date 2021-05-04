const mongoose = require("mongoose");

const itemSchema = new mongoose.Schema({
	name: {
		type: String,
		required: true,
	},
	quantity: {
		type: Number,
		required: true,
		min: 0,
	},
	originalPrice: {
		type: Number,
		required: true,
		min: 0,
	},
	sellingPrice: {
		type: Number,
		required: true,
		min: 0,
	},
	supplier: {
		type: String,
		lowercase: true,
		// enum: ["Nico", "Elcid", "Jan", "Louise"],
	},
});

const Item = mongoose.model("Item", itemSchema);
module.exports = Item;
