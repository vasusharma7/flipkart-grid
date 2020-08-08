const express = require("express");
const cors = require("cors");

const connectDB = require("./config/db");

const app = express();
connectDB();

const port = process.env.PORT || 5000;
const usersRouter = require("./routes/users");
const commonsRouter = require("./routes/commons");
const itemsRouter = require('./routes/items');

//app.use(express.json());
app.use(express.json({ limit: "50mb" }));
app.use(cors());
app.use(express.urlencoded({ limit: "50mb" }));
app.use("/api/users", usersRouter);
app.use("/api/commons", commonsRouter);
app.use("/api/items", itemsRouter);
app.get("/", (req, res) => res.send("Hey Nerd!"));
app.listen(port, () => {
  console.log(`Server Listening on port ${port}`);
});
