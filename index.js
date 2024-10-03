const express = require("express");
const dotenv = require("dotenv");
const bodyParser = require("body-parser");
const passport = require('./router/auth.js');

dotenv.config();

let app = express();

//middleware
app.use(bodyParser.json());

// Middleware Function
const logRequest = (req, res, next) => {
    console.log(`[${new Date().toLocaleString()}] Request Made to : ${req.originalUrl}`);
    next(); // Move on to the next phase
}
app.use(logRequest);
app.use(passport.initialize());

//middleware 

const localAuthMiddleware = passport.authenticate('local', { session: false })

app.get("/", localAuthMiddleware, (req, res) => {
    res.send("welcome")

})

const personRoutes = require('./router/Person');
const menuItem = require('./router/MenuItem');

app.use('/person', personRoutes);
app.use('/menuItem', localAuthMiddleware, menuItem);


// Start the server
const Port = process.env.PORT || 4000;
app.listen(Port, () => {
    console.log(`Server started on port ${Port}`);
});
