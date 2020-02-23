//- GET `/api/notes` - Should read the `db.json` file and return all saved notes as JSON.
// const database = require("../db/db.json")
var path = require("path");

const fs = require("fs")

module.exports = function (app) {
    app.get("/api/notes", function (req, res) {
        var parsedData = Object.create(null)

        fs.readFile("../develop/db/db.json", "utf8", function (error, data) {
            parsedData = JSON.stringify(data); //problem, not parsing into JSON format
            res.send(parsedData); //sends in string form, not in JSON format..
            if (error) {
                return console.log(error);
            }

            console.log(data);

        });
    });


    //- POST `/api/notes` - Should receive a new note to save on the request body, add it to the `db.json` file, and then return the new note to the client.

    app.post("/api/notes", function (req, res) {
        var newNoteReceived = JSON.stringify(req.body);
        console.log("req.body is :" + JSON.stringify(req.body)); //logs!
        res.send("received, thanks")
        fs.appendFile("../develop/db/db.json", newNoteReceived, function (err) {
            if (err) {
                return console.log(err);
            }
            console.log("Success!");

        });
    });
}