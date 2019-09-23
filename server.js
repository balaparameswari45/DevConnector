const express = require("express");
const mongoose = require("mongoose");
const users = require("./routes/api/users");
const profile = require("./routes/api/profile");
const posts = require("./routes/api/posts");
const bodyParser = require("body-parser");
const passport  = require('passport');

//create instance of express
const app = express();

//Body parser middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());


//passport configuration

app.use(passport.initialize());
require('./config/passport')(passport);

//Db config
//connection string in keys file
const db = require("./config/keys").mongoURI;

//connect to mongodb
mongoose
  .connect(db)
  //prmoise statement
  .then(() => console.log("MongoDb connected"))
  .catch(err => console.log(err));

//create first route
//allow user to get data back
app.get("/", (req, res) => res.send("hello"));

app.use("/api/users", users);
app.use("/api/profile", profile);
app.use("/api/posts", posts);

const port = 7000;

//tell express to listen on this port
app.listen(port, () => console.log(`Server running on port ${port}`));