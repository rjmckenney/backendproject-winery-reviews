const express = require("express");
const es6Renderer = require("express-es6-template-engine");
const bcrypt = require("bcryptjs");
const path = require("path");
const cookieParser = require("cookie-parser");
const logger = require("morgan");
const session = require("express-session");
const FileStore = require("session-file-store")(session);

require("dotenv").config();

const indexRouter = require("./routes/index");
const usersRouter = require("./routes/users");
const reviewsRouter = require("./routes/reviews");
const wineryRouter = require("./routes/wineries");

const app = express();
app.engine("html", es6Renderer);
app.set("views", "./views");
app.set("view engine", "html");

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));
app.use(
	session({
		store: new FileStore(),
		secret: "stay rad!",
		resave: false,
		saveUninitialized: true,
		is_logged_in: false,
	})
);

app.use("/", indexRouter);
app.use("/users", usersRouter);
app.use("/reviews", reviewsRouter);
app.use("/wineries", wineryRouter);

module.exports = app;
