//- GET `/api/notes` - Should read the `db.json` file and return all saved notes as JSON.
// const database = require("../db/db.json")
var path = require("path");

const fs = require("fs")
const notedatabase = require('../db/db.json');
console.log("API: \n")

const blahblah = JSON.stringify(notedatabase);
// console.log('!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!');
// console.log(typeof notedatabase)
// console.log(typeof blahblah)
// console.log('!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!');
// const html = '<h1> adrian </h1>'


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

    //apiRoute to delete note
    app.get("/api/notes/:id", function (req, res) {
        var array;
        var idToFind = req.params.id;
        //1.find index
        fs.readFile("../develop/db/db.json", "utf8", function (error, data) {
            array = JSON.parse(data);
            console.log(array[0].id + "<--array id") //test
            for (i = 0; i < array.length; i++) {
                if (array[i].id === idToFind) {
                    console.log("found id: " + idToFind)
                    //then splice it out 
                    indexToBeRemoved = array.indexOf(array[i]);
                    // If you want to remove element at position x, use
                    array.splice(indexToBeRemoved, 1);
                    splicedArray = JSON.stringify(array);

                    // console.log("with removed index array is: " + JSON.stringify(array))

                    //write spliced array into the db.json
                    fs.writeFile("../develop/db/db.json", splicedArray, function (err) {
                        if (err) {
                            return console.log(err);
                        }
                        console.log("Success!");

                    });
                }
            }
            if (error) {
                return console.log(error);
            }


        });
        console.log("!!!!!" + req.params.id) //logs!
        // data.findIndex(req.params.id)
        res.send("you're looking for note with id: " + req.params.id)








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