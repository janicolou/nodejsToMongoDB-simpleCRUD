const express = require("express");
const app = express();
const path = require("path");
const mongoose = require("mongoose");
const methodOverride = require("method-override");
require("dotenv").config();

const Item = require("./models/item");

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

app.listen(process.env.PORT, () => {
	console.log(`Listening on port ${process.env.PORT}`);
});

app.get("/", async (req, res) => {
	const items = await Item.find({});
	res.render("items/mainform", { items });
});

app.post("/items", async (req, res) => {
	const newItem = new Item(req.body);
	await newItem.save();
	res.redirect(`/`);
});

app.post("/items/:id/edit", async (req, res) => {
	const { id } = req.params;
	const item = await Item.findById(id);
	res.render("items/edit", { item });
});

app.put("/items/:id", async (req, res) => {
	const { id } = req.params;
	const item = await Item.findByIdAndUpdate(id, req.body, {
		runValidators: true,
		new: true,
	});
	res.redirect(`/`);
});

app.delete("/items/:id", async (req, res) => {
	const { id } = req.params;
	const deletedItem = await Item.findByIdAndDelete(id);
	res.redirect("/");
});
