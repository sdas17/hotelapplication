const express = require("express");
const dotenv = require("dotenv");
const bodyParser = require("body-parser");
// const { db } = require("./database/db");
// const Person = require("./model/Person");
// const MenuItem = require("./router/model/Menu");

// Load environment variables from .env file
dotenv.config();

let app = express();

app.use(bodyParser.json());


const personRoutes = require('./router/Person');
const menuItem = require('./router/MenuItem');

app.use('/person', personRoutes);
app.use('/menuItem', menuItem);


// Start the server
const Port = process.env.PORT || 4000;
app.listen(Port, () => {
    console.log(`Server started on port ${Port}`);
});
