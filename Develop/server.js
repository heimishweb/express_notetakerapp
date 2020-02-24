var express = require("express");
var app = express();

// Sets an initial port. We"ll use this later in our listener
var PORT = process.env.PORT || 8080;

// Sets up the Express app to handle data parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public")) //added

app.use(express.json());
require("./routes/htmlRoutes.js")(app)
require("./routes/apiRoutes.js")(app)

app.listen(PORT, function () {
    console.log("app listening on port: " + PORT)
})