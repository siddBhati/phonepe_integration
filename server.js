const express = require("express");
const app = express();
const port = 5000;
const cors = require("cors");
const helmet = require('helmet')
require("dotenv").config();

app.use(express.json());

// CORS LIBRARY CONFIGURATIONS
app.use(
  cors({
    // origin:'http://localhost:3000/',
    origin: "*",
    // origin:'http:/127.0.0.1:3000',
    // credentials: true,
    exposedHeaders: ["Content-Length", "X-Foo", "X-Bar"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);



// HELMET CONFIGURATIONS 

// const connectSrcUrls = [
//   'http://localhost:3000/',
//    'http://127.0.0.1:3000',
// ];
// app.use(
//   helmet.contentSecurityPolicy({
//       directives: {
//           defaultSrc: [],
//           connectSrc: ["'self'", ...connectSrcUrls],
//       },
//   })
// );


const bodyParser = require("body-parser");
app.options('*', cors());

// Parse JSON and URL-encoded form data
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

//Razorpay Route
const phonepeRoute = require("./routes/phonepe/phonepeRoute");
app.use("/api", phonepeRoute);

app.get("/paymentdone", (req, res) => {
  res.send("payment successful");
});

// Starting Server
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
