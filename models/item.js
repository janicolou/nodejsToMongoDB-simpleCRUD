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
});

const Item = mongoose.model("Item", itemSchema);
module.exports = Item;
