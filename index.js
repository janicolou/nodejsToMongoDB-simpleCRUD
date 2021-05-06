// Express
const express = require("express");
const app = express();
const path = require("path");

// Mongoose
const mongoose = require("mongoose");
const methodOverride = require("method-override"); // For PUT and DELETE methods
require("dotenv").config(); // Dotenv for hidden connection strings
const Item = require("./models/item"); // For importing my item model

// Connection
mongoose
	.connect(process.env.MONGODB_URI || "mongodb://localhost:27017/inventory", {
		useNewUrlParser: true,
		useUnifiedTopology: true,
	})
	.then(() => {
		console.log("Connection open!");
	})
	.catch((err) => {
		console.log("Connection Error! \n" + err);
	});

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride("_method"));

// Setting the port to listen to
app.listen(process.env.PORT, () => {
	console.log(`Listening on port ${process.env.PORT}`);
});

// Getting all of the items in the form
app.get("/", async (req, res) => {
	const items = await Item.find({});
	res.render("items/mainForm", { items });
});

// Posting a new item
app.post("/items", async (req, res) => {
	const newItem = new Item(req.body);
	await newItem.save();
	res.redirect(`/`);
});

// Viewing the edit tab and posting the preset value of the item
app.post("/items/:id/edit", async (req, res) => {
	const { id } = req.params;
	const item = await Item.findById(id);
	res.render("items/edit", { item });
});

// Putting the item into the database
app.put("/items/:id", async (req, res) => {
	const { id } = req.params;
	const item = await Item.findByIdAndUpdate(id, req.body, {
		runValidators: true,
		new: true,
	});
	res.redirect(`/`);
});

// Delete Post Method
app.delete("/items/:id", async (req, res) => {
	const { id } = req.params;
	const deletedItem = await Item.findByIdAndDelete(id);
	res.redirect("/");
});
