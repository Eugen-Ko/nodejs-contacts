const express = require("express");
const logger = require("morgan");
const cors = require("cors");
const mongoose = require("mongoose");

const contactsRouter = require("./routes/api/contacts");

require("dotenv").config();
const { DB_HOST } = process.env;

mongoose
  .connect(DB_HOST)
  .then(() => console.log("Database connect successful ..."))
  .catch((error) => {
    console.log(error.message);
    process.exit(1);
  });

const app = express();

const formatsLogger = app.get("env") === "development" ? "dev" : "short";

app.use(logger(formatsLogger));
app.use(cors());
app.use(express.json());

app.use("/api/contacts", contactsRouter);

app.use((_, res) => {
  res.status(404).json({ message: "Not found" });
});

app.use((err, _, res, __) => {
  const { status = 500, message = "Sever error" } = err;
  res.status(status).json({
    status: "error",
    code: status,
    message: message,
  });
});

module.exports = app;