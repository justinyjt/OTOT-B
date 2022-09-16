// Import express
let express = require('express');
// Import Body parser
let bodyParser = require('body-parser');
// Import Mongoose
let mongoose = require('mongoose');
// Initialise the app
let app = express();
let dotenv = require('dotenv');
dotenv.config();

var cors = require('cors')

app.use(cors()) // Use this after the variable declaration

const MONGO_URI = process.env.MONGO_URI || "mongodb+srv://test:5_ye57VzzjTy$j*@cluster0.yfnmagw.mongodb.net/?retryWrites=true&w=majority";

// Import routes
let apiRoutes = require("./api-routes");
// Configure bodyparser to handle post requests
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(bodyParser.json());
// Connect to Mongoose and set connection variable
if (!MONGO_URI) {
    throw new Error("Missing mongo_uri");
}
try {
    mongoose.connect(MONGO_URI);
} catch (error) {
    throw new Error(`Cannot connect to ${MONGO_URI}`)
}

var db = mongoose.connection;

// Added check for DB connection
if(!db)
    console.log("Error connecting db")
else
    console.log("Db connected successfully")

// Setup server port
var port = process.env.PORT || 8080;

// Send message for default URL
app.get('/', (req, res) => res.send('Hello World with Express'));

// Use Api routes in the App
app.use('/api', apiRoutes);
// Launch app to listen to specified port
app.listen(port, function () {
    console.log("Running OTOT_B on port " + port);
});

app.get('*', (req, res) => {
    res.status(404)
    .send('ERROR 404 PAGE NOT FOUND!');
});

app.post('*', (req, res) => {
    res.status(404)
    .send('ERROR 404 PAGE NOT FOUND!');
});