const  express =  require('express');
const  mongoose = require("mongoose");
const bodyParser = require("body-parser");
const path = require("path");


const userRoutes = require("./routes/user");
const postRoutes = require("./routes/post");
const adminRoute = require("./routes/admin");
const redisClient = require("./helper/redisClient");
const elasticClient = require("./helper/elasticClient");
const nev = require('email-verification')(mongoose);
const app = express();
mongoose.set('useFindAndModify', false);
mongoose.connect(
  "mongodb://localhost:27017")
.then(() => {
    console.log("Connected to database!");
})
.catch(() => {
    console.log("Connection failed!");
});
nev.configure({
  verificationURL: 'http://myawesomewebsite.com/email-verification/${URL}',
  persistentUserModel: User,
  tempUserCollection: 'myawesomewebsite_tempusers',

  transportOptions: {
      service: 'Gmail',
      auth: {
          user: 'myawesomeemail@gmail.com',
          pass: 'mysupersecretpassword'
      }
  },
  verifyMailOptions: {
      from: 'Do Not Reply <myawesomeemail_do_not_reply@gmail.com>',
      subject: 'Please confirm account',
      html: 'Click the following link to confirm your account:</p><p>${URL}</p>',
      text: 'Please confirm your account by clicking the following link: ${URL}'
  }
}, function(error, options){
});

app.use(bodyParser.json({limit: "50mb"}));
app.use(bodyParser.urlencoded({ limit: "50mb", extended: true, parameterLimit:50000}));

app.use( (req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Headers", "Origin, X-Requested-Width, Content-Type, Accept, Authorization");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, PATCH, DELETE, OPTIONS, PUT");


  next();
});

app.use("/api/user", userRoutes);
app.use("/api/blog", postRoutes);
app.use("/api/admin", adminRoute);


module.exports = app;
