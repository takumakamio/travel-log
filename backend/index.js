const express = require("express");
const app = express();
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const authRoute = require("./routes/auth");
const userRoute = require("./routes/users");
const postRoute = require("./routes/posts");
const path = require("path");
const cors = require("cors");

dotenv.config();

// Middleware
app.use(express.json());
app.use(cors());
app.use(
  "/public/images",
  express.static(path.join(__dirname, "/public/images"))
);

mongoose
  .connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: true,
  })
  .then(console.log("connected to mongo"))
  .catch((err) => console.log(err));

// Routes
app.use("/api/auth", authRoute);
app.use("/api/users", userRoute);
app.use("/api/posts", postRoute);

// server listenning
app.listen("8800", () => {
  console.log("Backend is running");
});
