//- GET `/api/notes` - Should read the `db.json` file and return all saved notes as JSON.
// const database = require("../db/db.json")
var path = require("path");

const fs = require("fs")
const notedatabase = require('../db/db.json');
console.log("API: \n")

module.exports = function (app) {
    app.get("/api/notes", function (req, res) {
        // var parsedData = Object.create(null)
        fs.readFile("../develop/db/db.json", "utf8", function (error, data) {
            // parsedData = JSON.stringify(data); //problem, not parsing into JSON format
            //res.send(data); //sends in string form, not in JSON format..
            if (error) {
                return console.log(error);
            }
            res.json(JSON.parse(data))
            console.log("PARSE:" + data);

        });
    });


    //- POST `/api/notes` - Should receive a new note to save on the request body, add it to the `db.json` file, and then return the new note to the client.

    app.post("/api/notes", function (req, res) {
        var newNoteReceived = JSON.stringify(req.body); //get new note into newNoteReceived
        console.log("req.body is :" + JSON.stringify(req.body)); //logs!
        // res.send("received, thanks")
        notedatabase.push(req.body);
        console.log(notedatabase)
        res.json(true)
        notedatabaseString = JSON.stringify(notedatabase)
        fs.writeFile("../develop/db/db.json", notedatabaseString, function (err) {
            if (err) {
                return console.log(err);
            }
            console.log("Success!");

        });



    });
}


        // fs.readFile("../develop/db/db.json", "utf8", function (error, data) {
        //     var notesArray;
        //     if (data == null) {
        //         notesArray = "[" + newNoteReceived + "]"
        //     }
        //     else {
        //         notesArray = data; //get current array of object-notes
        //         notesArrayUncapped = notesArray.substring(0, notesArray.length - 1)
        //         notesArrayUncapped = notesArrayUncapped + "," + newNoteReceived + "]"; //push new note object into array

        //     }

        //     if (error) {
        //         return console.log(error);
        //     }

        //     console.log(data);
        //   

        // });