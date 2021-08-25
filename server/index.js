const express = require("express");
const app = express();
const cors = require("cors");
app.use(cors());

app.get("/", (req, res) => {
	res.send("hello man");
});

app.listen(3001, () => {
	console.log("running on 3001");
});
