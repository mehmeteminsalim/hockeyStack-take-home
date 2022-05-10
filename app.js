const dotenv = require("dotenv");
const path = require("path");
dotenv.config({ path: path.join(__dirname, ".env") });

const { MONGO_URI, PORT } = process.env;

const packageJson = require("./package.json");
process.env.VERSION = packageJson.version;

const createError = require("http-errors");
const express = require("express");
const cookieParser = require("cookie-parser");
const logger = require("morgan");
const http = require("http");
const mongoose = require("mongoose");
const compression = require("compression");
const helmet = require("helmet");
const session = require("express-session");

const app = express();
const server = http.Server(app);

// Set up mongoose connection
const defaultURI =
  "mongodb+srv://cooluser:coolpassword@cluster0.a9azn.mongodb.net/local_library?retryWrites=true";
const mongoDB = MONGO_URI || defaultURI;
mongoose.connect(mongoDB, { useNewUrlParser: true, useUnifiedTopology: true });

const indexRouter = require("./routes/index");
const bookRouter = require("./routes/book");
const authorRouter = require("./routes/author");
const genreRouter = require("./routes/genre");
const bookInstanceRouter = require("./routes/book-instance");
const authRouter = require("./routes/auth");
const {  authChecker } = require("./middlewares/auth");

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "pug");

app.use(
  session({
    key: "user_sid",
    secret: "somerandonstuffs",
    resave: false,
    saveUninitialized: false,
    cookie: {
      expires: 600000,
    },
  })
);
app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "public")));
app.use(cookieParser());
app.use(helmet({
  contentSecurityPolicy: false,
}));
app.use(compression()); // Compress all routes

app.use((req, res, next) => {
  if (req.cookies.user_sid && !req.session.user) {
    res.clearCookie("user_sid");
  }
  next();
});


app.use("/",authChecker, indexRouter);
app.use("/books",authChecker, bookRouter);
app.use("/authors",authChecker, authorRouter);
app.use("/genres",authChecker, genreRouter);
app.use("/book-instances",authChecker, bookInstanceRouter);
app.use("/auth", authRouter);


// catch 404 and forward to error handler
app.use((req, res, next) => {
  next(createError(404));
});

// error handler
app.use((err, req, res, next) => {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});

server.listen(PORT);
