const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const indexRouter = require("./routes/index");
const customerRouter = require("./routes/customer");
const maintainerRouter = require("./routes/maintainer");
const hotelAdministrationRouter = require("./routes/hotelAdministration");
const receptionistRouter = require("./routes/receptionist");
require("dotenv").config();

const app = express();
const port = process.env.PORT;

const uri = process.env.ATLAS_URI;

const connect = mongoose.connect(uri, {
	useNewUrlParser: true,
	useCreateIndex: true,
	useUnifiedTopology: true,
});

connect.then(
	(db) => {
		console.log("MongoDB connected");
	},
	(err) => {
		console.log(err);
	}
);

app.use(cors());
app.use(express.json());

app.use("/", indexRouter);
app.use("/customer", customerRouter);
app.use("/maintainer", maintainerRouter);
app.use("/hotelAdministration", hotelAdministrationRouter);
app.use("/receptionist",receptionistRouter);

app.listen(port, () => {
	console.log(`Server is running on ${port}`);
});
