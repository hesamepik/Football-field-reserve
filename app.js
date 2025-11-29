const express = require("express");
const morgan = require("morgan");
const route = require("./router/route");

const app = express();

app.use(morgan("dev"));
app.use(express.json());
app.use("/my-footbal", route);

const port = 8000;
app.listen(port, () => {
	console.log(`Server running on port ${port}`);
});
