const express = require("express");
const app = express();
const port = process.env.PORT || 5000;
const dbConnect = require("./db");
dbConnect();

app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});

app.use(express.json());
app.use("/api", require("./routes/CreateUser"));
app.use("/api", require("./routes/DisplayData"));
app.use("/api", require("./routes/OrderData"));

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
