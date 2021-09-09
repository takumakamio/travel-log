const express = require("express");
const app = express();
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const authRoute = require("./routes/auth");
const userRoute = require("./routes/users");
const postRoute = require("./routes/posts");
const categoryRoute = require("./routes/categories");
const multer = require("multer");
const path = require("path");
const verify = require("./verifyToken");
const paginate = require("express-paginate");

dotenv.config();

// Middleware
app.use(paginate.middleware(1, 50));
app.use(express.json());
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
app.use("/api/categories", categoryRoute);

// server listenning
app.listen("8800", () => {
  console.log("Backend is running");
});
